import Button from './Button';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { GlitchText } from './GlitchText';
import { gsap, ScrollTrigger } from '../lib/gsap';

const TOTAL_FRAMES = 240;

const ScrollytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Progressive Frame Preloading: Rapid First-Paint & Smooth Background Streaming
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let isCancelled = false;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (isCancelled) return resolve();
        const img = new Image();
        img.decoding = 'async';
        const frameNum = (index + 1).toString().padStart(3, '0');
        img.src = `/images/me/ezgif-frame-${frameNum}.webp`;

        img.onload = () => {
          preloadedImages[index] = img;
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount >= 12) {
            setIsLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount >= 12) {
            setIsLoaded(true);
          }
          resolve();
        };
      });
    };

    // Stage 1: Load initial 20 frames immediately for instant interactive readiness
    const initialPromises: Promise<void>[] = [];
    for (let i = 0; i < Math.min(20, TOTAL_FRAMES); i++) {
      initialPromises.push(loadFrame(i));
    }

    Promise.all(initialPromises).then(() => {
      if (isCancelled) return;
      setIsLoaded(true);

      // Stage 2: Stream remaining frames in progressive background batches
      let nextBatchStart = 20;
      const batchSize = 16;

      const loadNextBatch = () => {
        if (isCancelled || nextBatchStart >= TOTAL_FRAMES) return;
        const batchPromises: Promise<void>[] = [];
        const limit = Math.min(nextBatchStart + batchSize, TOTAL_FRAMES);

        for (let i = nextBatchStart; i < limit; i++) {
          batchPromises.push(loadFrame(i));
        }
        nextBatchStart = limit;

        Promise.all(batchPromises).then(() => {
          if (!isCancelled && nextBatchStart < TOTAL_FRAMES) {
            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(loadNextBatch);
            } else {
              setTimeout(loadNextBatch, 25);
            }
          }
        });
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 40);
      }
    });

    imagesRef.current = preloadedImages;

    // Safety fallback so user is never stuck
    const safetyTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // 2. GSAP Scroll Trigger Mapping: Frame-by-Frame Animation + Dedicated Glitch Heading Hold
  useLayoutEffect(() => {
    if (!isLoaded || !containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const airbnb = { frame: 0 };
    const layout = { nw: 0, nh: 0, nx: 0, ny: 0 };

    const updateCanvas = (targetFrame: number) => {
      const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(targetFrame)));
      let img = imagesRef.current[frameIdx];

      // Nearest-Frame Fallback
      if (!img) {
        for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
          if (frameIdx - delta >= 0 && imagesRef.current[frameIdx - delta]) {
            img = imagesRef.current[frameIdx - delta];
            break;
          }
          if (frameIdx + delta < TOTAL_FRAMES && imagesRef.current[frameIdx + delta]) {
            img = imagesRef.current[frameIdx + delta];
            break;
          }
        }
      }

      if (!img) return;

      // Always guarantee valid layout dimensions
      if (layout.nw === 0 || layout.nh === 0) {
        const naturalW = img.naturalWidth || 1920;
        const naturalH = img.naturalHeight || 1080;
        const ratio = Math.max(canvas.width / naturalW, canvas.height / naturalH);
        layout.nw = naturalW * ratio;
        layout.nh = naturalH * ratio;
        layout.nx = (canvas.width - layout.nw) / 2;
        layout.ny = (canvas.height - layout.nh) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, layout.nx, layout.ny, layout.nw, layout.nh);
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const img = imagesRef.current[0];
      if (img && img.naturalWidth && img.naturalHeight) {
        const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        layout.nw = img.naturalWidth * ratio;
        layout.nh = img.naturalHeight * ratio;
        layout.nx = (canvas.width - layout.nw) / 2;
        layout.ny = (canvas.height - layout.nh) / 2;
      }

      updateCanvas(airbnb.frame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Snappy, responsive scroll distance
        scrub: 0.5, // Crisp 1:1 scrub response without sluggish lag
        pin: true,
        anticipatePin: 1,
      }
    });

    // Phase 1: Scrub all 240 frames sequentially from 0 to 239 (duration: 1.0)
    tl.to(airbnb, {
      frame: TOTAL_FRAMES - 1,
      duration: 1.0,
      ease: "none",
      onUpdate: () => {
        updateCanvas(airbnb.frame);
      }
    }, 0);

    // Phase 2: Fade in & scale the Glitch Heading and buttons as the animation reaches the end (starts at 0.75s, finishes at 1.0s)
    tl.fromTo('.hero-branding-content',
      { opacity: 0, y: 35, scale: 0.95, pointerEvents: 'none' },
      { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.25, ease: "power2.out" },
      0.75
    );

    // Phase 3: Instant handoff - in just ONE scroll it smoothly transitions down to About
    tl.to({}, { duration: 0.05 });

    updateCanvas(0);

    // Refresh ScrollTrigger so all downstream section triggers know exact post-pin offsets
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(refreshTimer);
      tl.kill();
      ScrollTrigger.getAll().forEach((t: any) => {
        if (t.trigger === containerRef.current) t.kill();
      });
      ScrollTrigger.refresh();
    };
  }, [isLoaded]);



  const progress = (imagesLoaded / TOTAL_FRAMES) * 100;

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#050814]">
      {/* Loading State Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050814] gap-8">
           <div className="relative flex items-center justify-center">
              {/* Outer Rotating Tech Ring */}
              <div className="absolute size-48 border-2 border-dashed border-[#00F0FF]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute size-40 border border-[#00F0FF]/10 rounded-full"></div>
              
              {/* Main SVG Spinner */}
              <svg className="size-32 -rotate-90 transform" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#00F0FF]/10"
                />
                {/* Progress Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-[#00F0FF] transition-all duration-500 ease-out"
                  style={{
                    strokeDasharray: '283',
                    strokeDashoffset: 283 - (283 * progress) / 100,
                    filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))'
                  }}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-[#00F0FF] tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
           </div>
        </div>
      )}

      {/* Hero Scene Container (GSAP handles pinning now) */}
      <div className="relative h-screen w-full overflow-hidden">

        {/* Canvas Background Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Static High-Priority LCP Anchor */}
          <img
            src="/images/me/ezgif-frame-001.webp"
            alt="Mohammed Asif - AI Engineer"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
          <canvas 
            ref={canvasRef}
            className="relative w-full h-full object-cover z-10"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-50 z-20"></div>
          <div 
            className="absolute inset-0 opacity-10 z-20"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        {/* HUD & Overlay Content */}
        <div className="relative h-full w-full flex flex-col items-center justify-center px-4 md:px-6 pointer-events-none z-30">
          
          {/* Branding Content */}
          <div className="hero-branding-content flex flex-col items-center gap-4 md:gap-6 text-center max-w-4xl mx-auto opacity-0 translate-y-8 pointer-events-auto">

             <div className="flex flex-col items-center gap-3">
               <GlitchText text="M. ASIF" sizeClass="text-[clamp(2.8rem,9vw,7.5rem)]" />
               
               {/* Role Badges */}
               <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                 <span className="text-[12px] md:text-sm font-black uppercase tracking-[0.35em] md:tracking-[0.5em] text-[#00F0FF]">
                   AI Engineer
                 </span>
                 <span className="text-white/30 hidden sm:inline">•</span>
                 <span className="text-[12px] md:text-sm font-black uppercase tracking-[0.35em] md:tracking-[0.5em] text-white">
                   Full Stack Developer
                 </span>
               </div>
             </div>

             <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 mt-6 pointer-events-auto">
                {/* Explore Projects Button (slightly reduced on mobile) */}
                <Button variant="primary" href="#projects" className="min-w-[155px] sm:min-w-[200px]">
                  Explore Projects
                </Button>

                {/* Mobile Contact Icon Button placed after Explore Projects */}
                <a
                  href="#contact"
                  aria-label="Contact Me"
                  className="sm:hidden size-10 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#A855F7] border border-violet-300/40 text-black flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.55)] hover:scale-105 active:scale-95 transition-all"
                >
                  <svg className="size-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

                {/* Desktop Contact Me Button (hidden on mobile) */}
                <Button variant="secondary" href="#contact" className="hidden sm:inline-flex min-w-[180px]">
                  Contact Me
                </Button>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScrollytellingHero;
