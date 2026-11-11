import React, { useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { 
  getSkillOriginIcon, 
  IconProps,
  RAGIcon,
  AgenticIcon,
  MCPIcon,
  LangChainIcon,
  FAISSIcon,
  LLMApiIcon,
  YOLOIcon,
  PromptDesignIcon,
  PythonIcon,
  NodejsIcon,
  MicroservicesIcon,
  MessageQueueIcon,
  WebSocketIcon,
  JWTIcon,
  PaymentGatewayIcon,
  ZodIcon,
  TypeScriptIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  ShadcnIcon,
  PerformanceIcon,
  ResponsiveIcon,
  ComponentIcon,
  PostgresIcon,
  MongoIcon,
  SupabaseIcon,
  SQLiteIcon,
  PlaywrightIcon,
  PytestIcon,
  JestIcon,
  DockerIcon,
  KubernetesIcon,
  VercelIcon,
  GitIcon,
  AgileIcon
} from './TechIcons';

interface TechItemProps {
  name: string;
  shortName?: string;
  tag?: string;
  iconComponent?: React.FC<IconProps>;
}

const TechItem: React.FC<TechItemProps> = ({ name, shortName, tag, iconComponent }) => {
  const Icon = iconComponent || getSkillOriginIcon(name);

  return (
    <div className="tech-item group relative flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3.5 md:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#00F0FF]/40 transition-all duration-300 min-h-[60px] sm:min-h-[76px] md:min-h-[80px] h-full backdrop-blur-sm">
      {/* Corner Ornaments */}
      <div className="absolute top-0 left-0 size-1 sm:size-1.5 border-t border-l border-primary/20 group-hover:border-primary/60 transition-colors"></div>
      <div className="absolute bottom-0 right-0 size-1 sm:size-1.5 border-b border-r border-primary/20 group-hover:border-primary/60 transition-colors"></div>
      
      <div className="flex items-center gap-2 sm:gap-3 relative z-10 min-w-0 flex-1">
        {/* Transparent Icon Container */}
        <div className="tech-icon-container flex size-7 sm:size-9 md:size-10 shrink-0 items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          <Icon className="size-full transition-transform duration-300" />
        </div>

        {/* Name and Tag */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-tight">
              {shortName ? (
                <>
                  <span className="sm:hidden">{shortName}</span>
                  <span className="hidden sm:inline">{name}</span>
                </>
              ) : (
                name
              )}
            </span>
            {tag && (
              <span className={`text-[7.5px] sm:text-[9px] font-mono px-1 sm:px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
                tag === 'ApexSkill' 
                  ? 'bg-primary/10 text-primary border-primary/30 font-bold' 
                  : tag === 'Custom Tools' || tag === 'Live'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10'
              }`}>
                {tag}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const grid = container.querySelector('.tech-items-grid');
    if (!grid) return;

    const items = grid.querySelectorAll('.tech-item');

    // Set initial hidden 3D tilt state so cards are hidden before user reaches Skills
    gsap.set(items, {
      y: 50,
      opacity: 0,
      scale: 0.86,
      rotateX: 20,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately: plays ONCE on reach, never replays on scroll back
          observer.unobserve(entry.target);

          // 3D Perspective Card Stagger Cascade
          gsap.to(items, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: {
              each: 0.035,
              from: 'start',
            },
            ease: 'back.out(1.3)',
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
    <div ref={containerRef} id="skills" className="relative flex h-auto w-full flex-col items-center justify-center py-8 md:py-10 lg:py-12 xl:py-14 px-6 md:px-8 bg-transparent overflow-hidden">
      {/* Structural Ornaments */}
      <div className="absolute top-0 right-0 size-32 border-t border-r border-primary/10 rounded-tr-3xl pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 left-0 size-32 border-b border-l border-primary/10 rounded-bl-3xl pointer-events-none opacity-40"></div>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30"></div>

      <div className="w-full max-w-7xl relative z-10 flex flex-col gap-6 md:gap-8">
        
        {/* Main Header Narrative */}
        <SectionHeader
          badge="TECHNICAL PROFICIENCY"
          title={<>Technical Skills &amp; <span className="text-primary">Architecture</span></>}
          description="Enterprise expertise across autonomous multi-agent systems, custom MCP tools, scalable backend architectures, and high-performance front ends."
        />

        {/* All Skills Unified Grid (2 columns on mobile, responsive multi-col on desktop) */}
        <div className="tech-items-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 [perspective:1000px]">
          {/* AI / Agentic & ML */}
          <TechItem iconComponent={RAGIcon} name="RAG & CAG Architecture" shortName="RAG & CAG" tag="Live" />
          <TechItem iconComponent={AgenticIcon} name="Agentic AI & Multi-Agent" shortName="Agentic AI" tag="ApexSkill" />
          <TechItem iconComponent={MCPIcon} name="MCP (Build & Integrate)" shortName="Custom MCP" tag="Custom Tools" />
          <TechItem iconComponent={LangChainIcon} name="LangChain Orchestration" shortName="LangChain" />
          <TechItem iconComponent={FAISSIcon} name="FAISS & Vector Embeddings" shortName="FAISS & Vector" />
          <TechItem iconComponent={LLMApiIcon} name="LLM APIs (Groq, OpenAI, Gemini)" shortName="LLM APIs" />
          <TechItem iconComponent={YOLOIcon} name="YOLO / Computer Vision" shortName="YOLO Vision" tag="NeoHireX" />
          <TechItem iconComponent={PromptDesignIcon} name="Prompt & Skill Design" shortName="Prompt Design" />

          {/* Backend & Distributed Services */}
          <TechItem iconComponent={PythonIcon} name="Python & FastAPI" shortName="Python & FastAPI" />
          <TechItem iconComponent={NodejsIcon} name="Node.js & Express.js" shortName="Node & Express" />
          <TechItem iconComponent={MicroservicesIcon} name="REST APIs & Microservices" shortName="REST & Services" />
          <TechItem iconComponent={MessageQueueIcon} name="Message Queues & Streams" shortName="Message Queues" />
          <TechItem iconComponent={WebSocketIcon} name="WebSocket (Real-Time)" shortName="WebSocket" tag="Forex CRM" />
          <TechItem iconComponent={JWTIcon} name="JWT / OAuth & RBAC" shortName="JWT & RBAC" />
          <TechItem iconComponent={PaymentGatewayIcon} name="Payment Gateways" shortName="Payments" tag="Saudi VAT" />
          <TechItem iconComponent={ZodIcon} name="Zod Schema Validation" shortName="Zod Validation" />

          {/* Frontend & UI Engineering */}
          <TechItem iconComponent={TypeScriptIcon} name="TypeScript" />
          <TechItem iconComponent={ReactIcon} name="React.js" />
          <TechItem iconComponent={NextjsIcon} name="Next.js (App Router)" shortName="Next.js" />
          <TechItem iconComponent={TailwindIcon} name="Tailwind CSS" />
          <TechItem iconComponent={ShadcnIcon} name="shadcn/ui & Tokens" shortName="shadcn/ui" />
          <TechItem iconComponent={PerformanceIcon} name="Performance Optimization" shortName="Performance" tag="90+ CWV" />
          <TechItem iconComponent={ResponsiveIcon} name="Responsive Systems" shortName="Responsive" />
          <TechItem iconComponent={ComponentIcon} name="Component Architecture" shortName="Architecture" />

          {/* Databases & Storage */}
          <TechItem iconComponent={PostgresIcon} name="PostgreSQL" />
          <TechItem iconComponent={MongoIcon} name="MongoDB" />
          <TechItem iconComponent={SupabaseIcon} name="Supabase (Row-Level Security)" shortName="Supabase (RLS)" tag="RLS" />
          <TechItem iconComponent={SQLiteIcon} name="SQL & SQLite (Cache Layer)" shortName="SQLite Cache" />

          {/* DevOps, Testing & CI/CD */}
          <TechItem iconComponent={PlaywrightIcon} name="Playwright E2E Testing" shortName="Playwright E2E" tag="Automated" />
          <TechItem iconComponent={PytestIcon} name="Pytest API Testing" shortName="Pytest API" tag="Automated" />
          <TechItem iconComponent={JestIcon} name="Jest Unit Testing" shortName="Jest Testing" tag="60% Core" />
          <TechItem iconComponent={DockerIcon} name="Docker & Containers" shortName="Docker" />
          <TechItem iconComponent={KubernetesIcon} name="Kubernetes Orchestration" shortName="Kubernetes" />
          <TechItem iconComponent={VercelIcon} name="Vercel CI/CD Pipelines" shortName="Vercel CI/CD" />
          <TechItem iconComponent={GitIcon} name="Git & GitHub Versioning" shortName="Git & GitHub" />
          <TechItem iconComponent={AgileIcon} name="Agile / Scrum Delivery" shortName="Agile / Scrum" />
        </div>

      </div>
    </div>
  );
};

export default TechStack;
