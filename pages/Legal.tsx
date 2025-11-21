import React from 'react';
import { useLocation } from 'react-router-dom';

const Legal: React.FC = () => {
  const location = useLocation();
  const type = location.pathname.includes('privacy') ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-white mb-8">{type}</h1>
      
      <div className="prose prose-invert prose-lg text-slate-300 bg-slate-900/50 p-8 rounded-2xl border border-white/5">
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h3>1. Introduction</h3>
        <p>Welcome to RemoteNexus. By accessing our website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h3>2. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on RemoteNexus' website for personal, non-commercial transitory viewing only.</p>
        
        <h3>3. Disclaimer</h3>
        <p>The materials on RemoteNexus' website are provided on an 'as is' basis. RemoteNexus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h3>4. Limitations</h3>
        <p>In no event shall RemoteNexus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RemoteNexus' website.</p>
        
        <h3>5. Accuracy of Materials</h3>
        <p>The materials appearing on RemoteNexus' website could include technical, typographical, or photographic errors. RemoteNexus does not warrant that any of the materials on its website are accurate, complete or current.</p>
      </div>
    </div>
  );
};

export default Legal;