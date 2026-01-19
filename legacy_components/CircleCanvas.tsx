import React, { useRef, useEffect } from 'react';

type Personality = 'playful' | 'shy' | 'loner' | 'social';
type LonerState = 'seeking' | 'paired';

class WaveEffect {
  x: number;
  y: number;
  maxRadius: number;
  color: string;
  maxLife: number = 30; // 30 frames = ~0.5 seconds
  life: number = this.maxLife;
  currentRadius: number = 0;

  constructor(x: number, y: number, maxRadius: number, color: string) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.color = color;
  }

  update() {
    this.life--;
    this.currentRadius = this.maxRadius * (1 - (this.life / this.maxLife));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;

    const opacity = (this.life / this.maxLife) * 0.7; // Fade out
    const lineWidth = (this.life / this.maxLife) * 4; // Wave gets thinner

    ctx.strokeStyle = this.color.replace('${opacity}', opacity.toString());
    ctx.lineWidth = Math.max(1, lineWidth);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

class LineEffect {
  x: number;
  y: number;
  angle: number;
  maxLength: number = 50;
  currentLength: number = 0;
  maxLife: number = 20; // Faster effect
  life: number = this.maxLife;

  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  update() {
    this.life--;
    this.currentLength = this.maxLength * (1 - (this.life / this.maxLife));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    const opacity = (this.life / this.maxLife);
    const halfLength = this.currentLength / 2;

    const x1 = this.x - halfLength * Math.cos(this.angle);
    const y1 = this.y - halfLength * Math.sin(this.angle);
    const x2 = this.x + halfLength * Math.cos(this.angle);
    const y2 = this.y + halfLength * Math.sin(this.angle);
    
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

class StardustParticle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.maxLife = Math.random() * 30 + 20;
    this.life = this.maxLife;
    this.color = `hsl(320, 100%, ${Math.random() * 30 + 70}%)`;
  }

  update() {
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    const opacity = this.life / this.maxLife;
    ctx.fillStyle = this.color.replace(')', `, ${opacity})`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * opacity, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Circle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  baseRadius: number;
  angle: number = Math.random() * Math.PI * 2;
  mass: number;
  
  personality: Personality;
  color: string;
  perceptionRadius: number;
  speed: number;

  private originalTargetColor: { h: number, s: number, l: number };
  private targetColor: { h: number, s: number, l: number };
  private currentColor: { h: number, s: number, l: number };
  
  isEnraged: boolean = false;
  private enragedUntil: number = 0;
  
  isHyperRaged: boolean = false;
  private hyperRagedUntil: number = 0;
  
  collisionCount: number = 0;

  // Personality-specific state
  private wanderAngle: number = Math.random() * Math.PI * 2;
  private lonerState: LonerState = 'seeking';
  private twin: Circle | null = null;
  private hasTwinned: boolean = false;

  constructor(x: number, y: number, personality?: Personality) {
    this.x = x;
    this.y = y;
    this.baseRadius = Math.random() * 2 + 1;
    this.radius = this.baseRadius;
    this.mass = this.baseRadius * 0.5;

    const personalities: Personality[] = ['playful', 'shy', 'loner', 'social'];
    this.personality = personality || personalities[Math.floor(Math.random() * personalities.length)];

    switch (this.personality) {
      case 'playful':
        this.targetColor = { h: 50, s: 100, l: 60 }; // Vibrant Yellow
        break;
      case 'shy':
        this.targetColor = { h: 180, s: 80, l: 70 }; // Pale Cyan
        break;
      case 'loner':
        this.targetColor = { h: 260, s: 80, l: 40 }; // Deep Purple
        break;
      case 'social':
        this.targetColor = { h: 140, s: 80, l: 50 }; // Warm Green
        break;
    }
    this.originalTargetColor = { ...this.targetColor };
    this.currentColor = { ...this.targetColor };
    this.color = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${this.currentColor.l}%)`;

    this.perceptionRadius = 100; // Simplified
    this.speed = Math.random() * 0.5 + 0.5;
    this.dx = (Math.random() - 0.5) * this.speed;
    this.dy = (Math.random() - 0.5) * this.speed;
  }
  
  hyperRage() {
    this.isHyperRaged = true;
    this.hyperRagedUntil = Date.now() + 3000; // 3 seconds total
  }

  setTwin(twin: Circle) {
    this.twin = twin;
    this.lonerState = 'paired';
    this.hasTwinned = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  
  enrage(clickX: number, clickY: number) {
    if (this.isEnraged || this.isHyperRaged) return;
    this.isEnraged = true;
    this.enragedUntil = Date.now() + 5000;
    
    const angle = Math.atan2(this.y - clickY, this.x - clickX);
    const force = 15;
    this.dx = Math.cos(angle) * force;
    this.dy = Math.sin(angle) * force;
    
    this.targetColor = { h: 0, s: 100, l: 55 };
  }

  update(canvas: HTMLCanvasElement, mouse: { x: number, y: number, isIdle: boolean }, otherCircles: Circle[]): (Circle[] | StardustParticle[])[] | void {
    let newParticles: StardustParticle[] = [];

    if (this.isHyperRaged) {
      const timeLeft = this.hyperRagedUntil - Date.now();
      if (timeLeft <= 0) {
        this.isHyperRaged = false;
        this.targetColor = { ...this.originalTargetColor };
      } else {
        const totalDuration = 3000;
        const decayProgress = Math.max(0, timeLeft / totalDuration); // Starts at 1.0, ends at 0.0

        this.dx += (Math.random() - 0.5) * 4 * decayProgress;
        this.dy += (Math.random() - 0.5) * 4 * decayProgress;
        this.radius = this.baseRadius + (this.baseRadius * 0.8 * decayProgress);

        if (Math.random() < decayProgress) {
          newParticles.push(new StardustParticle(this.x, this.y));
          if (Math.random() > 0.5 && Math.random() < decayProgress) {
            newParticles.push(new StardustParticle(this.x, this.y));
          }
        }

        const hyperRageColor = { h: 320, s: 100, l: 65 };
        this.targetColor.h = this.originalTargetColor.h + (hyperRageColor.h - this.originalTargetColor.h) * decayProgress;
        this.targetColor.s = this.originalTargetColor.s + (hyperRageColor.s - this.originalTargetColor.s) * decayProgress;
        this.targetColor.l = this.originalTargetColor.l + (hyperRageColor.l - this.originalTargetColor.l) * decayProgress;
      }
    } else if (this.isEnraged) {
      const timeLeft = this.enragedUntil - Date.now();
      if (timeLeft <= 0) {
        this.isEnraged = false;
        this.targetColor = { ...this.originalTargetColor };
      } else {
        const totalDuration = 5000;
        const decayProgress = Math.max(0, timeLeft / totalDuration);

        this.dx += (Math.random() - 0.5) * 2 * decayProgress;
        this.radius = this.baseRadius + (this.baseRadius * 0.5 * decayProgress);

        const enrageColor = { h: 0, s: 100, l: 55 };
        this.targetColor.h = this.originalTargetColor.h + (enrageColor.h - this.originalTargetColor.h) * decayProgress;
        this.targetColor.s = this.originalTargetColor.s + (enrageColor.s - this.originalTargetColor.s) * decayProgress;
        this.targetColor.l = this.originalTargetColor.l + (enrageColor.l - this.originalTargetColor.l) * decayProgress;
      }
    } else {
      const newBorns = this.applyPersonality(otherCircles);
      if (newBorns) return [newBorns, newParticles];

      this.handleMouse(mouse);
    }
    
    this.currentColor.h += (this.targetColor.h - this.currentColor.h) * 0.1;
    this.currentColor.s += (this.targetColor.s - this.currentColor.s) * 0.1;
    this.currentColor.l += (this.targetColor.l - this.currentColor.l) * 0.1;
    this.color = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${this.currentColor.l}%)`;
    
    // Boundary collision
    if (this.x + this.radius > canvas.width) { this.x = canvas.width - this.radius; this.dx *= -0.9; }
    else if (this.x - this.radius < 0) { this.x = this.radius; this.dx *= -0.9; }
    if (this.y + this.radius > canvas.height) { this.y = canvas.height - this.radius; this.dy *= -0.9; }
    else if (this.y - this.radius < 0) { this.y = this.radius; this.dy *= -0.9; }

    // Apply friction/drag & max speed
    this.dx *= 0.98; this.dy *= 0.98;
    const currentSpeed = Math.hypot(this.dx, this.dy);
    const maxSpeed = this.isHyperRaged ? 25 : (this.isEnraged ? 20 : this.speed * 2);
    if (currentSpeed > maxSpeed) { this.dx = (this.dx / currentSpeed) * maxSpeed; this.dy = (this.dy / currentSpeed) * maxSpeed; }

    this.x += this.dx; this.y += this.dy;

    // Pulsing effect
    this.angle += 0.05;
    if(!this.isEnraged && !this.isHyperRaged) {
      this.radius = this.baseRadius + Math.sin(this.angle) * 0.5;
    }

    if (newParticles.length > 0) return [[], newParticles];
  }

  applyPersonality(otherCircles: Circle[]): Circle[] | void {
    if (this.isHyperRaged) return; // No personality when hyper-raged
    // ... (rest of personality logic is the same)
    if (this.personality === 'loner' && this.lonerState === 'paired' && this.twin) {
        this.targetColor.l = 65;
        const idealDist = 40;
        const distToTwin = Math.hypot(this.x - this.twin.x, this.y - this.twin.y);
        const angleToTwin = Math.atan2(this.y - this.twin.y, this.x - this.twin.x);
        const springForce = (idealDist - distToTwin) * 0.01;
        this.dx -= Math.cos(angleToTwin) * springForce;
        this.dy -= Math.sin(angleToTwin) * springForce;
        const orbitalForce = 0.2;
        this.dx += Math.cos(angleToTwin + Math.PI / 2) * orbitalForce;
        this.dy += Math.sin(angleToTwin + Math.PI / 2) * orbitalForce;
        return;
    }
    if (this.personality === 'shy') {
        this.wanderAngle += (Math.random() - 0.5) * 0.3;
        this.dx += Math.cos(this.wanderAngle) * 0.05;
        this.dy += Math.sin(this.wanderAngle) * 0.05;
    }
    let nearbyCircles = 0, avgX = 0, avgY = 0;
    for (const other of otherCircles) {
      if (other === this || other.isEnraged || other.isHyperRaged) continue;
      const distance = Math.hypot(this.x - other.x, this.y - other.y);
      if (distance < this.perceptionRadius) {
        if (this.personality === 'loner' && !this.hasTwinned && this.lonerState === 'seeking' && other.personality === 'loner' && !other.hasTwinned && other.lonerState === 'seeking' && distance < 30) {
            this.setTwin(other); other.setTwin(this);
            const twin1 = new Circle(this.x + 10, this.y, 'loner');
            const twin2 = new Circle(this.x - 10, this.y, 'loner');
            twin1.setTwin(twin2); twin2.setTwin(twin1);
            return [twin1, twin2];
        }
        nearbyCircles++; avgX += other.x; avgY += other.y;
        const angle = Math.atan2(this.y - other.y, this.x - other.x);
        switch (this.personality) {
          case 'shy': this.dx += Math.cos(angle) * 0.1; this.dy += Math.sin(angle) * 0.1; this.targetColor.l = 90; break;
          case 'playful': this.dx -= Math.cos(angle) * 0.05; this.dy -= Math.sin(angle) * 0.05; this.targetColor.l = 75; break;
        }
      }
    }
    if (nearbyCircles > 0) {
      avgX /= nearbyCircles; avgY /= nearbyCircles;
      const angleToCenter = Math.atan2(this.y - avgY, this.x - avgX);
      switch (this.personality) {
        case 'social': this.dx -= Math.cos(angleToCenter) * 0.03; this.dy -= Math.sin(angleToCenter) * 0.03; break;
        case 'loner': if(this.lonerState === 'seeking'){ this.dx += Math.cos(angleToCenter) * 0.04; this.dy += Math.sin(angleToCenter) * 0.04; } break;
      }
    }
  }
  
  handleMouse(mouse: { x: number, y: number, isIdle: boolean }) {
    if ((this.personality === 'loner' && this.lonerState === 'paired') || this.isHyperRaged) return;
    const mouseDistance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
    const interactionRadius = 150;
    if (mouseDistance < interactionRadius) {
      const force = (interactionRadius - mouseDistance) / interactionRadius;
      const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
      if (mouse.isIdle) {
        const orbitalForce = 0.3;
        this.dx += Math.cos(angle + Math.PI / 2) * orbitalForce * force;
        this.dy += Math.sin(angle + Math.PI / 2) * orbitalForce * force;
        this.dx -= Math.cos(angle) * orbitalForce * force * 0.2;
        this.dy -= Math.sin(angle) * orbitalForce * force * 0.2;
      } else {
        this.dx += Math.cos(angle) * force * 2;
        this.dy += Math.sin(angle) * force * 2;
      }
    }
  }
}

const CircleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const MAX_CIRCLES = 400;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    let circles: Circle[] = [];
    let waveEffects: WaveEffect[] = [];
    let lineEffects: LineEffect[] = [];
    let stardust: StardustParticle[] = [];
    let respawnQueue: { personality: Personality, respawnTime: number }[] = [];
    const mouse = { x: -1000, y: -1000, isIdle: false };
    let idleTimeout: number;

    const cornerCooldowns = { tl: 0, tr: 0, bl: 0, br: 0 };
    const cornerDetectionRadius = 50;
    const lowVelocityThreshold = 0.5;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX; mouse.y = event.clientY; mouse.isIdle = false;
      clearTimeout(idleTimeout); idleTimeout = window.setTimeout(() => { mouse.isIdle = true; }, 150);
    };
    const handleClick = (event: MouseEvent) => {
        waveEffects.push(new WaveEffect(event.clientX, event.clientY, 150, `rgba(173, 216, 230, \${opacity})`));
        circles.forEach(circle => { if(Math.hypot(circle.x - event.clientX, circle.y - event.clientY) < 150) circle.enrage(event.clientX, event.clientY); });
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    resizeCanvas();

    function init() {
      circles = [];
      const numberOfCircles = Math.min(MAX_CIRCLES, (canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numberOfCircles; i++) {
        circles.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };
    
    function handleCollisions() {
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const c1 = circles[i]; const c2 = circles[j];
          const dist = Math.hypot(c1.x - c2.x, c1.y - c2.y);
          if (dist < c1.radius + c2.radius) {
            c1.collisionCount++; c2.collisionCount++;
            const angle = Math.atan2(c2.y - c1.y, c2.x - c1.x);
            const collisionPointX = (c1.x * c2.radius + c2.x * c1.radius) / (c1.radius + c2.radius);
            const collisionPointY = (c1.y * c2.radius + c2.y * c1.radius) / (c1.radius + c2.radius);
            lineEffects.push(new LineEffect(collisionPointX, collisionPointY, angle + Math.PI / 2));
            const overlap = c1.radius + c2.radius - dist;
            c1.x -= overlap * Math.cos(angle) * (c2.mass / (c1.mass + c2.mass));
            c1.y -= overlap * Math.sin(angle) * (c2.mass / (c1.mass + c2.mass));
            c2.x += overlap * Math.cos(angle) * (c1.mass / (c1.mass + c2.mass));
            c2.y += overlap * Math.sin(angle) * (c1.mass / (c1.mass + c2.mass));
            const v1 = { x: c1.dx, y: c1.dy }; const v2 = { x: c2.dx, y: c2.dy };
            const m1 = c1.mass; const m2 = c2.mass;
            const nx = (c2.x - c1.x) / dist; const ny = (c2.y - c1.y) / dist;
            const p = 3 * (v1.x * nx + v1.y * ny - v2.x * nx - v2.y * ny) / (m1 + m2);
            c1.dx -= p * m2 * nx; c1.dy -= p * m2 * ny;
            c2.dx += p * m1 * nx; c2.dy += p * m1 * ny;
          }
        }
      }
    }
    
    function checkExplosionsAndRespawn() {
      const now = Date.now();
      // Check for explosions
      for (let i = circles.length - 1; i >= 0; i--) {
        const c = circles[i];
        if (c.collisionCount > 100) {
          waveEffects.push(new WaveEffect(c.x, c.y, 200, `rgba(255, 255, 180, \${opacity})`));
          respawnQueue.push({ personality: c.personality, respawnTime: now + 10000 });
          
          // Affect surrounding orbs
          const explosionRadius = 200;
          for (const other of circles) {
            if (c === other) continue;
            if (Math.hypot(c.x - other.x, c.y - other.y) < explosionRadius) {
              other.hyperRage();
            }
          }
          circles.splice(i, 1);
        }
      }
      
      // Check for respawns
      for (let i = respawnQueue.length - 1; i >= 0; i--) {
        if (now > respawnQueue[i].respawnTime && circles.length < MAX_CIRCLES) {
          circles.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height, respawnQueue[i].personality));
          respawnQueue.splice(i, 1);
        }
      }
    }

    function animate() {
      animationFrameId.current = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(10, 10, 22, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      [waveEffects, lineEffects, stardust].forEach(arr => {
        for (let i = arr.length - 1; i >= 0; i--) {
          arr[i].update(); arr[i].draw(ctx);
          if (arr[i].life <= 0) arr.splice(i, 1);
        }
      });

      const newBorns: Circle[] = [];
      circles.forEach(circle => {
        const result = circle.update(canvas, mouse, circles);
        if (result) {
          const [babies, particles] = result as [Circle[], StardustParticle[]];
          if (babies && babies.length > 0 && circles.length + newBorns.length < MAX_CIRCLES) newBorns.push(...babies);
          if (particles && particles.length > 0) stardust.push(...particles);
        }
      });
      if (newBorns.length > 0) circles.push(...newBorns);
      
      handleCollisions();
      checkExplosionsAndRespawn();

      circles.forEach(circle => circle.draw(ctx));
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      clearTimeout(idleTimeout);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 bg-[#0a0a16]" />;
};

export default CircleCanvas;
