import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export interface SectionHeaderProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  className = '',
  descriptionClassName = 'max-w-2xl',
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const badgeEl = el.querySelector('.section-badge');
    const titleEl = el.querySelector('.section-title');
    const descEl = el.querySelector('.section-desc');

    // Set initial hidden states so headers are hidden before user scrolls to this section
    if (badgeEl) gsap.set(badgeEl, { x: -45, opacity: 0 });
    if (titleEl) gsap.set(titleEl, { x: -65, opacity: 0 });
    if (descEl) gsap.set(descEl, { y: 20, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately: plays ONCE on reach, never replays on scroll back
          observer.unobserve(entry.target);

          const tl = gsap.timeline();
          tl.fromTo(
            el,
            { borderLeftColor: 'transparent' },
            { borderLeftColor: '', duration: 0.35, ease: 'power2.out' }
          );

          if (badgeEl) {
            tl.to(
              badgeEl,
              { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              '-=0.25'
            );
          }
          if (titleEl) {
            tl.to(
              titleEl,
              { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
              '-=0.35'
            );
          }
          if (descEl) {
            tl.to(
              descEl,
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              '-=0.3'
            );
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`relative flex flex-col gap-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-6 text-left ${className}`}
    >
      {/* Top Eyebrow Badge - Hidden on mobile, visible on md+ */}
      <div className="section-badge hidden md:flex items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">
          {badge}
        </span>
        <div className="h-[1px] w-12 bg-primary/20" aria-hidden="true" />
      </div>

      {/* Main Section Heading */}
      <h2 className="section-title text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display leading-[0.9]">
        {title}
      </h2>

      {/* Subtitle / Description narrative */}
      {description && (
        <p
          className={`section-desc text-sm md:text-base text-slate-500 dark:text-slate-400 font-light leading-tight md:leading-relaxed ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

