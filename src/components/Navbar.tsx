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

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-8 lg:px-12 py-4 ${
        isScrolled 
          ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
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
          className="md:hidden z-[110] relative size-10 flex items-center justify-center text-slate-900 dark:text-white"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 z-[105] md:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-2xl transition-all duration-500 ease-expo ${
            isMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-10">
            {navLinks.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white transition-all duration-500 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="text-primary mr-4 opacity-50 font-sans italic text-xl">0{idx + 1}</span>
                {item.name}
              </a>
            ))}
            
            <div className={`mt-10 flex gap-6 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a href="https://github.com/markasif" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-4xl">code</span>
              </a>
              <a href="https://www.linkedin.com/in/asifap/" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-4xl">share</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
