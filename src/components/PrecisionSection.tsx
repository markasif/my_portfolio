import React, { useEffect, useRef } from 'react';
import { DigitalTerrainWave } from './DigitalTerrainWave';
import SectionHeader from './SectionHeader';
import { gsap, ScrollTrigger } from '../lib/gsap';

const LINE_GRADIENT =
  'linear-gradient(180deg, #00F0FF 0%, rgba(0, 240, 255, 0.75) 40%, rgba(172, 36, 255, 0.4) 75%, rgba(0, 240, 255, 0.85) 100%)';

const PILLARS = [
  {
    step: '01',
    label: 'BCA (Computer Apps)',
    items: [
      '2019 – 2022',
      'Kristu Jayanti University',
      'Algorithms & Data Structures',
      'Database Architecture & SQL',
    ],
    leftPercent: 1.5,
    leftVw: 1.5,
    bottomVw: 4.0,
  },
  {
    step: '02',
    label: 'MCA (Software Eng)',
    items: [
      '2022 – 2024',
      'Lovely Professional Univ',
      'Distributed Cloud Systems',
      'System Design & OOP',
    ],
    leftPercent: 21.0,
    leftVw: 18.0,
    bottomVw: 6.8,
  },
  {
    step: '03',
    label: 'Data Science Intern',
    items: [
      '2024 – 2025',
      'Futura Labs (Kerala)',
      'Machine Learning Models',
      'Python Data Pipelines',
    ],
    leftPercent: 41.0,
    leftVw: 34.5,
    bottomVw: 9.6,
  },
  {
    step: '04',
    label: 'Full Stack Developer',
    items: [
      '2025 – 2026',
      'Think Forge Global',
      'Production React & Node.js',
      'Real-Time WebSocket APIs',
    ],
    leftPercent: 60.5,
    leftVw: 51.0,
    bottomVw: 12.4,
  },
  {
    step: '05',
    label: 'AI Engineer',
    isCurrent: true,
    items: [
      '2026 – Present',
      'Neointelli (Current Role)',
      'Autonomous Multi-Agents',
      'Custom MCP & Production RAG',
    ],
    leftPercent: 80.0,
    leftVw: 67.5,
    bottomVw: 15.2,
  },
];

export const PrecisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktopPillars = section.querySelectorAll('.experience-pillar');
    const mobileCards = section.querySelectorAll('.experience-mobile-card');

    // Set initial hidden states so roadmap is hidden before user reaches Experience
    gsap.set(desktopPillars, { y: 25, opacity: 0 });
    gsap.set(mobileCards, { y: 20, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately: plays ONCE on reach, never replays on scroll back
          observer.unobserve(entry.target);

          gsap.to(desktopPillars, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.18, // Matches the cyan line gliding smoothly from left to right!
            ease: 'power2.out',
          });

          gsap.to(mobileCards, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          });
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-black text-white py-8 md:py-10 lg:py-12 xl:py-14 px-6 md:px-8 flex flex-col items-center overflow-hidden"
    >
      {/* Main Container - Identical spacing and max-w-7xl to other sections */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 lg:gap-10 relative z-10">
        <SectionHeader
          badge="CAREER & ACADEMIC ROADMAP"
          title={<>Experience &amp; <span className="text-primary">Education</span></>}
          description="Academic foundations and engineering progression along an integrated staircase roadmap."
        />

        {/* Pillars container */}
        <div className="relative w-full">
          {/* Desktop pillars — 5 rising staircase columns (hidden sm:block) */}
          <div
            className="experience-desktop-container hidden sm:block"
            style={{
              position: 'relative',
              width: '100%',
              height: '38vw',
              minHeight: '460px',
              maxHeight: '620px',
              color: '#FFFFFF',
            }}
          >
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.label}
                className="experience-pillar"
                style={{
                  position: 'absolute',
                  bottom: `${pillar.bottomVw}vw`,
                  left: `${pillar.leftPercent}%`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
              {/* Chip Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: pillar.isCurrent
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(7, 19, 40, 0.95))'
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(7, 19, 40, 0.85))',
                  border: pillar.isCurrent
                    ? '1.5px solid #00F0FF'
                    : '1px solid rgba(0, 240, 255, 0.28)',
                  boxShadow: pillar.isCurrent
                    ? '0 0 22px rgba(0, 240, 255, 0.25), 0 4px 15px rgba(0, 0, 0, 0.7)'
                    : '0 4px 15px rgba(0, 0, 0, 0.6)',
                  color: '#FFFFFF',
                  fontSize: 'clamp(11px, 0.86vw, 15px)',
                  fontWeight: 700,
                  borderRadius: '24px',
                  padding: '0.55vw 1.0vw',
                  whiteSpace: 'nowrap',
                  gap: '7px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: '5px',
                      backgroundColor: '#00F0FF',
                      color: '#030711',
                    }}
                  >
                    {pillar.step}
                  </span>
                <span>{pillar.label}</span>
                {pillar.isCurrent && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#00F0FF',
                      boxShadow: '0 0 8px #00F0FF',
                    }}
                  />
                )}
              </div>

              {/* Line + items wrapper */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Items container */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.56vw',
                    left: '1.0vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    fontSize: '14px',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pillar.items.map((item, itemIdx) => (
                    <div
                      key={item}
                      style={{
                        padding: '0.38vw 0.7vw',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 'clamp(11px, 0.76vw, 13px)',
                        color:
                          itemIdx === 0
                            ? '#00F0FF'
                            : itemIdx === 1
                            ? '#FFFFFF'
                            : '#94a3b8',
                        fontWeight: itemIdx <= 1 ? 600 : 400,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Vertical gradient line */}
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el;
                  }}
                  style={{
                    backgroundImage: LINE_GRADIENT,
                    width: '1px',
                    height: '14vw',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile pillars — alternating flow for all 5 pillars (flex flex-col sm:hidden w-full) */}
        <div
          className="experience-mobile-container flex flex-col sm:hidden w-full"
          style={{
            color: '#FFFFFF',
            gap: '12px',
          }}
        >
          {PILLARS.map((pillar, index) => {
            const isRight = index % 2 !== 0;
            return (
              <div
                key={pillar.label}
                className="experience-mobile-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isRight ? 'flex-end' : 'flex-start',
                  width: '100%',
                  paddingBottom: '8px',
                }}
              >
                {/* Chip Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: pillar.isCurrent
                      ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(7, 19, 40, 0.95))'
                      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(7, 19, 40, 0.85))',
                    border: pillar.isCurrent
                      ? '1.5px solid #00F0FF'
                      : '1px solid rgba(0, 240, 255, 0.28)',
                    boxShadow: pillar.isCurrent
                      ? '0 0 16px rgba(0, 240, 255, 0.25)'
                      : '0 4px 12px rgba(0, 0, 0, 0.5)',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '20px',
                    padding: '8px 14px',
                    whiteSpace: 'nowrap',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: '4px',
                      backgroundColor: '#00F0FF',
                      color: '#030711',
                    }}
                  >
                    {pillar.step}
                  </span>
                  <span>{pillar.label}</span>
                  {pillar.isCurrent && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        backgroundColor: '#00F0FF',
                        boxShadow: '0 0 6px #00F0FF',
                      }}
                    />
                  )}
                </div>

                {/* Line + items row */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: isRight ? 'row-reverse' : 'row',
                    alignItems: 'stretch',
                    width: '100%',
                    marginTop: '4px',
                  }}
                >
                  {/* Vertical line */}
                  <div
                    style={{
                      width: '1px',
                      flexShrink: 0,
                      backgroundImage: LINE_GRADIENT,
                      marginLeft: isRight ? 0 : '18px',
                      marginRight: isRight ? '18px' : 0,
                      minHeight: '110px',
                    }}
                  />

                  {/* Items */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      paddingLeft: isRight ? 0 : '16px',
                      paddingRight: isRight ? '16px' : 0,
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      alignItems: isRight ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {pillar.items.map((item, itemIdx) => (
                      <div
                        key={item}
                        style={{
                          fontSize: '12.5px',
                          color:
                            itemIdx === 0
                              ? '#00F0FF'
                              : itemIdx === 1
                              ? '#FFFFFF'
                              : '#94a3b8',
                          fontWeight: itemIdx <= 1 ? 600 : 400,
                          padding: '3px 0',
                          textAlign: isRight ? 'right' : 'left',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Digital Terrain Wave Canvas - Hidden on mobile, desktop/tablet only */}
      <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <DigitalTerrainWave lineRefs={lineRefs} />
      </div>
    </section>
  );
};

export default PrecisionSection;
