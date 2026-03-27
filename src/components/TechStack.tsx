import React, { useLayoutEffect, useRef } from 'react';

interface TechItemProps {
  icon: string;
  name: string;
}

const TechItem: React.FC<TechItemProps> = ({ icon, name }) => (
  <div className="tech-item flex items-center gap-3 md:gap-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-3 md:p-5 shadow-lg dark:shadow-none transition-all duration-300 group relative overflow-hidden h-full">
    {/* Item Ornaments */}
    <div className="absolute top-0 left-0 size-2 border-t border-l border-primary/20 group-hover:border-primary/60 transition-colors"></div>
    <div className="absolute bottom-0 right-0 size-2 border-b border-r border-primary/20 group-hover:border-primary/60 transition-colors"></div>
    
    <div className="tech-icon-container flex size-10 md:size-12 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-slate-950 relative z-10 shadow-inner">
      <span className="material-symbols-outlined text-xl md:text-2xl">{icon}</span>
    </div>
    <div className="flex flex-col relative z-10">
      <h2 className="text-[10px] sm:text-xs md:text-sm font-black leading-tight text-slate-800 dark:text-slate-200 uppercase tracking-wider truncate md:whitespace-normal">{name}</h2>
    </div>
    
    {/* Subtle Inner Glow on Hover */}
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
  </div>
);

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // Reveal Categories with Liquid Stagger
      gsap.utils.toArray('.tech-category').forEach((category: any) => {
        gsap.fromTo(category,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
            }
          }
        );

        const items = category.querySelectorAll('.tech-item');
        gsap.fromTo(items,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: category,
              start: "top 80%",
            }
          }
        );
      });

      gsap.fromTo('.tools-section',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.tools-section',
            start: "top 95%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="skills" className="relative flex h-auto w-full flex-col items-center justify-center py-6 md:py-8 lg:py-10 xl:py-12 px-6 md:px-8 lg:px-12 bg-transparent overflow-hidden">
      {/* Structural Ornaments */}
      <div className="absolute top-0 right-0 size-32 border-t border-r border-primary/10 rounded-tr-3xl pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 left-0 size-32 border-b border-l border-primary/10 rounded-bl-3xl pointer-events-none opacity-40"></div>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30"></div>
      
      {/* Scanline Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-10">
        <div className="w-full h-[1px] bg-primary/30 absolute top-[-10%] animate-[scanline_6s_linear_infinite]"></div>
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="flex flex-col gap-8 md:gap-14 lg:gap-16">
          {/* Main Header Narrative */}
          <div className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 w-full max-w-7xl mx-auto mb-2 md:mb-4 relative">
             {/* Diagonal Header Detail */}
            <div className="absolute -left-1 -top-1 size-3 bg-primary rounded-sm shadow-[0_0_10px_#00F0FF]"></div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Technical Proficiency</span>
              <div className="h-[1px] w-12 bg-primary/20"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
              My Tech Stack
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Orchestrating robust applications through an elite selection of languages, frameworks, and infrastructure tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
            <div className="tech-category flex flex-col gap-6 md:gap-10">
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-12 bg-primary/30"></div>
                <h3 className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Core Engineering</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-5 lg:gap-6">
                <TechItem icon="terminal" name="TypeScript" />
                <TechItem icon="developer_mode_tv" name="React.js" />
                <TechItem icon="hub" name="Supabase" />
                <TechItem icon="api" name="API Integration" />
                <TechItem icon="dns" name="Node.js" />
                <TechItem icon="air" name="Tailwind CSS" />
                <TechItem icon="database" name="Vite / Build" />
                <TechItem icon="code" name="JavaScript" />
              </div>
            </div>

            <div className="tech-category flex flex-col gap-6 md:gap-10">
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-12 bg-indigo-500/30"></div>
                <h3 className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Data & AI Systems</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-5 lg:gap-6">
                <TechItem icon="data_exploration" name="Python" />
                <TechItem icon="precision_manufacturing" name="Machine Learning" />
                <TechItem icon="psychology" name="Deep Learning" />
                <TechItem icon="smart_toy" name="Generative AI" />
                <TechItem icon="analytics" name="Pandas / NumPy" />
                <TechItem icon="query_stats" name="Scikit-learn" />
                <TechItem icon="auto_graph" name="TensorFlow" />
                <TechItem icon="history_edu" name="LangChain" />
              </div>
            </div>
          </div>

          <div className="tools-section flex flex-col items-center gap-6 md:gap-12 pt-10 border-t border-slate-200 dark:border-white/5 relative">
            <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-24 h-[1px] bg-primary"></div>
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-slate-400">ECOSYSTEM_DATA</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 lg:gap-10 px-4">
              {["Git / GitHub", "Docker", "Figma", "AWS", "Postman", "Cloudinary"].map(tool => (
                <span key={tool} className="px-5 md:px-8 py-2 md:py-3 rounded-xl glass dark:bg-white/[0.02] text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-all hover:text-primary hover:border-primary/30 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
