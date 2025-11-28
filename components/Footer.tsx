import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-background-light dark:bg-background-dark">
      {/* CTA Section */}
      <div className="@container border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-6 px-4 py-16 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight max-w-2xl">
              Let's Connect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal max-w-2xl">
              Interested in working together? I'm always open to discussing new projects and opportunities.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3 max-w-md">
              <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-wide grow transition-colors hover:bg-primary/90" href="mailto:johndoe@email.com">
                <span className="truncate">Email Me</span>
              </a>
              <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-base font-bold leading-normal tracking-wide grow transition-colors hover:bg-slate-300 dark:hover:bg-slate-700" href="#">
                <span className="truncate">LinkedIn</span>
              </a>
              <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-base font-bold leading-normal tracking-wide grow transition-colors hover:bg-slate-300 dark:hover:bg-slate-700" href="#">
                <span className="truncate">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="flex flex-col items-center gap-6 px-5 py-10 text-center border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap justify-center gap-6">
          <a aria-label="Email me" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="mailto:johndoe@email.com">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>mail</span>
          </a>
          <a aria-label="Visit my LinkedIn profile" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
            </svg>
          </a>
          <a aria-label="Visit my GitHub profile" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .266.18.577.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path>
            </svg>
          </a>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">© 2024 John Doe. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;