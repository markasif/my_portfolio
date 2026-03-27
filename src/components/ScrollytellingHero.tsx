import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { GlitchText } from './GlitchText';

const TOTAL_FRAMES = 240;

const ScrollytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  // 1. Preloading Assets
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/images/me/ezgif-frame-${frameNum}.webp`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNum}`);
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
      };

      preloadedImages.push(img);
    }
    
    imagesRef.current = preloadedImages;
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
    
    const updateCanvas = () => {
      const img = imagesRef.current[Math.round(airbnb.frame)];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      
      // Full Screen Coverage (Cover Logic)
      const ratio = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
      
      const nw = imageWidth * ratio;
      const nh = imageHeight * ratio;
      const nx = (canvasWidth - nw) / 2;
      const ny = (canvasHeight - nh) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, nx, ny, nw, nh);
      
      setCurrentFrame(Math.round(airbnb.frame) + 1);
    };

    // Main Scrollytelling Animation with Pinning (Optimized for Gapless Transition)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 3 viewports worth of scroll distance
        scrub: 1.5, // High scrub for the "Physics" feel
        pin: true,  // LOCK THE SCREEN
        anticipatePin: 1,
      }
    });

    tl.to(airbnb, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "power2.inOut", // Physics feel
      onUpdate: updateCanvas
    });

    updateCanvas();

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [isLoaded]);

  // 3. Responsive Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progress = (imagesLoaded / TOTAL_FRAMES) * 100;

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#050814]">
      {/* Loading State Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050814] gap-4">
           <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00F0FF]">INITIALIZING_NEURAL_LINK</span>
              <div className="w-64 h-1 border border-[#00F0FF]/20 rounded-full overflow-hidden relative">
                 <div 
                   className="absolute inset-y-0 left-0 bg-[#00F0FF] transition-all duration-300"
                   style={{ width: `${progress}%` }}
                 />
              </div>
              <span className="text-[10px] font-mono text-[#00F0FF]/60">{imagesLoaded} / {TOTAL_FRAMES} SYNCED</span>
           </div>
        </div>
      )}

      {/* Sticky Hero Scene (Locks to Viewport) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
          <div className={`flex flex-col items-center gap-6 text-center transition-all duration-1000 transform ${currentFrame > 230 ? 'opacity-100 scale-100 y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
             <div className="flex flex-col items-center gap-2">
               <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mb-4"></div>
               <GlitchText text="M. ASIF" sizeClass="text-[clamp(3rem,10vw,8rem)]" />
               <span className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-[#00F0FF] ml-[1em]">
                 Digital Architect
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
