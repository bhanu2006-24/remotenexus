import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';
import { Job } from '../types';
import { DollarSignIcon } from '../components/Icons';

const Salaries: React.FC = () => {
  const [highPayingJobs, setHighPayingJobs] = useState<Job[]>([]);
  const [avgSalary, setAvgSalary] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { jobs } = await fetchJobs();
      // Filter jobs with salary info
      const withSalary = jobs.filter(j => j.salary_min);
      
      // Calculate Average
      const total = withSalary.reduce((acc, curr) => acc + (curr.salary_min || 0), 0);
      setAvgSalary(withSalary.length ? Math.round(total / withSalary.length) : 0);

      // Top 5 Highest
      const top = [...withSalary].sort((a, b) => (b.salary_max || b.salary_min || 0) - (a.salary_max || a.salary_min || 0)).slice(0, 6);
      setHighPayingJobs(top);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
       <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Remote Salary Insights</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Transparent compensation data from real job listings to help you negotiate better.</p>
       </div>

       {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-2 border-primary rounded-full border-t-transparent" /></div>
       ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               <div className="glass-card p-8 rounded-2xl text-center border border-emerald-500/20 bg-emerald-500/5">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Average Remote Base</p>
                  <p className="text-4xl font-display font-bold text-emerald-400">${(avgSalary / 1000).toFixed(1)}k</p>
               </div>
               <div className="glass-card p-8 rounded-2xl text-center">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Highest Tracked</p>
                  <p className="text-4xl font-display font-bold text-white">
                     ${highPayingJobs.length > 0 ? Math.round((highPayingJobs[0].salary_max || 0)/1000) : 0}k
                  </p>
               </div>
               <div className="glass-card p-8 rounded-2xl text-center">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Jobs with Salary Data</p>
                  <p className="text-4xl font-display font-bold text-white">{highPayingJobs.length > 0 ? '500+' : '0'}</p>
               </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Highest Paying Roles</h2>
            <div className="space-y-4">
               {highPayingJobs.map(job => (
                  <div key={job.id} className="glass p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                     <div>
                        <h3 className="text-lg font-bold text-white">{job.position}</h3>
                        <p className="text-slate-400 text-sm">{job.company}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <p className="text-xl font-bold text-emerald-400">
                              ${Math.round((job.salary_min || 0)/1000)}k - ${job.salary_max ? Math.round(job.salary_max/1000) + 'k' : '++'}
                           </p>
                           <p className="text-xs text-slate-500">Yearly Estimate</p>
                        </div>
                        <a href={job.apply_url} target="_blank" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">View</a>
                     </div>
                  </div>
               ))}
            </div>
          </>
       )}
    </div>
  );
};

export default Salaries;