'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * A basic Particle class for the background effect.
 * Handles position, velocity, and basic rendering.
 */
class Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
  originalColor: string;
  isHovered: boolean = false;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.radius = Math.random() * 2 + 1;
    this.x = Math.random() * (canvasWidth - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvasHeight - this.radius * 2) + this.radius;

    // Random velocity
    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;

    // Vibrant colors
    const hue = Math.random() * 60 + 200; // Blues and purples
    this.color = `hsl(${hue}, 70%, 50%)`;
    this.originalColor = this.color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvasWidth: number, canvasHeight: number, mouse: { x: number; y: number }) {
    // Boundary bounce
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Mouse interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;

    if (distance < maxDistance) {
      this.radius = Math.min(this.radius + 1, 8);
      this.color = 'hsl(50, 100%, 60%)';
    } else {
      this.radius = Math.max(this.radius - 0.1, Math.random() * 2 + 1);
      this.color = this.originalColor;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      const particleCount = Math.min(200, (canvas.width * canvas.height) / 5000);

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      ctx.fillStyle = '#0a0a16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouse);
        particle.draw(ctx);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 bg-[#0a0a16]"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-10">
        <h1 className="text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] pointer-events-none">
          Siyyo
        </h1>
        <Link
          href="/projects"
          id="explore-projects-btn"
          className="group relative px-8 py-4 rounded-full font-semibold text-white text-lg tracking-wide
                     bg-white/5 backdrop-blur-sm border border-white/10
                     hover:border-cyan-400/50 hover:bg-white/10 hover:scale-105
                     transition-all duration-300 ease-out
                     shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
        >
          Explore Projects
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
