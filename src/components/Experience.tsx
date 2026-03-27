import React, { useLayoutEffect, useRef } from 'react';

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'Work' | 'Education' | 'Certificate';
  icon: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, company, location, period, description, type, icon }) => {
  return (
    <div className="experience-item group relative flex flex-col gap-6 p-8 rounded-[2.5rem] glass-card transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,240,255,0.1)] border border-slate-100 dark:border-white/5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
              type === 'Work' ? 'bg-primary/20 text-primary' : type === 'Education' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {type}
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{period}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-display uppercase italic tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{company}</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{location}</span>
          </div>
        </div>
        <div className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            <div className="mt-1.5 size-1.5 rounded-full bg-primary/40 shrink-0"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItemProps[] = [
    {
      title: "Full Stack Developer",
      company: "Think Forge Global",
      location: "Kerala, India",
      period: "2025 – Present",
      type: "Work",
      icon: "engineering",
      description: [
        "Developing and deploying 20+ client websites across healthcare, education, travel, and service industries.",
        "Building responsive frontend applications using JavaScript, TypeScript, React, HTML, and CSS.",
        "Integrating backend services using REST APIs and modern database systems.",
        "Designing structured UI systems with consistent theme colors and reusable components.",
        "Managing client communication, requirement gathering, and independent deployment."
      ]
    },
    {
      title: "Data Science Intern",
      company: "Futura Labs",
      location: "Kerala, India",
      period: "Apr 2024 - Oct 2024",
      type: "Work",
      icon: "data_exploration",
      description: [
        "Utilized SQL to extract and manage structured datasets for business problems.",
        "Developed and deployed ML and DL models in Python to generate actionable insights.",
        "Automated data processing and analysis workflows improving reporting efficiency."
      ]
    },
    {
      title: "Master of Computer Application",
      company: "Lovely Professional University",
      location: "Punjab, India",
      period: "Jun 2022 - Apr 2024",
      type: "Education",
      icon: "school",
      description: ["Focused on advanced software engineering, cloud computing, and AI architectures."]
    },
    {
      title: "Bachelor of Computer Application",
      company: "Kristu Jayanti College",
      location: "Bangalore, India",
      period: "Jun 2019 - May 2022",
      type: "Education",
      icon: "history_edu",
      description: ["Foundation in computer science, data structures, and algorithmic logic."]
    }
  ];

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.experience-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.experience-header',
            start: "top 90%",
          }
        }
      );

      gsap.fromTo('.experience-item',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.experience-grid',
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="experience" ref={containerRef} className="relative flex h-auto w-full flex-col bg-transparent py-6 md:py-8 lg:py-10 xl:py-12 px-6 md:px-8 lg:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 md:gap-14 lg:gap-16 relative z-10">
        <div className="experience-header flex flex-col items-start gap-4 border-l-4 border-primary pl-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">CAREER & EDUCATION</span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
            Experience & Education
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            From industrial full-stack development to data science research, my path is driven by a constant pursuit of technical mastery.
          </p>
        </div>

        <div className="experience-grid grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Experience;
