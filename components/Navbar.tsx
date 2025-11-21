import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { SparklesIcon, BriefcaseIcon, HeartIcon } from './Icons';
import { useStore } from '../context/Store';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { savedJobs } = useStore();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Find Jobs', path: '/' },
    { name: 'Companies', path: '/companies' },
    { name: 'Salaries', path: '/salaries' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <SparklesIcon className="h-6 w-6 text-white animate-pulse" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Saved Jobs Counter (Mobile/Desktop) */}
            <Link 
              to="/?tab=saved" 
              className="relative p-2 text-slate-400 hover:text-primary hover:bg-white/5 rounded-full transition-all group"
              title="View Saved Jobs"
            >
              <HeartIcon className="w-6 h-6" />
              {savedJobs.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg ring-2 ring-[#020617] animate-bounce">
                  {savedJobs.length}
                </span>
              )}
            </Link>

            <Link 
              to="/"
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <BriefcaseIcon className="w-4 h-4" />
              Post a Job
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/5 absolute w-full animate-fade-up z-50">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary/20 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5">
              <Link to="/" className="block w-full text-center bg-primary text-white px-4 py-3 rounded-xl font-semibold">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;