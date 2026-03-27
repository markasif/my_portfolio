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

const ProjectCard: React.FC<Project> = ({ title, category, desc, tags, link, image, type, specialFeature }) => {
  const systemId = useRef('0x' + (Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase().padStart(6, '0')).current;
  
  return (
    <div className="project-card group relative flex flex-col bg-slate-100/30 dark:bg-slate-900/10 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 transition-all duration-700 hover:border-primary/50 glass-card">
      {/* Structural Corner Brackets */}
      <div className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-primary/10 group-hover:border-primary/60 transition-colors duration-500 rounded-tl-xl p-1 z-20"></div>
      <div className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-primary/10 group-hover:border-primary/60 transition-colors duration-500 rounded-tr-xl p-1 z-20"></div>
      <div className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-primary/10 group-hover:border-primary/60 transition-colors duration-500 rounded-bl-xl p-1 z-20"></div>
      <div className="absolute bottom-0 right-0 size-8 border-b-2 border-r-2 border-primary/10 group-hover:border-primary/60 transition-colors duration-500 rounded-br-xl p-1 z-20"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Scanline Animation (Simplified) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-10 group-hover:opacity-20">
        <div className="w-full h-[2px] bg-primary/20 absolute top-[-10%] animate-[scanline_4s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Browser Mockup Section */}
        <div className="relative px-5 pt-5 shrink-0">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950/20 shadow-xl group/browser">
             {/* Header */}
             <div className="absolute top-0 inset-x-0 h-6 bg-slate-900/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-3 z-20">
                <div className="flex gap-1">
                  <div className="size-1 rounded-full bg-red-500/40"></div>
                  <div className="size-1 rounded-full bg-amber-500/40"></div>
                  <div className="size-1 rounded-full bg-emerald-500/40"></div>
                </div>
                <div className="text-[6px] text-slate-500 font-mono tracking-widest uppercase opacity-80">
                   {systemId} // PROJECT_FILE
                </div>
                <div className="size-1 w-2 rounded-full bg-primary/20"></div>
             </div>

             <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 mt-6" style={{ backgroundImage: `url("${image}")` }} />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
             
             {/* Hover Flare */}
             <div className="absolute top-[-50%] left-[-50%] size-[200%] bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -rotate-12 translate-x-[-10%] group-hover:translate-x-[10%] pointer-events-none"></div>

             <a 
               href={link} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             >
               <div className="size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-primary hover:text-slate-950 text-white scale-75 group-hover:scale-100 shadow-2xl">
                 <span className="material-symbols-outlined text-xl">north_east</span>
               </div>
             </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-8 pt-5 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col shrink-0">
               <span className="text-[8px] font-black text-primary/60 uppercase tracking-[0.3em] font-mono leading-none mb-1">{systemId}</span>
               <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{category}</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5">
              <div className={`size-1 rounded-full ${type === 'Dynamic' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400 opacity-50'}`}></div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{type}</span>
            </div>
          </div>

          <div className="group/title relative inline-block">
            <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white font-display uppercase italic leading-tight tracking-tighter group-hover/title:text-primary transition-colors duration-300">
              {title}
            </h3>
            {/* Subtle Glitch Text Underlay on Hover */}
            <div className="absolute top-0 left-0 w-full opacity-0 group-hover/title:opacity-30 pointer-events-none transition-opacity duration-300">
               <span className="text-xl md:text-2xl font-black text-red-500 font-display uppercase italic tracking-tighter absolute top-0.5 left-0.5">{title}</span>
               <span className="text-xl md:text-2xl font-black text-blue-500 font-display uppercase italic tracking-tighter absolute -top-0.5 -left-0.5">{title}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-2">
            {desc}
          </p>

          <div className="mt-auto pt-4 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="px-2 py-1 text-[8px] font-black text-slate-400 dark:text-white/40 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 uppercase tracking-[0.1em] transition-all hover:text-primary hover:border-primary/20">
                  <span className="mr-1 text-primary/40">•</span> {tag}
                </span>
              ))}
            </div>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-slate-900 dark:bg-white/5 text-white/50 dark:text-white/40 text-[9px] font-black uppercase tracking-[0.4em] transition-all border border-slate-800 dark:border-white/10 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover/btn:bg-primary/5 transition-colors duration-500"></div>
              <span className="relative z-10">Launch Project Archive</span>
              <span className="material-symbols-outlined text-base relative z-10 group-hover/btn:rotate-45 transition-transform duration-500">arrow_outward</span>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover/btn:w-full transition-all duration-700"></div>
            </a>
          </div>
        </div>

        {/* Diagnostic Corner Accent */}
        <div className="absolute bottom-2 right-3 text-[6px] font-mono text-slate-400 dark:text-slate-600 opacity-20 group-hover:opacity-100 pointer-events-none tracking-tighter uppercase transition-opacity">
           PROTOCOL:STABLE // REV-0{systemId.slice(-1)}
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
      category: "Fintech Ecosystem",
      desc: "A high-performance forex trading platform featuring modular wallet systems, IB portals, PAM accounts, and enterprise-grade admin controls.",
      tags: ["React", "API Integration", "Fintech", "Enterprise"],
      link: "https://zyvest.com/",
      image: "/images/zyvest.webp",
      type: "Dynamic",
      specialFeature: "Developing complex frontend architectures and seamless 3rd party API integrations for trading ecosystems."
    },
    {
      title: "WFSK World",
      category: "Federation",
      desc: "Global Karate Federation hub with advanced administration and global connectivity.",
      tags: ["Supabase", "Cloudinary", "Admin"],
      link: "https://wfsk-world-federation-of-shotokan-k.vercel.app/",
      image: "/images/wfsk.webp",
      type: "Dynamic",
      specialFeature: "Admin panel controls 80% content, Supabase backend, Cloudinary CDN integrations."
    },
        {
      title: "Depro Trading",
      category: "Hardware",
      desc: "Industrial-grade hardware supplier catalog for B2B procurement and supply chain.",
      tags: ["Industrial", "Supply", "B2B"],
      link: "www.deprotrading.com",
      image: "/images/depro.webp",
      type: "Dynamic"
    },
    {
      title: "Suryakiran Physio",
      category: "Healthcare",
      desc: "A professional clinic website focusing on patient care and physical therapy services.",
      tags: ["Vite", "SEO", "Responsive"],
      link: "https://www.suryakiranphysio.com/",
      image: "/images/suryakiran.webp",
      type: "Static"
    },
    {
      title: "Dayoff Journeys",
      category: "Travel",
      desc: "Immersive travel agency platform showcasing global destinations and curated experiences.",
      tags: ["React", "Motion", "UX"],
      link: "http://www.dayoffjourneys.com/",
      image: "/images/dayofjourney.webp",
      type: "Static"
    },
    {
      title: "Form and Field",
      category: "Education",
      desc: "Modern educational portal providing learning resources and institutional information.",
      tags: ["Vite", "Academic", "Clean"],
      link: "https://www.formandfieldedu.in/",
      image: "/images/formandfield.webp",
      type: "Static"
    },
    {
      title: "Dive to AI",
      category: "AI Service",
      desc: "A futuristic platform dedicated to AI learning and advanced technical services.",
      tags: ["Next.js", "AI", "Futuretic"],
      link: "https://www.diveto.ai",
      image: "/images/DivetoAi.webp",
      type: "Static"
    },
    {
      title: "Sevana Medicals",
      category: "Pharmacy",
      desc: "Clean and efficient pharmacy catalog system for local medical supply management.",
      tags: ["React", "Healthcare", "B2B"],
      link: "https://new-sevana-medicals.vercel.app/",
      image: "/images/sevana.webp",
      type: "Static"
    },
    {
      title: "Chamayam",
      category: "Textiles",
      desc: "A vibrant catalog for a textile business, highlighting fabric quality and design heritage.",
      tags: ["Vite", "Fashion", "Catalog"],
      link: "https://chamayam-mtj6.vercel.app/",
      image: "/images/chamayam.webp",
      type: "Static"
    },
    {
      title: "Echo Hearing Aid",
      category: "Healthcare",
      desc: "Dedicated service center website for hearing aid consultation and professional care.",
      tags: ["React", "SEO", "Accessibility"],
      link: "https://www.echohearingaid.com/",
      image: "/images/echohearing.webp",
      type: "Static"
    },
    {
      title: "GNOM",
      category: "Security",
      desc: "Comprehensive service portal for electrical systems and modern security solutions.",
      tags: ["Services", "Electrical", "Security"],
      link: "https://depro-trading-s5zp.vercel.app/",
      image: "/images/gnom.webp",
      type: "Static"
    },
    {
      title: "Ammayi Thakkaram",
      category: "Restaurant",
      desc: "A vibrant food restaurant website showcasing traditional cuisine and dining experiences.",
      tags: ["React", "Culinary", "UX"],
      link: "https://ammayi-thakkaram.vercel.app/",
      image: "/images/ammayi.webp",
      type: "Static"
    },
    {
      title: "BS PAI",
      category: "Retail",
      desc: "Commercial platform for building material retail and wholesale services.",
      tags: ["Business", "Retail", "Supplies"],
      link: "https://bs-pai.vercel.app/",
      image: "/images/Bs_Pai.webp",
      type: "Static"
    },
    {
      title: "Crafi Innovations",
      category: "Creative Art",
      desc: "E-commerce and portfolio space for craft materials and creative art projects.",
      tags: ["Art", "E-commerce", "Creative"],
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

      // 3D Tilt Effect
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      });
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
