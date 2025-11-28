import React from 'react';

interface TechItemProps {
  icon: string;
  name: string;
}

const TechItem: React.FC<TechItemProps> = ({ icon, name }) => (
  <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/60 shadow-sm hover:shadow-md">
    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">{icon}</span>
    <h2 className="text-base font-semibold leading-tight text-slate-800 dark:text-slate-200">{name}</h2>
  </div>
);

const TechStack: React.FC = () => {
  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl px-4 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Main Header */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white sm:text-5xl">My Tech Stack</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              A collection of the technologies, languages, and tools I use to build modern web applications.
            </p>
          </div>
          
          {/* Skills Section */}
          <div className="flex flex-col gap-8">
            {/* Languages */}
            <div>
              <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Languages</h3>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <TechItem icon="code" name="JavaScript" />
                <TechItem icon="code" name="TypeScript" />
                <TechItem icon="data_object" name="Python" />
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Frontend</h3>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <TechItem icon="developer_mode_tv" name="React" />
                <TechItem icon="html" name="HTML5" />
                <TechItem icon="css" name="CSS3" />
                <TechItem icon="air" name="Tailwind CSS" />
                <TechItem icon="build_circle" name="Webpack" />
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Backend</h3>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <TechItem icon="dns" name="Node.js" />
                <TechItem icon="directions_bus" name="Express" />
                <TechItem icon="hub" name="Django" />
              </div>
            </div>

            {/* Databases & Caching */}
            <div>
              <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Databases & Caching</h3>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <TechItem icon="database" name="PostgreSQL" />
                <TechItem icon="eco" name="MongoDB" />
                <TechItem icon="speed" name="Redis" />
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Tools & Platforms</h3>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <TechItem icon="merge_type" name="Git" />
                <TechItem icon="deployed_code" name="Docker" />
                <TechItem icon="cloud" name="AWS" />
                <TechItem icon="grid_guides" name="Figma" />
                <TechItem icon="assignment" name="Jira" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;