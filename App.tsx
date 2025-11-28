import React from 'react';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Hero />
      
      <section id="skills">
        <TechStack />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="experience">
        <Experience />
      </section>
      
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default App;