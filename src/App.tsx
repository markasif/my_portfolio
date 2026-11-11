import React, { useEffect, useRef } from 'react';
import { gsap } from './lib/gsap';
import { initLenis } from './lib/lenis';
import Navbar from './components/Navbar';
import ScrollytellingHero from './components/ScrollytellingHero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cursor from './components/Cursor';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    initLenis();

    if (!bgRef.current) return;

    let ticking = false;
    const blobs = bgRef.current.querySelectorAll('.bg-blob');

    const onMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const xPos = (e.clientX / window.innerWidth - 0.5) * 60;
          const yPos = (e.clientY / window.innerHeight - 0.5) * 60;

          gsap.to(blobs, {
            x: (index: number) => xPos * (index + 1) * 0.5,
            y: (index: number) => yPos * (index + 1) * 0.5,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: 'auto'
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark selection:bg-primary/30">
      <Cursor />
      <Navbar />
      
      {/* Global Background Decorations with Hardware Layer Promotion */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-blob absolute top-[-10%] right-[-10%] size-[600px] md:size-[800px] rounded-full bg-primary/10 blur-[100px] dark:opacity-40 animate-pulse-slow will-change-transform [transform:translate3d(0,0,0)]"></div>
        <div className="bg-blob absolute bottom-[20%] left-[-5%] size-[400px] md:size-[600px] rounded-full bg-indigo-vibrant/5 blur-[90px] dark:opacity-30 will-change-transform [transform:translate3d(0,0,0)]"></div>
        <div className="bg-blob absolute top-[40%] left-[10%] size-[300px] md:size-[500px] rounded-full bg-cyan-vibrant/5 blur-[70px] dark:opacity-20 will-change-transform [transform:translate3d(0,0,0)]"></div>
      </div>

      <main id="main-content" role="main" className="relative z-10">
        <ScrollytellingHero />

        <div className="relative z-20 bg-background-dark">
          <About />

          <section id="skills" aria-label="Technical Skills and Architecture">
            <TechStack />
          </section>

          <section id="projects" aria-label="Featured Production Projects">
            <Projects />
          </section>

          <Experience />

          <Contact />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
