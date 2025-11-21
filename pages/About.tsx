import React from 'react';
import { APP_NAME } from '../constants';
import { GithubIcon, LinkedinIcon, InstagramIcon, ArrowRightIcon } from '../components/Icons';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            Building the Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Remote Work</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            {APP_NAME} is bridging the gap between global talent and borderless opportunity. We use advanced AI to democratize access to high-paying careers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission Section */}
        <div className="prose prose-invert prose-lg text-slate-300 mb-24">
          <h3>Why we exist</h3>
          <p>
            Finding a job is stressful. Writing cover letters is tedious. Negotiating salaries is awkward.
          </p>
          <p>
            We use advanced AI to automate the boring stuff. Our "Nexus Assistant" helps you understand job requirements instantly and drafts tailored applications in seconds, so you can focus on the interview.
          </p>

          <h3>Our Mission</h3>
          <p>
            To empower 1 million professionals to find meaningful, high-paying remote work by 2026. We believe that where you live should not dictate what you can achieve.
          </p>
        </div>

        {/* Founder Section */}
        <div className="glass-card rounded-3xl p-1 bg-gradient-to-b from-white/10 to-white/0 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none -mr-10 -mt-10"></div>

          <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-[22px] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

              {/* Founder Image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary to-secondary shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img src="/founder.png" alt="Bhanu Saini" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-slate-900 rounded-full flex items-center justify-center" title="Available for work">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                </div>
              </div>

              <div className="text-center md:text-left flex-grow">
                <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Meet the Founder</h2>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Bhanu Saini</h3>
                <p className="text-slate-400 font-mono text-sm mb-6">Full Stack Developer & Visionary</p>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  Bhanu is a passionate developer dedicated to simplifying the complex world of remote recruitment. With deep expertise in modern web technologies like React, Tailwind, and AI integration, he built {APP_NAME} to help developers and designers land their dream roles faster.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href="https://www.linkedin.com/in/bhanu-saini-3bb251391/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077b5] text-white font-medium hover:bg-[#006396] transition-colors shadow-lg shadow-blue-900/20"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/bhanu2006-24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-white/10"
                  >
                    <GithubIcon className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://instagram.com/krishna_websites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    <InstagramIcon className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            Interested in collaborating or reporting a bug?
            <a href="mailto:contact@remotenexus.com" className="text-primary hover:text-primary-hover ml-2 font-medium">Get in touch</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;