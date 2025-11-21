import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';
import { Job } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/Icons';

interface CompanyStat {
  name: string;
  logo: string;
  jobCount: number;
  tags: string[];
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { jobs } = await fetchJobs();
      const companyMap = new Map<string, CompanyStat>();

      jobs.forEach(job => {
        if (!companyMap.has(job.company)) {
          companyMap.set(job.company, {
            name: job.company,
            logo: job.company_logo,
            jobCount: 0,
            tags: []
          });
        }
        const stat = companyMap.get(job.company)!;
        stat.jobCount += 1;
        // Add unique tags (limit to 3)
        job.tags.forEach(t => {
           if (!stat.tags.includes(t) && stat.tags.length < 3) stat.tags.push(t);
        });
      });

      setCompanies(Array.from(companyMap.values()).sort((a, b) => b.jobCount - a.jobCount));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
       <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Top Remote Companies</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Discover the organizations leading the remote work revolution. Based on active listings on Nexus.</p>
       </div>

       {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
               <div key={i} className="h-40 glass-card rounded-xl animate-pulse" />
            ))}
          </div>
       ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {companies.map((company, idx) => (
                <div key={idx} className="glass-card rounded-xl p-6 flex flex-col items-start hover:border-primary/30 transition-all group">
                   <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-16 h-16 rounded-lg bg-white object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}` }}
                      />
                      <div>
                         <h3 className="text-lg font-bold text-white">{company.name}</h3>
                         <span className="text-sm text-primary">{company.jobCount} active roles</span>
                      </div>
                   </div>
                   
                   <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {company.tags.map(tag => (
                         <span key={tag} className="text-xs bg-white/5 text-slate-400 px-2 py-1 rounded border border-white/5">
                            {tag}
                         </span>
                      ))}
                   </div>

                   <Link 
                     to={`/?search=${encodeURIComponent(company.name)}`}
                     className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center text-white font-medium transition-colors"
                   >
                      View Jobs
                   </Link>
                </div>
             ))}
          </div>
       )}
    </div>
  );
};

export default Companies;