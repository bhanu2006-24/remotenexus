import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job } from '../types';
import { XIcon, CheckIcon } from '../components/Icons';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Saved Jobs Logic
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('remoteNexus_savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('remoteNexus_savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(prev => prev.filter(id => id !== jobId));
      addToast('Job removed from saved list', 'info');
    } else {
      setSavedJobs(prev => [...prev, jobId]);
      addToast('Job saved successfully!', 'success');
    }
  };

  const isSaved = (jobId: string) => savedJobs.includes(jobId);

  // Toast Logic
  const [toasts, setToasts] = useState<Toast[]>([]);

  return (
    <StoreContext.Provider value={{ savedJobs, toggleSaveJob, isSaved, addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className="animate-fade-up pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]"
          >
            <div className={`p-1 rounded-full ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {toast.type === 'success' ? <CheckIcon className="w-4 h-4" /> : <span className="w-4 h-4 block bg-current rounded-full" />}
            </div>
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
};