import React, { useLayoutEffect, useRef } from 'react';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.from('.contact-header', {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from('.cta-card', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8")
      .from('.cta-buttons > *', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Magnetic Buttons logic for Contact
      const buttons = containerRef.current?.querySelectorAll('.magnetic-btn');
      buttons?.forEach((btn: any) => {
        btn.addEventListener('mousemove', (e: MouseEvent) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="w-full bg-transparent py-10 md:py-16 lg:py-24 px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 md:gap-14 lg:gap-16 relative z-10">
        
        {/* Standardized Header */}
        <div className="contact-header flex flex-col items-start gap-4 border-l-4 border-primary pl-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">PROJECT INQUIRY</span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
            Get In Touch
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Ready to collaborate on your next project? Feel free to reach out via email or connect with me on professional networks.
          </p>
        </div>

        {/* Enhanced CTA Card */}
        <div className="cta-card relative overflow-hidden rounded-[3rem] md:rounded-[4rem] border border-white/10 glass-card p-10 md:p-20 lg:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group/cta">
          {/* Internal Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 group-hover/cta:bg-primary/20 transition-colors duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-vibrant/5 rounded-full blur-[100px] -z-10 group-hover/cta:bg-indigo-vibrant/15 transition-colors duration-1000"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:w-3/5">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white font-display leading-[0.9] uppercase italic">
                 Let's Build <br className="hidden md:block"/><span className="text-gradient">Something Great.</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl font-light leading-relaxed max-w-xl">
                I'm currently available for new projects and interesting challenges. Let's talk about how I can help you.
              </p>
            </div>

            <div className="cta-buttons flex flex-col sm:flex-row lg:flex-col gap-6 w-full lg:w-auto min-w-0 sm:min-w-[400px]">
              <a className="magnetic-btn group relative flex items-center justify-center overflow-hidden rounded-2xl h-14 md:h-16 px-10 md:px-14 bg-primary text-slate-900 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,240,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,240,255,0.6)]" href="mailto:markasif@email.com">
                <span className="relative z-10">Send Me an Email</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>

              <a className="magnetic-btn flex items-center justify-center rounded-2xl h-14 md:h-16 px-10 md:px-14 border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95" href="https://www.linkedin.com/in/asifap/" target="_blank" rel="noopener noreferrer">
                 Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
