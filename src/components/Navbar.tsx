import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 px-6 md:px-8 lg:px-12 py-4 ${
          isScrolled 
            ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl py-3' 
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="flex items-center gap-3 group/logo cursor-pointer z-[110]">
            <div className="size-8 text-primary group-hover/logo:scale-110 transition-transform duration-500">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V44Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white font-display uppercase italic border-b-2 border-transparent group-hover/logo:border-primary transition-all">M. Asif</h2>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 md:gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-all relative group"
                href={item.href}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-indigo-vibrant transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[110] relative size-10 flex items-center justify-center text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
              <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay - Moved outside header to avoid backdrop-filter constraints */}
      <div 
        className={`fixed inset-0 z-[105] md:hidden bg-background-light/98 dark:bg-background-dark/98 backdrop-blur-3xl transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-10">
          {navLinks.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white transition-all duration-500 ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${isMenuOpen ? idx * 100 : 0}ms` }}
            >
              <span className="text-primary mr-4 opacity-50 font-sans italic text-xl">0{idx + 1}</span>
              {item.name}
            </a>
          ))}
          
          <div className={`mt-10 flex gap-6 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="https://github.com/markasif" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/asifap/" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
