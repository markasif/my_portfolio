import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-6 text-slate-900 dark:text-white">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">John Doe</h2>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#">About</a>
              <a className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#experience">Experience</a>
              <a className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#projects">Projects</a>
              <a className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors" href="#contact">Contact</a>
            </nav>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-6xl md:text-7xl">
                  Full-Stack Engineer
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 md:text-xl">
                  Crafting intuitive user experiences with modern JavaScript frameworks.
                </p>
              </div>
              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <button className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto">
                  <span className="truncate">Download Resume</span>
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6">
                <a aria-label="GitHub Profile" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a aria-label="LinkedIn Profile" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;