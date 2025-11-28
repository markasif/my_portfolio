import React from 'react';

const Experience: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-[50vh] w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-10 sm:py-20 px-4 sm:px-8">
          <div className="layout-content-container flex flex-col w-full max-w-4xl flex-1">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight px-4 pb-10">Work Experience</h2>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-12 px-4">
              
              {/* Timeline Item 1 */}
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  radio_button_checked
                </span>
                <div className="w-0.5 bg-slate-300 dark:bg-slate-700 h-full"></div>
              </div>
              <div className="flex flex-1 flex-col pb-16">
                <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Senior Frontend Developer</p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Innovate Inc. | Jan 2022 - Present</p>
                <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Led the migration of a monolithic frontend to a micro-frontend architecture, improving deployment frequency by 200% and reducing page load times by 40%.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Mentored two junior developers, fostering their growth in React and TypeScript through pair programming and code reviews.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Developed and maintained a component library used by 5+ teams, increasing code reuse by 60% and ensuring design consistency.</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-5 flex-wrap">
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">React</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">TypeScript</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">GraphQL</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">AWS</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-3xl">
                  radio_button_unchecked
                </span>
                <div className="w-0.5 bg-slate-300 dark:bg-slate-700 h-full"></div>
              </div>
              <div className="flex flex-1 flex-col pb-16">
                <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Frontend Developer</p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Tech Solutions | Jun 2019 - Dec 2021</p>
                <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Collaborated in a cross-functional team to build and launch a new customer-facing analytics dashboard, resulting in a 25% increase in user engagement.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Wrote and maintained comprehensive unit and integration tests with Jest and React Testing Library, increasing code coverage from 70% to 92%.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Optimized application performance by implementing code splitting and lazy loading techniques, improving the Lighthouse performance score by 15 points.</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-5 flex-wrap">
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">JavaScript</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">Redux</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">Jest</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">Webpack</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-3xl">
                  radio_button_unchecked
                </span>
              </div>
              <div className="flex flex-1 flex-col pb-10">
                <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Junior Web Developer</p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">WebStart Co. | Jul 2018 - May 2019</p>
                <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Assisted in developing and maintaining client websites using HTML, CSS, and jQuery, resulting in a 10% average increase in client satisfaction scores.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="material-symbols-outlined text-primary/80 mt-1">arrow_right_alt</span>
                    <span>Implemented responsive designs for new and existing websites, ensuring optimal viewing experience across all devices and boosting mobile traffic by 15%.</span>
                  </li>
                </ul>
                <div className="flex gap-2 pt-5 flex-wrap">
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">HTML5</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">CSS3</p>
                  </div>
                  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 px-4">
                    <p className="text-primary text-sm font-medium leading-normal">jQuery</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;