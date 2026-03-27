import React, { useLayoutEffect, useRef } from 'react';

// Declaration for GSAP global
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

import { GlitchText } from './GlitchText';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-tagline",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      )
        .fromTo(titleRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5 },
          "-=0.6"
        )
        .fromTo(descriptionRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1.0"
        )
        .fromTo(buttonsRef.current?.children,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
          "-=0.8"
        )
        .fromTo(imageRef.current,
          { x: 50, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1.5 },
          "-=1.5"
        );

      // Immersive Background Aura
      gsap.to(decorationRef.current, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scroll Parallax
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 50,
        opacity: 0,
        ease: "none"
      });

      // Magnetic Buttons logic
      const buttons = buttonsRef.current?.querySelectorAll('a');
      buttons?.forEach((btn: HTMLElement) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.4,
            ease: "power3.out"
          });
          
          const innerSpan = btn.querySelector('span');
          if (innerSpan) {
            gsap.to(innerSpan, {
              x: x * 0.2,
              y: y * 0.2,
              duration: 0.4,
              ease: "power3.out"
            });
          }
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to([btn, btn.querySelector('span')], {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative flex h-auto sm:min-h-screen md:min-h-[100dvh] w-full flex-col bg-transparent group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col relative z-20">

        <main className="flex flex-1 items-start md:items-center justify-center pt-24 pb-12 md:pt-24 md:pb-16 md:px-8 lg:pt-20 lg:pb-16 lg:px-12 xl:px-0 relative z-10">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8 animate-float" style={{ animationDuration: '8s' }}>

            <div className="flex flex-col gap-4 items-center">
              {/* User Portrait with Futuristic Styling */}
              <div 
                ref={imageRef}
                className="relative group/image mb-2 md:mb-4"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-indigo-vibrant to-cyan-vibrant rounded-full blur-xl opacity-20 group-hover/image:opacity-60 transition duration-1000"></div>
                <div className="relative size-24 md:size-36 lg:size-40 rounded-full border-2 border-primary/20 p-1 bg-background-dark/20 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] group-hover/image:shadow-[0_0_80px_rgba(0,240,255,0.3)] transition-all duration-700">
                  <img 
                    src="/images/my_Photo.webp" 
                    alt="M. Asif" 
                    className="size-full object-cover object-top rounded-full transition-all duration-1000 scale-110 group-hover/image:scale-100 filter group-hover/image:contrast-110"
                  />
                </div>
                {/* Decorative border rings */}
                <div className="absolute -inset-3 md:-inset-4 border border-primary/10 rounded-full animate-spin-slow pointer-events-none"></div>
                <div className="absolute -inset-6 md:-inset-8 border border-primary/5 rounded-full animate-reverse-spin-slow pointer-events-none opacity-50"></div>
                
                {/* Floating Status Badge */}
                <div className="absolute -bottom-1 -right-1 bg-background-light dark:bg-background-dark border border-primary/20 rounded-xl px-2 py-1 flex items-center gap-1.5 shadow-xl animate-bounce-slow">
                   <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Active</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-6 md:w-8 bg-gradient-to-r from-transparent to-primary"></div>
                  <span className="hero-tagline text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-primary block">
                    Digital Architect
                  </span>
                  <div className="h-[1px] w-6 md:w-8 bg-gradient-to-l from-transparent to-primary"></div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2 items-center">
                  <h1 ref={titleRef} className="mt-1 md:mt-2 text-center leading-[0.9]">
                    <GlitchText text="M. Asif" sizeClass="text-[clamp(3.5rem,15vw,9rem)]" />
                  </h1>
                   <p ref={descriptionRef} className="max-w-xs sm:max-w-xl md:max-w-2xl text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed tracking-tight px-4 sm:px-0">
                    I craft <span className="text-slate-950 dark:text-white font-semibold">high-fidelity</span> digital experiences using <span className="text-primary italic font-medium">AI-driven precision</span> and modern industrial stacks.
                  </p>
                </div>
              </div>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto px-6 sm:px-0">
              <a href="#projects" className="group relative flex w-full sm:w-auto max-w-[320px] sm:min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 md:h-16 px-8 md:px-10 bg-primary text-slate-900 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,240,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,240,255,0.6)]">
                <span className="relative z-10">View My Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
              <a href="#contact" className="flex w-full sm:w-auto max-w-[320px] sm:min-w-[240px] cursor-pointer items-center justify-center rounded-2xl h-14 md:h-16 px-8 md:px-10 border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95">
                Contact Me
              </a>
            </div>

            <div className="mt-4 md:mt-6 flex items-center gap-8 justify-center">
                <div className="flex items-center gap-4 text-slate-400 scale-110">
                  <a className="hover:text-primary transition-all hover:-translate-y-1.5" href="https://github.com/markasif" target="_blank" rel="noopener noreferrer">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path></svg>
                  </a>
                  <a className="hover:text-primary transition-all hover:-translate-y-1.5" href="https://www.linkedin.com/in/asifap/" target="_blank" rel="noopener noreferrer">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
