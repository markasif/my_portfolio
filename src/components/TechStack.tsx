import React, { useLayoutEffect, useRef } from 'react';

interface TechItemProps {
  icon: string;
  name: string;
}

const TechItem: React.FC<TechItemProps> = ({ icon, name }) => (
  <div className="tech-item flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 group cursor-none">
    <div className="tech-icon-container flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h2 className="text-sm font-black leading-tight text-slate-800 dark:text-slate-200 uppercase tracking-wider">{name}</h2>
  </div>
);

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // 1. Narrative Section Title Reveal
      gsap.fromTo('.tech-title-narrative',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: '.tech-title-narrative',
            start: "top 90%",
          }
        }
      );

      // 2. Reveal Categories with Liquid Stagger
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

        // 3. Magnetic Hover Effect for items
        const items = category.querySelectorAll('.tech-item');
        items.forEach((item: HTMLElement) => {
          item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(item, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.4,
              ease: "power2.out"
            });

            gsap.to(item.querySelector('.tech-icon-container'), {
              x: x * 0.15,
              y: y * 0.15,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to([item, item.querySelector('.tech-icon-container')], {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)"
            });
          });
        });

        // Intro stagger for items
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

      // 4. Collaborative Tools reveal
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

      <div className="w-full max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
          {/* Main Header Narrative */}
          <div className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 w-full max-w-7xl mx-auto mb-2 md:mb-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">SKILLS & EXPERTISE</span>
              <div className="h-[1px] w-12 bg-primary/20"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
              My Tech Stack
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Orchestrating robust applications through an elite selection of languages, frameworks, and infrastructure tools.
            </p>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
            {/* Full Stack Development */}
            <div className="tech-category flex flex-col gap-6 md:gap-10">
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-12 bg-primary/30"></div>
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Frontend & Infrastructure</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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

            {/* Data Science & AI */}
            <div className="tech-category flex flex-col gap-6 md:gap-10">
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-12 bg-indigo-500/30"></div>
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Data & AI Engineering</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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

          {/* Tools & Workflow */}
          <div className="tools-section flex flex-col items-center gap-8 md:gap-12 pt-10 md:pt-16 lg:pt-20 border-t border-slate-200 dark:border-white/5">
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-slate-400">ECOSYSTEM</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-10">
              {["Git / GitHub", "Docker", "Figma", "AWS", "Postman", "Cloudinary"].map(tool => (
                <span key={tool} className="px-6 md:px-8 py-2 md:py-3 rounded-2xl glass dark:bg-white/[0.02] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-all hover:text-primary hover:border-primary/30 hover:-translate-y-1">
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
