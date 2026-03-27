import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ScrollytellingHero from './components/ScrollytellingHero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Cursor from './components/Cursor';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !bgRef.current) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 60;

      gsap.to(bgRef.current?.querySelectorAll('.bg-blob'), {
        x: (index: number) => xPos * (index + 1) * 0.5,
        y: (index: number) => yPos * (index + 1) * 0.5,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark selection:bg-primary/30">
      <Cursor />
      <Navbar />
      
      {/* Global Background Decorations */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-blob absolute top-[-10%] right-[-10%] size-[600px] md:size-[800px] rounded-full bg-primary/10 blur-[120px] dark:opacity-40 animate-pulse-slow"></div>
        <div className="bg-blob absolute bottom-[20%] left-[-5%] size-[400px] md:size-[600px] rounded-full bg-indigo-vibrant/5 blur-[100px] dark:opacity-30"></div>
        <div className="bg-blob absolute top-[40%] left-[10%] size-[300px] md:size-[500px] rounded-full bg-cyan-vibrant/5 blur-[80px] dark:opacity-20"></div>
      </div>

      <div className="relative z-10">
        <ScrollytellingHero />

        <section id="skills">
          <TechStack />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
