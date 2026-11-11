import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export const initLenis = (): Lenis | null => {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 0.85, // Snappy, buttery smooth glide without sluggish lag
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.0,
    syncTouch: false, // Prevent fighting native 120Hz mobile kinetic scrolling
    autoResize: true,
  });

  lenisInstance = lenis;
  (window as any).lenis = lenis;

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  // Maintain healthy lag smoothing so background micro-tasks never hitch or freeze scroll
  gsap.ticker.lagSmoothing(500, 33);

  return lenis;
};

export const getLenis = (): Lenis | null => lenisInstance;
export default initLenis;

