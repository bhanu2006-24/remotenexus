import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { MapPinIcon, DollarSignIcon, ArrowRightIcon, HeartIcon } from './Icons';
import { useStore } from '../context/Store';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { isSaved, toggleSaveJob } = useStore();
  const saved = isSaved(job.id);

  const date = new Date(job.date);
  const dateStr = isNaN(date.getTime()) ? 'Recently' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  return (
    <Link 
      to={`/job/${job.id}`} 
      className="block group relative glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-white p-1.5 shadow-lg overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
             <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={job.company_logo} 
                  alt={job.company} 
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&color=fff` }}
                />
             </div>
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-grow min-w-0 pt-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors truncate font-display pr-10 md:pr-0">
              {job.position}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 flex-shrink-0 bg-white/5 px-2 py-1 rounded border border-white/5">
                Posted {dateStr}
              </span>
              {/* Mobile Save Button (visible on small screens only in header row) */}
              <button 
                onClick={handleSave}
                className="md:hidden absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
              >
                <HeartIcon className={`w-5 h-5 ${saved ? 'fill-secondary text-secondary' : 'text-slate-400'}`} filled={saved} />
              </button>
            </div>
          </div>
          
          <p className="text-slate-300 font-medium mb-4 flex items-center gap-3 text-sm">
            <span className="text-white">{job.company}</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span className="flex items-center text-slate-400">
              <MapPinIcon className="w-3.5 h-3.5 mr-1.5" /> {job.location}
            </span>
            {job.salary_min && (
              <>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span className="flex items-center text-emerald-400">
                  <DollarSignIcon className="w-3.5 h-3.5 mr-1" /> 
                  ${Math.round(job.salary_min / 1000)}k - {job.salary_max ? `$${Math.round(job.salary_max / 1000)}k` : '++'}
                </span>
              </>
            )}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {job.tags.slice(0, 5).map((tag, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-300 border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors"
              >
                {tag}
              </span>
            ))}
            {job.tags.length > 5 && (
               <span className="inline-flex items-center px-2 py-1 text-xs text-slate-500">
                 +{job.tags.length - 5}
               </span>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex flex-col items-end justify-between pl-4 border-l border-white/5 min-w-[80px]">
           <button 
             onClick={handleSave}
             className="p-2 rounded-full hover:bg-white/10 transition-all hover:scale-110 z-20"
             title={saved ? "Unsave Job" : "Save Job"}
           >
             <HeartIcon className={`w-6 h-6 ${saved ? 'fill-secondary text-secondary' : 'text-slate-500 hover:text-secondary'}`} filled={saved} />
           </button>

           <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-primary text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45">
             <ArrowRightIcon className="w-5 h-5" />
           </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;