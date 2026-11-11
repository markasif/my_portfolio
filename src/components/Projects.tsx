import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import SectionHeader from './SectionHeader';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  link: string;
  image?: string;
  type: 'Dynamic' | 'Static' | 'AI / Agentic';
  featured?: boolean;
  metrics?: string;
  github?: string;
}

const ProjectCard: React.FC<Project> = ({
  title,
  category,
  desc,
  link,
  image,
  type
}) => {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`View project details for ${title}`}
      onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      }}
      className="project-card group relative flex flex-col sm:flex-row bg-transparent rounded-2xl md:rounded-3xl overflow-hidden hover:bg-white/[0.02] transition-all duration-500 backdrop-blur-sm hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] cursor-pointer min-h-[220px] md:min-h-[240px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Left Half: Text Content */}
      <div className="w-full sm:w-1/2 flex flex-col justify-between p-4 md:p-6 gap-2 md:gap-3 z-10">
        <div className="flex flex-col gap-2">
          {/* Heading Area - Full width space used by heading */}
          <div className="flex flex-col gap-0.5 w-full pb-1">
            <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>
            <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-primary/80 truncate">
              {category}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs md:text-[13px] text-slate-300 font-normal leading-relaxed line-clamp-3">
            {desc}
          </p>
        </div>

        {/* Action Link: Secondary Button Look + Transparent Tag on bottom line */}
        <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
          <Button
            variant="secondary"
            size="sm"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e?: React.MouseEvent) => e?.stopPropagation()}
            className="w-fit shadow-md"
          >
            {link.includes('github') ? 'View Source' : 'Live Demo'}
          </Button>

          {/* Transparent tag on bottom line with shorter text */}
          <span className="text-[9px] md:text-[10px] font-mono font-semibold uppercase tracking-widest text-primary/70 bg-transparent shrink-0">
            <span className="sm:hidden">{type === 'AI / Agentic' ? 'Agentic' : type}</span>
            <span className="hidden sm:inline">{type}</span>
          </span>
        </div>
      </div>

      {/* Right Half: Seamless background, no vertical dividing line, image aligned towards the left */}
      <div className="w-full sm:w-1/2 relative flex items-center justify-start p-3 sm:p-4 min-h-[200px] overflow-hidden bg-transparent">
        {image ? (
          <img
            src={image}
            alt={title}
            width="600"
            height="340"
            decoding="async"
            className="w-full h-full max-h-[220px] object-contain object-left transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 w-full">
            <svg className="size-8 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
            <span className="text-[10px] font-mono text-primary/80 uppercase tracking-widest mt-2">{category}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const allProjects: Project[] = [
    // --- 1. Featured CV Projects ---
    {
      title: "AskRaggy AI — Knowledge & HR Assistant",
      category: "Enterprise RAG & Agentic AI",
      desc: "Chat, document Q&A and agent modes with multi-step planning and HR workflows (leave, expenses, directory); streamed responses cut chat response time from 8–10s to 2–3s, with a SQLite backup layer for Supabase for faster data access.",
      tags: ["Python", "RAG", "CAG", "Vector Search", "Groq API", "Streaming", "SQLite", "Supabase"],
      link: "https://ai-engineering-learning-asea.onrender.com/",
      image: "/images/askraggy.webp",
      type: "AI / Agentic",
      featured: true,
      metrics: "Live Demo · Latency 8–10s → 2–3s",
      github: "https://github.com/markasif/ai-engineering-learning"
    },
    {
      title: "NeoHireX — Cognitive AI Hiring OS",
      category: "AI Recruitment & Computer Vision",
      desc: "Cognitive AI Hiring OS combining AI interviews, recruiter intelligence, job-creation-to-approval workflows, and YOLO-based computer-vision monitoring in the AI interview module. Test automation owned with Playwright and pytest.",
      tags: ["YOLO Vision", "Playwright E2E", "Pytest", "Python", "AI Interviews", "FastAPI"],
      link: "https://neointelli.com/",
      image: "/images/neohirex.webp",
      type: "AI / Agentic",
      featured: true,
      metrics: "Automated regression 1.5 hrs → 10 min",
      github: "https://github.com/markasif"
    },
    {
      title: "Neointelli — Enterprise Web Platform",
      category: "Enterprise Redesign & Architecture",
      desc: "Redesigned and deployed the Neointelli company web platform from scratch with a modern component-based frontend architecture, high-fidelity responsive design, and optimized Core Web Vitals.",
      tags: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Component Architecture", "CWV"],
      link: "https://neointelli.com/",
      image: "/images/neointelli.webp",
      type: "Dynamic",
      featured: true,
      metrics: "Complete Redesign From Scratch",
      github: "https://github.com/markasif"
    },
    {
      title: "Forex Trading CRM & Dashboard",
      category: "Fintech & Real-Time CRM",
      desc: "Real-time RBAC trading dashboards with live WebSocket sync and Jest/Zod-hardened APIs (0% → 60% core coverage). Mobile LCP 4.1s → 3.1s with zero role-access bugs post-launch via JWT-validated RBAC middleware.",
      tags: ["Node.js", "Express.js", "Next.js", "WebSocket", "MongoDB", "PostgreSQL", "TypeScript"],
      link: "https://zyvest.com/",
      image: "/images/zyvest.webp",
      type: "Dynamic",
      featured: true,
      metrics: "LCP 4.1s → 3.1s · Live WebSocket",
      github: "https://github.com/markasif"
    },
    {
      title: "Goodwell Coffee — E-Commerce Platform",
      category: "E-Commerce & Payment Gateways",
      desc: "Live Saudi e-commerce platform with online payment integration, Saudi VAT-compliant calculation and automated invoicing, used in daily commercial operations.",
      tags: ["Next.js", "E-Commerce", "Saudi VAT", "Payment Gateways", "Invoicing"],
      link: "https://goodwellcoffee.com/",
      image: "/images/goodwell.webp",
      type: "Dynamic",
      featured: true,
      metrics: "Live Saudi Platform · VAT Compliant",
      github: "https://github.com/markasif"
    },
    {
      title: "Depro Trading & WFSK Federation",
      category: "Enterprise CMS & SaaS",
      desc: "Admin-managed CMS/SaaS sites: zero developer intervention post-launch, 90+ mobile PageSpeed, and typed components that cut new-feature build time by ~40% with Supabase Row-Level Security.",
      tags: ["Next.js", "Tailwind CSS", "Supabase (RLS)", "Cloudinary", "TypeScript"],
      link: "https://wfsk-world-federation-of-shotokan-k.vercel.app/",
      image: "/images/depro.webp",
      type: "Dynamic",
      featured: true,
      metrics: "90+ PageSpeed · 0 dev intervention",
      github: "https://github.com/markasif"
    },
    {
      title: "WFSK Karate World Federation",
      category: "Global Federation Hub",
      desc: "Global Karate Federation hub with custom administration and integrated Supabase real-time data sync with granular role-level security.",
      tags: ["Next.js", "Supabase", "Cloudinary", "TypeScript"],
      link: "https://wfsk-world-federation-of-shotokan-k.vercel.app/",
      image: "/images/wfsk.webp",
      type: "Dynamic"
    },
    // --- 2. Additional Production Client Projects ---
    {
      title: "Dive to AI",
      category: "AI Research & Learning",
      desc: "Next.js-powered educational frontier dedicated to AI/ML research and futuristic technical service delivery.",
      tags: ["Next.js", "AI", "ML", "Education"],
      link: "https://www.diveto.ai",
      image: "/images/DivetoAi.webp",
      type: "Static"
    },
    {
      title: "Suryakiran Physio",
      category: "Healthcare Portal",
      desc: "Specialized physiotherapy clinic portal with patient appointment systems and search-optimized service catalogs.",
      tags: ["React", "SEO", "Healthcare"],
      link: "https://www.suryakiranphysio.com/",
      image: "/images/suryakiran.webp",
      type: "Static"
    },
    {
      title: "Dayoff Journeys",
      category: "Travel Tech",
      desc: "Immersive travel-tech platform with high-fidelity motion transitions for global curated destination storytelling.",
      tags: ["Motion", "UX", "Travel"],
      link: "http://www.dayoffjourneys.com/",
      image: "/images/dayofjourney.webp",
      type: "Static"
    },
    {
      title: "Form and Field",
      category: "Education Portal",
      desc: "Modern institutional portal for academic resource management and efficient faculty-student collaboration.",
      tags: ["Vite", "Academic", "Portal"],
      link: "https://www.formandfieldedu.in/",
      image: "/images/formandfield.webp",
      type: "Static"
    },
    {
      title: "Sevana Medicals",
      category: "Pharmaceutical B2B",
      desc: "Efficient pharmaceutical B2B catalog system for medical professionals to manage localized pharmaceutical inventory.",
      tags: ["React", "Inventory", "B2B"],
      link: "https://new-sevana-medicals.vercel.app/",
      image: "/images/sevana.webp",
      type: "Static"
    },
    {
      title: "Chamayam",
      category: "Fashion & Heritage",
      desc: "Digital heritage textile catalog featuring high-resolution craftsmanship galleries and categorize fabric collections.",
      tags: ["Fashion", "Vite", "Catalog"],
      link: "https://chamayam-mtj6.vercel.app/",
      image: "/images/chamayam.webp",
      type: "Static"
    },
    {
      title: "Echo Hearing",
      category: "Healthcare Services",
      desc: "Professional consultation portal for hearing aid services with specialized SEO and accessibility features.",
      tags: ["SEO", "Accessibility", "Health"],
      link: "https://www.echohearingaid.com/",
      image: "/images/echohearing.webp",
      type: "Static"
    },
    {
      title: "GNOM",
      category: "Security & Electrical",
      desc: "Integrated technical portal for advanced electrical systems and professional-tier industrial security solutions.",
      tags: ["Security", "Electrical", "System"],
      link: "https://depro-trading-s5zp.vercel.app/",
      image: "/images/gnom.webp",
      type: "Static"
    },
    {
      title: "Ammayi Thakkaram",
      category: "Culinary & Dining",
      desc: "Traditional restaurant platform featuring immersive menu storytelling and digital dining experiences.",
      tags: ["React", "Food-Tech", "UX"],
      link: "https://ammayi-thakkaram.vercel.app/",
      image: "/images/ammayi.webp",
      type: "Static"
    },
    {
      title: "BS PAI",
      category: "Industrial Wholesale",
      desc: "Robust commercial marketplace for professional-tier retail and wholesale building construction materials.",
      tags: ["Business", "Retail", "Supplies"],
      link: "https://bs-pai.vercel.app/",
      image: "/images/Bs_Pai.webp",
      type: "Static"
    },
    {
      title: "Crafi Innovations",
      category: "Artisanal E-Commerce",
      desc: "Artisanal e-commerce environment merging artist portfolios with functional marketplace for creative art craft.",
      tags: ["Creative", "E-commerce", "Store"],
      link: "https://crafi-innovations.vercel.app/",
      image: "/images/Crafi.webp",
      type: "Static"
    }
  ];

  const filteredProjects = allProjects;

  const [visibleCount, setVisibleCount] = useState(6);
  const prevCountRef = useRef(6);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    prevCountRef.current = visibleCount;
    setVisibleCount(filteredProjects.length);
  };

  // Dropdown slide-in animation for newly loaded cards
  useEffect(() => {
    if (visibleCount > prevCountRef.current) {
      const cards = document.querySelectorAll('.projects-grid .project-card');
      const newlyRevealed = Array.from(cards).slice(prevCountRef.current);

      if (newlyRevealed.length > 0) {
        gsap.fromTo(newlyRevealed,
          { y: -35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          }
        );
      }
    }
  }, [visibleCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const grid = container.querySelector('.projects-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');

    // Set initial hidden state so cards are hidden before user reaches Projects
    gsap.set(cards, {
      y: 50,
      opacity: 0,
      scale: 0.95,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately: plays ONCE on reach, never replays on scroll back
          observer.unobserve(entry.target);

          gsap.to(cards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="projects" ref={containerRef} className="relative flex h-auto w-full flex-col bg-transparent py-8 md:py-10 lg:py-12 xl:py-14 px-6 md:px-8 overflow-hidden">

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 lg:gap-10 relative z-10">

        {/* Section Header */}
        <SectionHeader
          className="projects-header"
          badge="PORTFOLIO & PRODUCTION WORK"
          title={<>Featured <span className="text-primary">Projects</span></>}
          description="Showcasing enterprise RAG assistants, agentic SDLC platforms, real-time trading CRMs, and 10+ production applications."
        />

        {/* Projects Grid - 2 columns for horizontal cards */}
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.slice(0, visibleCount).map((p, idx) => (
            <ProjectCard key={idx} {...p} />
          ))}
        </div>

        {/* Load More Button - Standardized Global Pill (slightly reduced on mobile) */}
        {hasMore && (
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleLoadMore}
              arrowDirection="down"
              className="min-w-[195px] sm:min-w-[240px]"
            >
              View All Projects ({filteredProjects.length})
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
