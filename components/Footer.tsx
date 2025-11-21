import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { SparklesIcon, GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/bhanu2006-24' },
    { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/bhanu-saini-3bb251391/' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com/krishna_websites' },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#020617] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The premier destination for remote professionals. Connecting top talent with forward-thinking companies worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-white transition-all group"
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:pl-10">
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-primary transition-colors">Companies</Link></li>
              <li><Link to="/salaries" className="hover:text-primary transition-colors">Salaries</Link></li>
              <li><Link to="/?tab=saved" className="hover:text-primary transition-colors">Saved Jobs</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
             <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
             </p>
             <span className="hidden md:block text-slate-700">|</span>
             <p className="text-slate-400 text-sm">
               Founded by <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white underline decoration-slate-600 underline-offset-4 hover:decoration-primary transition-all">Bhanu Saini</a>
             </p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;