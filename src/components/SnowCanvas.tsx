import React, { useEffect, useRef } from 'react';

interface SnowCanvasProps {
  enabled: boolean;
  intensity?: 'gentle' | 'normal' | 'blizzard';
}

export const SnowCanvas: React.FC<SnowCanvasProps> = ({ enabled, intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const countMap = {
      gentle: 40,
      normal: 85,
      blizzard: 170,
    };

    const flakeCount = countMap[intensity];
    interface Flake {
      x: number;
      y: number;
      r: number;
      d: number; // density / speed
      a: number; // angle
      step: number;
      opacity: number;
    }

    const flakes: Flake[] = [];
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        d: Math.random() * flakeCount,
        a: Math.random() * Math.PI * 2,
        step: Math.random() * 0.02 + 0.005,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.beginPath();
        // Subtle soft winter sage/white flake that looks elegant on light parchment
        ctx.fillStyle = `rgba(140, 175, 155, ${f.opacity * 0.35})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        ctx.fill();

        // Update positions
        f.a += f.step;
        f.y += Math.cos(f.a + f.d) + 1 + f.r / 2;
        f.x += Math.sin(f.a) * 1.5;

        // Reset when fallen off screen
        if (f.x > width + 5 || f.x < -5 || f.y > height) {
          if (i % 3 > 0) {
            flakes[i] = {
              x: Math.random() * width,
              y: -10,
              r: f.r,
              d: f.d,
              a: f.a,
              step: f.step,
              opacity: f.opacity,
            };
          } else {
            // Enter from right or left if blown
            if (Math.sin(f.a) > 0) {
              flakes[i] = {
                x: -5,
                y: Math.random() * height,
                r: f.r,
                d: f.d,
                a: f.a,
                step: f.step,
                opacity: f.opacity,
              };
            } else {
              flakes[i] = {
                x: width + 5,
                y: Math.random() * height,
                r: f.r,
                d: f.d,
                a: f.a,
                step: f.step,
                opacity: f.opacity,
              };
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, intensity]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      id="snowfall-canvas"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
};
