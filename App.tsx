import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Companies from './pages/Companies';
import Salaries from './pages/Salaries';
import About from './pages/About';
import Legal from './pages/Legal';
import { StoreProvider } from './context/Store';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-primary/30 selection:text-white flex flex-col">
          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/salaries" element={<Salaries />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;