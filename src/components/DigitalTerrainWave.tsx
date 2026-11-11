import React, { useEffect, useRef } from 'react';

interface DigitalTerrainWaveProps {
  lineRefs?: React.RefObject<(HTMLDivElement | null)[]>;
  pillarPositions?: number[]; // Fallback percentage positions [0..1]
  className?: string;
  mode?: 'roadmap' | 'ambient';
}

export const DigitalTerrainWave: React.FC<DigitalTerrainWaveProps> = ({
  lineRefs,
  pillarPositions = [0.10, 0.27, 0.44, 0.61, 0.78],
  className = '',
  mode = 'roadmap',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ambient floating light particles
    const AMBIENT_COUNT = 38;
    const ambientParticles = Array.from({ length: AMBIENT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.8,
      speedX: Math.random() * 0.012 + 0.004,
      speedY: Math.random() * 0.018 + 0.008,
      color: Math.random() > 0.35 ? '#00F0FF' : '#A855F7',
      opacity: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2
    }));

    // Cache canvas metrics to avoid layout thrashing
    let canvasWidth = 0;
    let canvasHeight = 0;
    let canvasLeft = 0;
    let canvasTop = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvasLeft = rect.left;
      canvasTop = rect.top;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const handleScroll = () => {
      const rect = canvas.getBoundingClientRect();
      canvasLeft = rect.left;
      canvasTop = rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection observer to track when section scrolls into viewport
    let drawStartTime = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (drawStartTime === 0) {
            drawStartTime = performance.now();
          }
          if (!prefersReducedMotion) {
            render();
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(canvas);

    // Optimized grid configuration for high-FPS rendering
    const isMobile = window.innerWidth < 640;
    const COLS = isMobile ? 40 : 72;
    const ROWS = isMobile ? 10 : 16;

    // Main render loop
    const render = () => {
      if (!isVisible) return;
      if (canvasWidth === 0 || canvasHeight === 0) {
        handleResize();
      }

      const width = canvasWidth;
      const height = canvasHeight;

      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const time = prefersReducedMotion ? 1.4 : (now - startTime) * 0.001;
      const travel = time * 0.45;

      // 1. Gather Control Points (Roadmap Milestones vs Ambient Mode)
      let controlPoints: { x: number; y: number }[] = [];
      const anchorPoints: { x: number; y: number }[] = [];
      const numMilestones = 5;

      if (mode === 'ambient') {
        const p0 = { x: -width * 0.08, y: height * (0.64 + Math.sin(travel * 0.7) * 0.05) };
        const p1 = { x: width * 0.22, y: height * (0.58 + Math.cos(travel * 0.9) * 0.06) };
        const p2 = { x: width * 0.50, y: height * (0.62 + Math.sin(travel * 1.1 + 1.2) * 0.05) };
        const p3 = { x: width * 0.76, y: height * (0.56 + Math.cos(travel * 0.8 + 2.0) * 0.06) };
        const p4 = { x: width * 1.08, y: height * (0.62 + Math.sin(travel * 0.7 + 3.1) * 0.05) };
        controlPoints = [p0, p1, p2, p3, p4];
      } else {
        for (let i = 0; i < numMilestones; i++) {
          let anchorX = 0;
          let anchorY = 0;

          if (!isMobile && lineRefs?.current && lineRefs.current[i]) {
            const domLine = lineRefs.current[i];
            if (domLine) {
              const domRect = domLine.getBoundingClientRect();
              anchorX = domRect.left + domRect.width / 2 - canvasLeft;
              anchorY = domRect.bottom - canvasTop;
            }
          }

          // Fallback calculations if ref is not measured yet
          if (anchorX <= 0 || anchorX >= width || anchorY <= 0) {
            const posRatio = pillarPositions[i] !== undefined ? pillarPositions[i] : (0.10 + i * 0.17);
            anchorX = width * posRatio;
            // Rising staircase fallback: first one lower (larger Y), AI Engineer highest (smaller Y)
            const fallbackHeightRatio = isMobile 
              ? (0.75 - i * 0.04) 
              : (0.78 - i * 0.05); // e.g., 0.78, 0.73, 0.68, 0.63, 0.58
            anchorY = height * fallbackHeightRatio;
          }

          anchorPoints.push({ x: anchorX, y: anchorY });
        }

        // Build Stepped Wave Curve that touches each pillar endpoint
        const p0 = anchorPoints[0];
        const pLast = anchorPoints[anchorPoints.length - 1];

        const leftEdge = {
          x: -width * 0.08,
          y: Math.min(height * 0.92, p0.y + 45)
        };
        const rightEdge = {
          x: width * 1.08,
          y: Math.min(height * 0.88, pLast.y + 55)
        };

        controlPoints = [leftEdge, ...anchorPoints, rightEdge];
      }

      // Smooth stepped wave function: Evaluates the wave crest Y at any given screen X
      const getCrestY = (x: number): number => {
        if (x <= controlPoints[0].x) return controlPoints[0].y;
        if (x >= controlPoints[controlPoints.length - 1].x) {
          return controlPoints[controlPoints.length - 1].y;
        }

        // Find the segment [k, k+1] containing x
        let k = 0;
        for (let i = 0; i < controlPoints.length - 1; i++) {
          if (x >= controlPoints[i].x && x <= controlPoints[i + 1].x) {
            k = i;
            break;
          }
        }

        const pA = controlPoints[k];
        const pB = controlPoints[k + 1];
        const segWidth = pB.x - pA.x;
        if (segWidth <= 0) return pA.y;

        const t = (x - pA.x) / segWidth;

        // Cubic Hermite smoothstep for stepped progression
        const smoothT = t * t * (3 - 2 * t);
        const baseY = pA.y + (pB.y - pA.y) * smoothT;

        // Wave undulation: flows like an oceanic wave
        // In roadmap mode, drops to 0 at pillar touchpoints (sin(t * PI) = 0) so the wave
        // crest directly touches the line end part of each pillar
        const undulatingWave = mode === 'ambient'
          ? (Math.sin((x / width) * 7.5 - travel) * 9 + Math.cos((x / width) * 4.2 + travel * 0.6) * 5)
          : (
            Math.sin((x / width) * 11.0 - travel) * 12 +
            Math.cos((x / width) * 5.5 + travel * 0.7) * 7
          ) * Math.sin(t * Math.PI);

        return baseY + undulatingWave;
      };

      // 3. Precompute primary crest line across columns
      const crestPoints: { x: number; y: number }[] = [];
      const colStep = width / (COLS - 1);
      for (let c = 0; c < COLS; c++) {
        const x = c * colStep;
        const y = getCrestY(x);
        crestPoints.push({ x, y });
      }

      // 4. Render 3D Dotted Mesh Terrain with Batched Draw Calls (Ultra-fast 120 FPS performance)
      const cyanDots: [number, number, number][] = [];
      const violetDots: [number, number, number][] = [];
      const blueDots: [number, number, number][] = [];
      const whiteDots: [number, number, number][] = [];

      for (let r = ROWS - 1; r >= 0; r--) {
        const rowNorm = r / (ROWS - 1);
        for (let c = 0; c < COLS; c++) {
          const crest = crestPoints[c];
          const colNorm = c / (COLS - 1);

          const spaceBelow = Math.max(80, height - crest.y + 40);
          const depthY = rowNorm * spaceBelow;

          const depthWave1 = Math.sin(colNorm * 8.0 + rowNorm * 4.5 - travel) * (14 * rowNorm);
          const depthWave2 = Math.cos(colNorm * 13.5 - rowNorm * 3.0 + travel * 0.75) * (8 * rowNorm);
          
          const screenX = crest.x;
          const screenY = crest.y + depthY + depthWave1 + depthWave2;
          const particleRadius = Math.max(0.7, (1.8 - rowNorm * 0.8) * 1.1);

          const isViolet = (c % 7 === 0 || c % 10 === 0) && r > 2 && r < 12;
          const isAIHighlight = colNorm > 0.68 && r <= 2 && (c % 5 === 0);

          if (isAIHighlight) {
            whiteDots.push([screenX, screenY, particleRadius]);
          } else if (isViolet) {
            violetDots.push([screenX, screenY, particleRadius]);
          } else if (r <= 2) {
            cyanDots.push([screenX, screenY, particleRadius]);
          } else {
            blueDots.push([screenX, screenY, particleRadius]);
          }
        }
      }

      // Fast batched drawing: 4 fill calls total instead of 3,000!
      if (blueDots.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < blueDots.length; i++) {
          const [x, y, rad] = blueDots[i];
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(20, 75, 170, 0.45)';
        ctx.fill();
      }

      if (violetDots.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < violetDots.length; i++) {
          const [x, y, rad] = violetDots[i];
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(180, 80, 255, 0.75)';
        ctx.fill();
      }

      if (cyanDots.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < cyanDots.length; i++) {
          const [x, y, rad] = cyanDots[i];
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(0, 240, 255, 0.88)';
        ctx.fill();
      }

      if (whiteDots.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < whiteDots.length; i++) {
          const [x, y, rad] = whiteDots[i];
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();
      }

      // 5. Secondary Depth Ridge (Subtle violet/cyan wave contour)
      ctx.save();
      ctx.beginPath();
      for (let c = 0; c < COLS; c++) {
        const crest = crestPoints[c];
        const colNorm = c / (COLS - 1);
        const secY = crest.y + 24 + Math.sin(colNorm * 6.5 - travel * 0.8) * 8;
        if (c === 0) {
          ctx.moveTo(crest.x, secY);
        } else {
          ctx.lineTo(crest.x, secY);
        }
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.32)';
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.restore();

      // 6. Primary Continuous Glowing Wave Crest Line (comes from left to right on scroll reach)
      let drawProgress = 0;
      if (drawStartTime > 0) {
        const elapsedSec = (now - drawStartTime) * 0.001;
        const rawProgress = Math.min(1, Math.max(0, elapsedSec / 1.4));
        drawProgress = prefersReducedMotion ? 1 : 1 - Math.pow(1 - rawProgress, 3);
      }

      if (crestPoints.length > 1 && drawProgress > 0.005) {
        const endIdx = Math.min(
          crestPoints.length - 1,
          Math.max(1, Math.floor(drawProgress * (crestPoints.length - 1)))
        );

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(crestPoints[0].x, crestPoints[0].y);

        for (let i = 1; i < endIdx; i++) {
          const xc = (crestPoints[i].x + crestPoints[i + 1].x) * 0.5;
          const yc = (crestPoints[i].y + crestPoints[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(crestPoints[i].x, crestPoints[i].y, xc, yc);
        }
        if (endIdx > 0) {
          ctx.lineTo(crestPoints[endIdx].x, crestPoints[endIdx].y);
        }

        // Glowing gradient stroke: cyan with violet accents
        const crestGrad = ctx.createLinearGradient(0, 0, width, 0);
        crestGrad.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
        crestGrad.addColorStop(0.25, 'rgba(0, 240, 255, 0.95)');
        crestGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.92)');
        crestGrad.addColorStop(0.78, 'rgba(0, 240, 255, 0.98)');
        crestGrad.addColorStop(1, 'rgba(0, 240, 255, 0.4)');

        ctx.strokeStyle = crestGrad;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Outer soft aura
        ctx.lineWidth = 5.2;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)';
        ctx.shadowBlur = 24;
        ctx.stroke();

        // Leading glowing tip while advancing smoothly from left to right
        if (drawProgress < 0.99 && endIdx > 0) {
          const leadPt = crestPoints[endIdx];
          ctx.beginPath();
          ctx.arc(leadPt.x, leadPt.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 20;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(leadPt.x, leadPt.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.fill();
        }

        ctx.restore();
      }

      // 7. Milestone Pillar Touchpoints: Ripple Effects & Glowing Nodes
      // Each pillar vertical line end touches the wave directly here
      if (mode === 'roadmap' && !isMobile && anchorPoints.length === numMilestones) {
        const currentLeadingX = crestPoints.length > 1 && drawProgress > 0
          ? crestPoints[Math.min(crestPoints.length - 1, Math.floor(drawProgress * (crestPoints.length - 1)))].x
          : -999;

        for (let i = 0; i < numMilestones; i++) {
          const isCurrent = i === 4; // Node 05: AI Engineer
          const pt = anchorPoints[i];
          const touchX = pt.x;
          const touchY = pt.y;

          // Dot only reveals smoothly once the traveling line reaches it
          if (touchX > currentLeadingX + 20 && drawProgress < 0.99) {
            continue;
          }

          // 7a. Circular Perspective Ripples around the touchpoint
          ctx.save();
          const rippleSpeed = 22;
          const ripplePeriod = 44;
          const staggerOffset = i * 11.2;
          const rippleCount = isCurrent ? 3 : 2;

          for (let rIdx = 0; rIdx < rippleCount; rIdx++) {
            const rPhase = (time * rippleSpeed + staggerOffset + rIdx * (ripplePeriod / rippleCount)) % ripplePeriod;
            const rRadius = rPhase;
            const rAlpha = Math.max(0, (1 - rRadius / ripplePeriod)) * (isCurrent ? 0.8 : 0.45);

            ctx.beginPath();
            ctx.ellipse(touchX, touchY, rRadius, rRadius * 0.35, 0, 0, Math.PI * 2);
            ctx.strokeStyle = isCurrent 
              ? `rgba(0, 240, 255, ${rAlpha})` 
              : `rgba(0, 240, 255, ${rAlpha * 0.8})`;
            ctx.lineWidth = isCurrent ? 1.6 : 1.1;
            ctx.shadowColor = '#00F0FF';
            ctx.shadowBlur = isCurrent ? 12 : 6;
            ctx.stroke();
          }
          ctx.restore();

          // 7b. Glowing Connection Node right at the line end
          ctx.save();
          const pulse = Math.sin(time * 2.8 + i * 1.4) * 0.2 + 0.8;
          const auraRadius = (isCurrent ? 24 : 13) * pulse;

          const auraGrad = ctx.createRadialGradient(touchX, touchY, 0, touchX, touchY, auraRadius);
          auraGrad.addColorStop(0, isCurrent ? 'rgba(0, 240, 255, 0.98)' : 'rgba(0, 240, 255, 0.75)');
          auraGrad.addColorStop(0.4, isCurrent ? 'rgba(0, 240, 255, 0.45)' : 'rgba(0, 240, 255, 0.25)');
          auraGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(touchX, touchY, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Solid inner core circle (pure white for AI Engineer beacon)
          ctx.beginPath();
          ctx.arc(touchX, touchY, isCurrent ? 5.8 : 4.0, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = isCurrent ? 22 : 12;
          ctx.fill();

          // Outer cyan ring on node
          ctx.beginPath();
          ctx.arc(touchX, touchY, isCurrent ? 8.2 : 5.8, 0, Math.PI * 2);
          ctx.strokeStyle = '#00F0FF';
          ctx.lineWidth = isCurrent ? 1.8 : 1.4;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 8. Subtle Moving Ambient Light Particles
      ctx.save();
      for (const p of ambientParticles) {
        if (!prefersReducedMotion) {
          p.x = (p.x + p.speedX * 0.06) % 1;
          p.y = (p.y - p.speedY * 0.06 + 1) % 1;
        }

        const px = p.x * width;
        const py = p.y * height;
        const pAlpha = p.opacity * (Math.sin(time * 2.2 + p.phase) * 0.25 + 0.75);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lineRefs, pillarPositions, mode]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full block pointer-events-none select-none ${className}`}
    />
  );
};

export default DigitalTerrainWave;
