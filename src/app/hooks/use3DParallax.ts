"use client";

import { useEffect, useRef } from "react";

interface Use3DParallaxProps {
  layers: Array<{
    element: HTMLElement | null;
    depth: number; // 0 a 1 (0 = fundo, 1 = frente)
    intensity: number;
  }>;
}

export function use3DParallax({ layers }: Use3DParallaxProps) {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const animate = () => {
      // Lerp para suavidade (Linear interpolation)
      scrollY += (targetScrollY - scrollY) * 0.08;

      layers.forEach(({ element, depth, intensity }) => {
        if (!element) return;

        // Movimento parallax baseado na profundidade
        const yOffset = scrollY * depth * intensity * 0.5;
        const scale = 1 + scrollY * 0.0001 * depth;
        const rotate = scrollY * 0.005 * depth;

        // Usar transform3d para performance GPU
        element.style.transform = `
          translate3d(0, ${yOffset}px, ${depth * 50}px)
          scale(${scale})
          rotateX(${rotate}deg)
        `;

        // Opacidade baseada na posição (opcional)
        const opacity = 1 - scrollY * 0.0005 * depth;
        element.style.opacity = Math.max(0.5, opacity).toString();
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animate();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [layers]);
}
