"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  currentSize: number;
  baseOpacity: number;
  currentOpacity: number;
  hue: number;
}

interface AnimatedParticlesProps {
  particleCount?: number;
  mouseInteractionRadius?: number;
  className?: string;
}

export function AnimatedParticles({
  particleCount = 80,
  mouseInteractionRadius = 150,
  className = "",
}: AnimatedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Criar partículas
    const createParticles = (): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.2; // Velocidade inicial mais perceptível
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseSize: 1 + Math.random() * 2,
          currentSize: 1 + Math.random() * 2,
          baseOpacity: 0.3 + Math.random() * 0.1,
          currentOpacity: 0.3 + Math.random() * 0.1,
          hue: 260 + Math.random() * 40,
        });
      }
      return particles;
    };

    // Configurar canvas
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        // Recriar partículas quando redimensionar
        if (particlesRef.current.length === 0) {
          particlesRef.current = createParticles();
        }
      }
    };

    resizeCanvas();
    particlesRef.current = createParticles();
    window.addEventListener("resize", resizeCanvas);

    // Calcular distância
    const distance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    // Animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        let targetSize = particle.baseSize;
        let targetOpacity = particle.baseOpacity;

        // Interação com mouse - unir delicadamente
        const dist = distance(particle.x, particle.y, mouseRef.current.x, mouseRef.current.y);
        const maxDistance = mouseInteractionRadius;
        const isMouseNearby = dist < maxDistance && mouseRef.current.x > 0;

        if (isMouseNearby) {
          const force = (maxDistance - dist) / maxDistance;
          
          // Efeitos visuais delicados
          targetSize = particle.baseSize * (1 + force * 0.8);
          targetOpacity = Math.min(0.6, particle.baseOpacity + force * 0.25);
          
          // Movimento suave e orgânico ao redor do mouse (orbital + atração)
          const angle = Math.atan2(
            mouseRef.current.y - particle.y,
            mouseRef.current.x - particle.x
          );
          
          // Força de atração muito suave para movimento delicado
          const attractionStrength = force * 0.06;
          
          // Adicionar componente orbital (tangencial) para movimento circular suave
          const orbitalAngle = angle + Math.PI / 2; // Perpendicular ao raio
          const orbitalStrength = force * 0.03; // Movimento circular suave
          
          // Combinar atração e movimento orbital para movimento suave ao redor do mouse
          particle.vx += Math.cos(angle) * attractionStrength + Math.cos(orbitalAngle) * orbitalStrength;
          particle.vy += Math.sin(angle) * attractionStrength + Math.sin(orbitalAngle) * orbitalStrength;
          
          // Amortecimento suave quando no hover
          particle.vx *= 0.98;
          particle.vy *= 0.98;
        } else {
          // Quando não está no hover, espalhar as partículas pela tela
          // Adicionar movimento aleatório contínuo e orgânico para espalhamento
          const randomForce = 0.02;
          particle.vx += (Math.random() - 0.5) * randomForce;
          particle.vy += (Math.random() - 0.5) * randomForce;
          
          // Garantir velocidade mínima para movimento contínuo
          const minSpeed = 0.05;
          const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (currentSpeed < minSpeed) {
            const angle = Math.random() * Math.PI * 2;
            particle.vx = Math.cos(angle) * minSpeed;
            particle.vy = Math.sin(angle) * minSpeed;
          }
          
          // Amortecimento muito leve para manter movimento natural
          particle.vx *= 0.995;
          particle.vy *= 0.995;
        }

        // Suavizar transições - muito suave para animação delicada
        particle.currentSize += (targetSize - particle.currentSize) * 0.05;
        particle.currentOpacity += (targetOpacity - particle.currentOpacity) * 0.05;

        // Movimento natural das partículas
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Desenhar partícula
        const size = particle.currentSize;
        const opacity = particle.currentOpacity;
        const isHovered = size > particle.baseSize * 1.1;
        const glowSize = isHovered ? size * 1.5 : 0;

        // Glow delicado
        if (glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowSize
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 75%, ${opacity * 0.15})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 75%, ${opacity * 0.05})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 75%, 0)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(
            particle.x - glowSize,
            particle.y - glowSize,
            glowSize * 2,
            glowSize * 2
          );
        }

        // Partícula principal
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 75%, ${opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Adicionar eventos
    const heroSection = canvas.closest('section');
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove, { passive: true });
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Iniciar animação
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      const heroSection = canvas.closest('section');
      if (heroSection) {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, mouseInteractionRadius]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={{ pointerEvents: 'none' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: 'auto' }}
      />
    </div>
  );
}
