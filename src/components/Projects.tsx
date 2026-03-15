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
  return (
    <div className="project-card group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:border-primary/30 hover:-translate-y-2 glass-card">
      {/* Preview Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

        <div className="absolute top-6 left-6 z-10">
          <span className="text-[9px] font-black text-white uppercase tracking-[0.3em] bg-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {type}
          </span>
        </div>

        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 cursor-pointer"
        >
          <div className="size-16 rounded-full bg-white text-slate-900 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">north_east</span>
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8 gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{category}</span>
          <div className="flex items-center gap-2">
            <div className={`size-1.5 rounded-full ${type === 'Dynamic' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400 opacity-50'}`}></div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{type}</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-950 dark:text-white font-display uppercase italic leading-tight tracking-tighter group-hover:text-gradient transition-all duration-500">
          {title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-2">
          {desc}
        </p>

        {specialFeature && (
          <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 size-12 bg-primary/10 blur-xl"></div>
            <p className="text-[10px] font-bold text-primary leading-relaxed relative z-10">
              <span className="uppercase mr-2 font-black opacity-60 tracking-widest">Key Feature:</span> {specialFeature}
            </p>
          </div>
        )}

        <div className="mt-auto pt-6 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-3 py-1 text-[9px] font-black text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 rounded-lg uppercase tracking-widest border border-transparent group-hover:border-primary/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary dark:hover:bg-primary dark:hover:text-white glow-on-hover"
          >
            Explore Project
            <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">north_east</span>
          </a>
        </div>
      </div>

      {/* Background Glow on Hover */}
      <div className="absolute -bottom-20 -right-20 size-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 shadow-inner"></div>
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
      link: "https://depro-trading.vercel.app/",
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
      link: "https://echo-hearing-aid-centre.vercel.app/",
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
    }
  ];

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
          <div className="flex flex-wrap items-center gap-4 md:gap-6 px-6 md:px-8 py-3 md:py-4 rounded-full glass border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2"><div className="size-2 rounded-full bg-slate-400 opacity-50"></div> Static Build</span>
            <span className="flex items-center gap-2"><div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div> Full-Stack App</span>
            <span className="flex items-center gap-2"><div className="size-2 rounded-full bg-primary"></div> Live Deployment</span>
          </div>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {projects.map((p, idx) => (
            <ProjectCard key={idx} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
