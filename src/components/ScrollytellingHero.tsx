import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { GlitchText } from './GlitchText';

const TOTAL_FRAMES = 120;
const ORIGINAL_TOTAL_FRAMES = 240;


const ScrollytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  // 1. Preloading Assets (Optimized & Progressive)
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    // Prioritize loading the first frame for immediate display
    const loadFirstFrame = () => {
      const img = new Image();
      img.src = `/images/me/ezgif-frame-001.webp`;
      img.onload = () => {
        setIsLoaded(true); // Reveal UI as soon as the first frame is ready
        startBackgroundLoading();
      };
    };

    const startBackgroundLoading = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        // Map 120 frames to 240 original files (skipping every second frame)
        const originalFrameIndex = Math.min((i * 2) - 1, ORIGINAL_TOTAL_FRAMES).toString().padStart(3, '0');
        img.src = `/images/me/ezgif-frame-${originalFrameIndex}.webp`;
        
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
        };
        
        img.onerror = () => {
          console.error(`Failed to load frame ${originalFrameIndex}`);
          loadedCount++;
          setImagesLoaded(loadedCount);
        };

        preloadedImages.push(img);
      }
      imagesRef.current = preloadedImages;
    };

    loadFirstFrame();
  }, []);


  // 2. GSAP Scroll Trigger Mapping (Pinning Enabled)
  useLayoutEffect(() => {
    if (!isLoaded || !containerRef.current || !canvasRef.current) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const airbnb = { frame: 0 };
    
    const layout = { nw: 0, nh: 0, nx: 0, ny: 0 };
    
    const updateCanvas = () => {
      const img = imagesRef.current[Math.round(airbnb.frame)];
      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, layout.nx, layout.ny, layout.nw, layout.nh);
      
      setCurrentFrame(Math.round(airbnb.frame) + 1);
    };

    const handleResize = () => {
      if (!canvasRef.current || !imagesRef.current[0]) return;
      
      // CAP DEVICE PIXEL RATIO (Limit to 2.0 for performance boost on high-end mobile)
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Pre-calculate 'Cover' Logic for all frames (assuming same aspect ratio)
      const img = imagesRef.current[0];
      const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      layout.nw = img.naturalWidth * ratio;
      layout.nh = img.naturalHeight * ratio;
      layout.nx = (canvas.width - layout.nw) / 2;
      layout.ny = (canvas.height - layout.nh) / 2;

      updateCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=180%", // Segmented for three distinct 'swipes/scrolls'
        scrub: 1, // More responsive to user scroll for "normal flow" feel

        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: [0, 0.45, 1], // [Start/Coding, Coffee Phase, Heading Reveal]
          duration: { min: 0.8, max: 1.5 },
          delay: 0.1,
          ease: "power2.inOut"
        }
      }
    });

    tl.to(airbnb, {
      frame: TOTAL_FRAMES - 1,
      ease: "none", // Linear mapping for predictable scroll speed
      onUpdate: () => {
        updateCanvas();
      }
    });

    // No fade-out here to prevent blank background glitch.
    // The next section in App.tsx (z-20) will naturally overlap this section.


    updateCanvas();

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => {
        if (t.trigger === containerRef.current) t.kill();
      });
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
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-50"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        {/* HUD & Overlay Content */}
        <div className="relative h-full w-full flex flex-col items-center justify-center px-6 pointer-events-none">
          
          {/* Branding Content */}
          <div className={`flex flex-col items-center gap-6 text-center transition-all duration-1000 transform ${currentFrame >= 105 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>

             <div className="flex flex-col items-center gap-2">
               <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mb-4"></div>
               <GlitchText text="M. ASIF" sizeClass="text-[clamp(3rem,10vw,8rem)]" />
               <span className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-[#00F0FF] ml-[1em]">
                 Full Stack Developer
               </span>
             </div>

             <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pointer-events-auto">
                <a href="#projects" className="group relative flex min-w-[180px] items-center justify-center rounded-xl h-12 px-8 bg-[#00F0FF] text-[#050814] text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,240,255,0.3)]">
                  <span className="relative z-10">VIEW PROJECTS</span>
                </a>
                <a href="#contact" className="flex min-w-[180px] items-center justify-center rounded-xl h-12 px-8 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/5 active:scale-95 backdrop-blur-md">
                  CONTACT ME
                </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScrollytellingHero;
