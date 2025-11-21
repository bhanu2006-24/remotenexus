import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobs } from '../services/jobService';
import { generateCoverLetter, summarizeJob } from '../services/geminiService';
import { Job } from '../types';
import { MapPinIcon, BriefcaseIcon, SparklesIcon, ArrowRightIcon, DollarSignIcon, HeartIcon } from '../components/Icons';
import AIModal from '../components/AIModal';
import JobCard from '../components/JobCard';
import { useStore } from '../context/Store';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isSaved, toggleSaveJob } = useStore();
  
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // AI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiContent, setAiContent] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const getJob = async () => {
      setLoading(true);
      const { jobs } = await fetchJobs();
      const found = jobs.find(j => j.id === id);
      setJob(found || null);
      
      if (found) {
        // Calculate Similar Jobs based on matching tags
        const others = jobs.filter(j => j.id !== found.id);
        const scored = others.map(j => {
          const matchCount = j.tags.filter(tag => found.tags.includes(tag)).length;
          return { ...j, score: matchCount };
        });
        // Sort by score and take top 3
        scored.sort((a, b) => b.score - a.score);
        setSimilarJobs(scored.slice(0, 3));
      }
      
      setLoading(false);
    };
    getJob();
  }, [id]);

  const handleGenerateCoverLetter = async () => {
    if (!job) return;
    setModalTitle('Smart Cover Letter');
    setIsModalOpen(true);
    setAiLoading(true);
    
    const result = await generateCoverLetter(job.position, job.company, job.description);
    setAiContent(result);
    setAiLoading(false);
  };

  const handleSummarize = async () => {
    if (!job) return;
    setModalTitle('Role Insights');
    setIsModalOpen(true);
    setAiLoading(true);

    const result = await summarizeJob(job.description);
    setAiContent(result);
    setAiLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
         <p className="text-slate-400 font-medium">Retrieving job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl text-white font-bold">Position unavailable</h2>
        <p className="text-slate-500">This job post may have expired or been removed.</p>
        <Link to="/" className="px-6 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-colors">Browse active jobs</Link>
      </div>
    );
  }

  const saved = isSaved(job.id);

  return (
    <div className="min-h-screen pb-20 pt-10">
      <AIModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={aiContent}
        isLoading={aiLoading}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center text-sm text-slate-500 mb-8">
           <Link to="/" className="hover:text-white transition-colors">Jobs</Link>
           <span className="mx-2">/</span>
           <span className="text-slate-300 truncate max-w-[200px]">{job.company}</span>
           <span className="mx-2">/</span>
           <span className="text-white truncate">{job.position}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content - Left */}
          <div className="lg:col-span-8">
             {/* Header Card */}
             <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden border-t border-white/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                
                <div className="relative z-10">
                  <img 
                     src={job.company_logo} 
                     alt={job.company} 
                     className="w-16 h-16 rounded-xl bg-white object-contain p-1 shadow-lg mb-6"
                     onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}` }}
                  />
                  
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 leading-tight">{job.position}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-8">
                    <span className="flex items-center text-sm font-medium text-white">
                       <BriefcaseIcon className="w-4 h-4 mr-2 text-primary" /> {job.company}
                    </span>
                    <span className="flex items-center text-sm">
                      <MapPinIcon className="w-4 h-4 mr-2 text-slate-500" /> {job.location}
                    </span>
                    {job.salary_min && (
                       <span className="flex items-center text-sm text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                          <DollarSignIcon className="w-3.5 h-3.5 mr-1" /> 
                          ${Math.round(job.salary_min / 1000)}k - {job.salary_max ? `$${Math.round(job.salary_max / 1000)}k` : '++'}
                       </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={job.apply_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                    >
                      Apply Now <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </a>
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors border flex items-center justify-center gap-2 ${
                        saved 
                          ? 'bg-secondary/20 border-secondary/50 text-secondary hover:bg-secondary/30' 
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <HeartIcon className="w-5 h-5" filled={saved} />
                      {saved ? 'Saved' : 'Save Job'}
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="px-6 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
                    >
                      Share
                    </button>
                  </div>
                </div>
             </div>

             {/* Description */}
             <div className="glass rounded-2xl p-8 border border-white/5 mb-8">
                <h2 className="text-xl font-bold text-white mb-6 font-display">Role Description</h2>
                <div 
                  className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary-hover prose-li:marker:text-slate-500"
                  dangerouslySetInnerHTML={{ __html: job.description }} 
                />
             </div>

             {/* Similar Jobs */}
             {similarJobs.length > 0 && (
               <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Similar Opportunities</h2>
                  <div className="space-y-4">
                     {similarJobs.map(similar => (
                        <JobCard key={similar.id} job={similar} />
                     ))}
                  </div>
               </div>
             )}
          </div>

          {/* Sidebar - Right */}
          <div className="lg:col-span-4 space-y-6">
             {/* AI Tools Card */}
             <div className="glass-card rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-4">
                      <SparklesIcon className="w-5 h-5 text-primary animate-pulse" />
                      <h3 className="font-bold text-white">Nexus Assistant</h3>
                   </div>
                   <p className="text-sm text-slate-400 mb-6">
                      Use our AI tools to drastically increase your chances of landing this role.
                   </p>
                   
                   <div className="space-y-3">
                      <button 
                        onClick={handleGenerateCoverLetter}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 transition-all group"
                      >
                         <span className="text-sm font-medium text-slate-200 group-hover:text-white">Generate Cover Letter</span>
                         <ArrowRightIcon className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                      </button>
                      
                      <button 
                        onClick={handleSummarize}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 transition-all group"
                      >
                         <span className="text-sm font-medium text-slate-200 group-hover:text-white">Key Insights & Fit</span>
                         <ArrowRightIcon className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                      </button>
                   </div>
                </div>
             </div>

             {/* Tech Stack */}
             <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="bg-slate-900 text-slate-300 px-3 py-1 rounded-lg text-xs font-mono border border-slate-700 hover:border-slate-500 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
             </div>

             {/* Safety */}
             <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Verified Job</h3>
                <p className="text-xs text-slate-400">
                  This job was sourced from RemoteOK and verified by our automated systems. Always be cautious when sharing personal info.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetail;