import React, { useLayoutEffect, useRef } from 'react';

interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  link: string;
  image: string;
  type: 'Static' | 'Dynamic';
  specialFeature?: string;
}

const ProjectCard: React.FC<Project> = ({ title, category, desc, tags, link, image, type }) => {
  return (
    <div className="project-card relative flex flex-col bg-white/[0.02] rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-500 backdrop-blur-2xl hover:bg-white/[0.04]">
      {/* Visual Header (Image Container) */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem] border-b border-white/5 shadow-2xl">
         <div 
           className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
           style={{ backgroundImage: `url("${image}")` }} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/90 via-[#050814]/20 to-transparent"></div>
         
         {/* Simple Action Label */}
         <div className="absolute top-4 right-4">
            <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[7px] font-black uppercase tracking-widest text-[#00F0FF]">
              {type}
            </div>
         </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 px-4 py-1 md:px-8 md:py-4 gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-[#00F0FF]/60 uppercase tracking-[0.4em]">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white font-display uppercase italic tracking-tight leading-none pt-1">
            {title}
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed line-clamp-2">
          {desc}
        </p>

        <div className="mt-auto pt-4 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 text-[8px] font-bold text-white/40 bg-white/5 rounded-lg border border-white/5 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl border border-[#00F0FF]/20 text-[#00F0FF] text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]/40 active:scale-95"
          >
            <span>Explore Project</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: "Zyvest",
      category: "Fintech",
      desc: "Enterprise fintech ecosystem for forex trading with secure multi-currency wallets and real-time PAMM account management.",
      tags: ["React", "API", "Fintech"],
      link: "https://zyvest.com/",
      image: "/images/zyvest.webp",
      type: "Dynamic"
    },
    {
      title: "WFSK World",
      category: "Federation",
      desc: "Global Karate Federation hub with custom administration and integrated Supabase real-time data sync.",
      tags: ["Supabase", "CDN", "Admin"],
      link: "https://wfsk-world-federation-of-shotokan-k.vercel.app/",
      image: "/images/wfsk.webp",
      type: "Dynamic"
    },
    {
      title: "Depro Trading",
      category: "Hardware",
      desc: "Industrial-grade B2B procurement platform for cross-border supply chain and enterprise hardware catalog management.",
      tags: ["B2B", "Industrial", "ERP"],
      link: "#",
      image: "/images/depro.webp",
      type: "Dynamic"
    },
    {
      title: "Suryakiran Physio",
      category: "Healthcare",
      desc: "Specialized physiotherapy clinic portal with patient appointment systems and search-optimized service catalogs.",
      tags: ["React", "SEO", "Healthcare"],
      link: "https://www.suryakiranphysio.com/",
      image: "/images/suryakiran.webp",
      type: "Static"
    },
    {
      title: "Dayoff Journeys",
      category: "Travel",
      desc: "Immersive travel-tech platform with high-fidelity motion transitions for global curated destination storytelling.",
      tags: ["Motion", "UX", "Travel"],
      link: "http://www.dayoffjourneys.com/",
      image: "/images/dayofjourney.webp",
      type: "Static"
    },
    {
      title: "Form and Field",
      category: "Education",
      desc: "Modern institutional portal for academic resource management and efficient faculty-student collaboration.",
      tags: ["Vite", "Academic", "Portal"],
      link: "https://www.formandfieldedu.in/",
      image: "/images/formandfield.webp",
      type: "Static"
    },
    {
      title: "Dive to AI",
      category: "AI Service",
      desc: "Next.js-powered educational frontier dedicated to AI/ML research and futuristic technical service delivery.",
      tags: ["Next.js", "AI", "ML"],
      link: "https://www.diveto.ai",
      image: "/images/DivetoAi.webp",
      type: "Static"
    },
    {
      title: "Sevana Medicals",
      category: "Pharmacy",
      desc: "Efficient pharmaceutical B2B catalog system for medical professionals to manage localized pharmaceutical inventory.",
      tags: ["React", "Inventory", "B2B"],
      link: "https://new-sevana-medicals.vercel.app/",
      image: "/images/sevana.webp",
      type: "Static"
    },
    {
      title: "Chamayam",
      category: "Fashion",
      desc: "Digital heritage textile catalog featuring high-resolution craftsmanship galleries and categorize fabric collections.",
      tags: ["Fashion", "Vite", "Catalog"],
      link: "https://chamayam-mtj6.vercel.app/",
      image: "/images/chamayam.webp",
      type: "Static"
    },
    {
      title: "Echo Hearing",
      category: "Healthcare",
      desc: "Professional consultation portal for hearing aid services with specialized SEO and accessibility features.",
      tags: ["SEO", "Accessibiity", "Health"],
      link: "https://www.echohearingaid.com/",
      image: "/images/echohearing.webp",
      type: "Static"
    },
    {
      title: "GNOM",
      category: "Security",
      desc: "Integrated technical portal for advanced electrical systems and professional-tier industrial security solutions.",
      tags: ["Security", "Electrical", "System"],
      link: "https://depro-trading-s5zp.vercel.app/",
      image: "/images/gnom.webp",
      type: "Static"
    },
    {
      title: "Ammayi Thakkaram",
      category: "Culinary",
      desc: "Traditional restaurant platform featuring immersive menu storytelling and digital dining experiences.",
      tags: ["React", "Food-Tech", "UX"],
      link: "https://ammayi-thakkaram.vercel.app/",
      image: "/images/ammayi.webp",
      type: "Static"
    },
    {
      title: "BS PAI",
      category: "Retail",
      desc: "Robust commercial marketplace for professional-tier retail and wholesale building construction materials.",
      tags: ["Business", "Retail", "Supplies"],
      link: "https://bs-pai.vercel.app/",
      image: "/images/Bs_Pai.webp",
      type: "Static"
    },
    {
      title: "Crafi Innovations",
      category: "Creative",
      desc: "Artisanal e-commerce environment merging artist portfolios with functional marketplace for creative art craft.",
      tags: ["Creative", "E-commerce", "Store"],
      link: "https://crafi-innovations.vercel.app/",
      image: "/images/Crafi.webp",
      type: "Static"
    }
  ];

  const [visibleCount, setVisibleCount] = React.useState(6);
  const hasMore = visibleCount < projects.length;
  const handleLoadMore = () => setVisibleCount(projects.length);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.projects-header',
            start: "top 90%",
          }
        }
      );

      gsap.fromTo('.project-card',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="projects" ref={containerRef} className="relative flex h-auto w-full flex-col bg-transparent py-6 md:py-8 lg:py-10 xl:py-12 px-6 md:px-8 lg:px-12 overflow-hidden">

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 md:gap-14 lg:gap-16 relative z-10">
        <div className="projects-header flex flex-col items-start gap-4 border-l-4 border-primary pl-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">PROJECT SHOWCASE</span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
            Selected Works
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            A curated collection of scalable architectures and digital products built with modern frameworks. Every project represents a technical challenge solved through robust engineering.
          </p>
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <div className="flex items-center gap-2">
               <div className="size-1.5 rounded-full bg-slate-400 opacity-40"></div>
               <span className="text-slate-500 dark:text-slate-400">Static</span>
            </div>
            <div className="h-3 w-[1px] bg-slate-200 dark:bg-white/10"></div>
            <div className="flex items-center gap-2">
               <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
               <span className="text-slate-900 dark:text-white">Dynamic</span>
            </div>
          </div>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {projects.slice(0, visibleCount).map((p, idx) => (
            <ProjectCard key={idx} {...p} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="group relative flex items-center gap-5 px-12 py-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white/60 transition-all hover:text-primary hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,240,255,0.1)] overflow-hidden"
            >
              <span className="relative z-10">Load More Project</span>
              <div className="relative size-5 flex items-center justify-center z-10">
                 <span className="material-symbols-outlined text-lg transition-transform duration-700 group-hover:rotate-180">sync</span>
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
