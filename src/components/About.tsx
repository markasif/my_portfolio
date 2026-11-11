import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { gsap, ScrollTrigger } from '../lib/gsap';

const ABOUT_TEXT =
  "AI Engineer & Full Stack Developer specializing in autonomous multi-agent systems, custom MCP tools, and production RAG pipelines at Neointelli. Backed by 10+ production applications across Python, Node.js, and React, I bridge state-of-the-art AI systems with enterprise reliability. Let's build something incredible together!";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typewriterStartedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial hidden states so content is completely hidden before user reaches About
    gsap.set(['.about-eyebrow', '.about-heading', '.about-cta'], { opacity: 0 });
    gsap.set('.about-eyebrow', { x: -50 });
    gsap.set('.about-heading', { x: -80 });
    gsap.set('.about-accent-line', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('.about-cta', { y: 25 });

    // 1. Natural Wind Ambient Simulation for Palm Leaves
    const ctx = gsap.context(() => {
      // TOP-LEFT PALM LEAF
      const tlLeft = gsap.timeline({ repeat: -1 });
      tlLeft
        .to("[data-leaf='left-stem']", {
          rotation: 2.2,
          x: 6,
          y: 5,
          duration: 3.0,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='left-stem']", {
          rotation: -1.2,
          x: -3,
          y: -2,
          duration: 2.6,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='left-stem']", {
          rotation: 3.8,
          x: 12,
          y: 8,
          duration: 2.2,
          ease: 'power1.out',
        })
        .to("[data-leaf='left-stem']", {
          rotation: -0.8,
          x: -4,
          y: -3,
          duration: 2.4,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='left-stem']", {
          rotation: 0,
          x: 0,
          y: 0,
          duration: 2.2,
          ease: 'sine.inOut',
        });

      gsap.to("[data-leaf='left-blade']", {
        rotation: 1.8,
        skewY: 1.2,
        duration: 4.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: '20% 20%',
        delay: 0.2,
      });

      // BOTTOM-RIGHT PALM LEAF
      const tlRight = gsap.timeline({ repeat: -1 });
      tlRight
        .to("[data-leaf='right-stem']", {
          rotation: -2.2,
          x: -6,
          y: -5,
          duration: 3.2,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='right-stem']", {
          rotation: 1.2,
          x: 3,
          y: 2,
          duration: 2.8,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='right-stem']", {
          rotation: -3.6,
          x: -12,
          y: -8,
          duration: 2.4,
          ease: 'power1.out',
        })
        .to("[data-leaf='right-stem']", {
          rotation: 0.8,
          x: 4,
          y: 3,
          duration: 2.6,
          ease: 'sine.inOut',
        })
        .to("[data-leaf='right-stem']", {
          rotation: 0,
          x: 0,
          y: 0,
          duration: 2.4,
          ease: 'sine.inOut',
        });

      gsap.to("[data-leaf='right-blade']", {
        rotation: -1.8,
        skewY: -1.2,
        duration: 4.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: '70% 60%',
        delay: 0.3,
      });

      gsap.to('.leaf-glow', {
        opacity: 0.28,
        scale: 1.10,
        duration: 5.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      if (ScrollTrigger && window.innerWidth >= 640) {
        gsap.to("[data-leaf-parallax='left']", {
          y: -42,
          x: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });

        gsap.to("[data-leaf-parallax='right']", {
          y: 42,
          x: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, section);

    let typingInterval: number | null = null;

    // 2. Native Viewport IntersectionObserver: 100% reliable one-time entrance on reach
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately so it only triggers ONCE and never resets on scroll back
          observer.unobserve(entry.target);

          // Animate Heading & Accent Line revealing from left to right
          const tl = gsap.timeline();
          tl.to('.about-eyebrow', {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
          })
            .to(
              '.about-heading',
              {
                x: 0,
                opacity: 1,
                duration: 0.75,
                ease: 'power3.out',
              },
              '-=0.3'
            )
            .to(
              '.about-accent-line',
              {
                scaleX: 1,
                duration: 0.5,
                ease: 'power2.out',
              },
              '-=0.25'
            )
            .to(
              '.about-cta',
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                ease: 'power2.out',
              },
              '+=0.1'
            );

          // Trigger Typewriter Stream smoothly at authentic typewriter pace
          if (!typewriterStartedRef.current) {
            typewriterStartedRef.current = true;
            setHasStarted(true);
            setIsTyping(true);
            let count = 0;
            const step = 2; // 2 characters per tick for a brisk, engaging typewriter pace (~2.6s total)
            typingInterval = window.setInterval(() => {
              count += step;
              if (count >= ABOUT_TEXT.length) {
                setTypedChars(ABOUT_TEXT.length);
                setIsTyping(false);
                if (typingInterval !== null) {
                  window.clearInterval(typingInterval);
                }
              } else {
                setTypedChars(count);
              }
            }, 18);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(section);

    return () => {
      ctx.revert();
      observer.disconnect();
      if (typingInterval !== null) {
        window.clearInterval(typingInterval);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-hero">
      {/* Soft atmospheric backlight orbs */}
      <div className="leaf-glow leaf-glow-top-left" />
      <div className="leaf-glow leaf-glow-bottom-right" />

      {/* ============================================================ */}
      {/* 1. TOP-LEFT PALM LEAF (Entering from top-left boundary)       */}
      {/* ============================================================ */}
      <div
        className="leaf-parallax-wrapper leaf-parallax-top-left"
        data-leaf-parallax="left"
      >
        <div className="leaf-stem-top-left" data-leaf="left-stem">
          <div className="leaf-blade-follow" data-leaf="left-blade">
            <img
              src="/images/leave_left.png"
              alt="Decorative palm leaf framing top left"
              aria-hidden="true"
              width="440"
              height="440"
              loading="lazy"
              decoding="async"
              className="botanical-leaf-photo"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. BOTTOM-RIGHT PALM LEAF (Entering from bottom-right boundary)*/}
      {/* ============================================================ */}
      <div
        className="leaf-parallax-wrapper leaf-parallax-bottom-right"
        data-leaf-parallax="right"
      >
        <div className="leaf-stem-bottom-right" data-leaf="right-stem">
          <div className="leaf-blade-follow" data-leaf="right-blade">
            <img
              src="/images/leave_right.png"
              alt="Decorative palm leaf framing bottom right"
              aria-hidden="true"
              width="440"
              height="440"
              loading="lazy"
              decoding="async"
              className="botanical-leaf-photo"
            />
          </div>
        </div>
      </div>

      {/* Central Content (Primary visual hierarchy, clear of foliage) */}
      <div className="about-content">
        <div className="about-eyebrow hidden sm:flex">
          <span />
          WHO I AM
          <span />
        </div>

        <h2 className="about-heading">
          ABOUT <span>ME</span>
        </h2>

        {/* Glowing cyan horizontal accent bar from reference image */}
        <div className="about-accent-line" />

        {/* Fast typewriter animated description */}
        <p className="min-h-[110px] sm:min-h-[96px] text-slate-300 font-normal leading-relaxed text-sm sm:text-base md:text-lg">
          {hasStarted ? ABOUT_TEXT.slice(0, typedChars) : ''}
          {isTyping && (
            <span className="inline-block w-2 h-4 sm:h-5 bg-[#00F0FF] ml-1 animate-pulse align-middle" />
          )}
        </p>

        <div className="about-cta mt-5 sm:mt-8 flex justify-center">
          <Button variant="primary" href="#contact" className="min-w-[155px] sm:min-w-[210px]">
            LET&apos;S CONNECT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
