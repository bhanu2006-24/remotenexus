import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchJobs } from '../services/jobService';
import { Job, FetchStatus } from '../types';
import { POPULAR_TAGS } from '../constants';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import { SearchIcon, BriefcaseIcon, MapPinIcon, HeartIcon } from '../components/Icons';
import { useStore } from '../context/Store';

const JOBS_PER_PAGE = 10;

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { savedJobs } = useStore();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'discover' | 'saved'>('discover');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');

  // Initial Load
  useEffect(() => {
    const loadJobs = async () => {
      setStatus(FetchStatus.LOADING);
      const { jobs: fetchedJobs, status: fetchStatus } = await fetchJobs();
      setJobs(fetchedJobs);
      setStatus(fetchStatus);
    };
    loadJobs();
  }, []);

  // Watch URL param for tab switching
  useEffect(() => {
    if (searchParams.get('tab') === 'saved') {
      setActiveTab('saved');
    }
  }, [searchParams]);

  // Filtering Logic
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on filter change
    
    let result = jobs;

    // 1. Tab Filter (Saved vs All)
    if (activeTab === 'saved') {
      result = result.filter(job => savedJobs.includes(job.id));
    }

    // 2. Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.position.toLowerCase().includes(lower) || 
        job.company.toLowerCase().includes(lower) ||
        job.tags.some(t => t.toLowerCase().includes(lower))
      );
    }

    // 3. Tag
    if (activeTag) {
      result = result.filter(job => 
        job.tags.some(t => t.toLowerCase() === activeTag.toLowerCase())
      );
    }

    // 4. Location Filter
    if (locationFilter !== 'all') {
      if (locationFilter === 'worldwide') {
        result = result.filter(job => job.location.toLowerCase().includes('worldwide') || job.location.toLowerCase().includes('remote'));
      } else {
        result = result.filter(job => !job.location.toLowerCase().includes('worldwide'));
      }
    }

    // 5. Salary Filter
    if (salaryFilter !== 'all') {
      if (salaryFilter === '100k') {
        result = result.filter(job => (job.salary_min || 0) >= 100000);
      } else if (salaryFilter === '150k') {
        result = result.filter(job => (job.salary_min || 0) >= 150000);
      }
    }

    setFilteredJobs(result);
  }, [searchTerm, activeTag, locationFilter, salaryFilter, jobs, activeTab, savedJobs]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden border-b border-white/5 bg-dark-900">
        {/* Background FX */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
           <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {jobs.length > 0 ? `${jobs.length} active remote roles` : 'Loading opportunities...'}
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-bold text-white tracking-tight mb-8 max-w-4xl animate-fade-up" style={{animationDelay: '0.1s'}}>
            Unlock Your Next <br />
            <span className="text-gradient">Career Milestone</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 animate-fade-up" style={{animationDelay: '0.2s'}}>
            Access exclusive remote opportunities at the world's most innovative companies. Powered by <span className="text-white font-semibold">Nexus AI</span> for smarter applications.
          </p>
          
          {/* Main Search Bar */}
          <div className="w-full max-w-4xl relative group animate-fade-up" style={{animationDelay: '0.3s'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative flex flex-col md:flex-row items-stretch bg-[#0F172A] border border-white/10 rounded-xl p-2 shadow-2xl">
              <div className="flex-grow flex items-center px-4 h-14 border-b md:border-b-0 md:border-r border-white/5">
                <SearchIcon className="w-5 h-5 text-slate-400 mr-3" />
                <input 
                  type="text"
                  placeholder="Job title, keywords, or company" 
                  className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-lg outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 p-2">
                 <select 
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="bg-white/5 text-slate-300 text-sm border border-white/10 rounded-lg px-4 h-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer hover:bg-white/10"
                 >
                    <option value="all">Anywhere</option>
                    <option value="worldwide">Worldwide Only</option>
                    <option value="regional">Regional Restricted</option>
                 </select>
                 <select 
                    value={salaryFilter}
                    onChange={(e) => setSalaryFilter(e.target.value)}
                    className="bg-white/5 text-slate-300 text-sm border border-white/10 rounded-lg px-4 h-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer hover:bg-white/10"
                 >
                    <option value="all">Any Salary</option>
                    <option value="100k">$100k+</option>
                    <option value="150k">$150k+</option>
                 </select>
              </div>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-up" style={{animationDelay: '0.4s'}}>
            <span className="text-sm text-slate-500 py-1.5">Trending:</span>
            {POPULAR_TAGS.slice(0, 5).map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeTag === tag 
                  ? 'bg-white text-slate-900 border-white' 
                  : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         
         <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
               {/* Tab Selection (Sidebar Style) */}
               <div className="space-y-2">
                 <button 
                   onClick={() => setActiveTab('discover')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'discover' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                 >
                   <BriefcaseIcon className="w-4 h-4" /> Discover
                 </button>
                 <button 
                   onClick={() => setActiveTab('saved')}
                   className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'saved' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                 >
                   <span className="flex items-center gap-3"><HeartIcon className="w-4 h-4" /> Saved</span>
                   <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{savedJobs.length}</span>
                 </button>
               </div>

               <div className="h-px bg-white/10" />

               <div>
                 <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                   <BriefcaseIcon className="w-4 h-4 text-primary" /> Job Type
                 </h3>
                 <div className="space-y-2">
                   {['Full-time', 'Contract', 'Part-time', 'Freelance'].map(type => (
                     <label key={type} className="flex items-center gap-3 group cursor-pointer">
                       <div className="w-4 h-4 rounded border border-slate-600 bg-slate-800 group-hover:border-primary transition-colors"></div>
                       <span className="text-slate-400 group-hover:text-white transition-colors text-sm">{type}</span>
                     </label>
                   ))}
                 </div>
               </div>
               
               <div>
                 <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                   <MapPinIcon className="w-4 h-4 text-primary" /> Regions
                 </h3>
                 <div className="space-y-2">
                   {['USA', 'Europe', 'Asia', 'Latin America'].map(region => (
                     <label key={region} className="flex items-center gap-3 group cursor-pointer">
                       <div className="w-4 h-4 rounded border border-slate-600 bg-slate-800 group-hover:border-primary transition-colors"></div>
                       <span className="text-slate-400 group-hover:text-white transition-colors text-sm">{region}</span>
                     </label>
                   ))}
                 </div>
               </div>

               <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
                  <h4 className="font-bold text-white mb-2">Nexus AI</h4>
                  <p className="text-xs text-slate-300 mb-4">Optimizing your resume for every application automatically.</p>
                  <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                    Upgrade to Pro
                  </button>
               </div>
            </div>

            {/* Right Column - Job Feed */}
            <div className="flex-grow">
               {/* Tabs for Mobile */}
               <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
                 <button 
                   onClick={() => setActiveTab('discover')}
                   className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border ${activeTab === 'discover' ? 'bg-white text-slate-900 border-white' : 'text-slate-400 border-white/10'}`}
                 >
                   Discover
                 </button>
                 <button 
                   onClick={() => setActiveTab('saved')}
                   className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border ${activeTab === 'saved' ? 'bg-white text-slate-900 border-white' : 'text-slate-400 border-white/10'}`}
                 >
                   Saved ({savedJobs.length})
                 </button>
               </div>

               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-white">
                    {activeTab === 'saved' ? 'Saved Jobs' : (activeTag ? `${activeTag.charAt(0).toUpperCase() + activeTag.slice(1)} Jobs` : 'Latest Opportunities')}
                  </h2>
                  <span className="text-slate-400 text-sm font-mono">{filteredJobs.length} results</span>
               </div>

               {status === FetchStatus.LOADING ? (
                 <div className="space-y-4">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className="h-32 glass-card rounded-xl animate-pulse" />
                   ))}
                 </div>
               ) : (
                 <div className="space-y-4">
                   {paginatedJobs.length > 0 ? (
                      paginatedJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))
                   ) : (
                     <div className="text-center py-20 glass rounded-2xl border border-dashed border-slate-700">
                       <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                          {activeTab === 'saved' ? <HeartIcon className="w-8 h-8 text-slate-500" /> : <SearchIcon className="w-8 h-8 text-slate-500" />}
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">
                         {activeTab === 'saved' ? 'No saved jobs yet' : 'No matches found'}
                       </h3>
                       <p className="text-slate-500 mb-6">
                         {activeTab === 'saved' 
                            ? 'Bookmark opportunities you want to come back to later.' 
                            : 'Try adjusting your filters or search terms.'}
                       </p>
                       {activeTab === 'discover' && (
                         <button 
                           onClick={() => { setSearchTerm(''); setActiveTag(null); setSalaryFilter('all'); setLocationFilter('all'); }}
                           className="text-primary hover:text-primary-hover font-medium"
                         >
                           Clear all filters
                         </button>
                       )}
                       {activeTab === 'saved' && (
                          <button 
                             onClick={() => setActiveTab('discover')}
                             className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
                          >
                             Browse Jobs
                          </button>
                       )}
                     </div>
                   )}
                 </div>
               )}

               {/* Pagination */}
               <Pagination 
                 currentPage={currentPage} 
                 totalPages={totalPages} 
                 onPageChange={handlePageChange} 
               />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;