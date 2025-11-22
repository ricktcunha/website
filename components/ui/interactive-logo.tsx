"use client";

import React, { useEffect, useRef, useState } from "react";
import KUTE from "kute.js";

export function InteractiveLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const tweensRef = useRef<any[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    
    // Get all path elements
    const paths = svg.querySelectorAll('path');
    
    // Initial draw animation for all paths
    paths.forEach((path, index) => {
      const length = (path as SVGPathElement).getTotalLength();
      
      // Set initial state
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.stroke = index === 3 ? '#8d00da' : '#eee'; // Purple stroke for K
      path.style.strokeWidth = '0.5';
      
      // Animate drawing
      const drawTween = KUTE.to(path, {
        strokeDashoffset: 0,
      }, {
        duration: 2000,
        delay: index * 200,
        easing: 'easingCubicOut',
      });
      
      drawTween.start();
      
      // After draw, remove stroke
      setTimeout(() => {
        KUTE.to(path, {
          strokeWidth: 0,
        }, {
          duration: 500,
          easing: 'easingCubicOut',
        }).start();
      }, 2000 + (index * 200) + 500);
    });

    return () => {
      tweensRef.current.forEach(tween => tween && tween.stop && tween.stop());
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll('path');
    
    // Clear previous hover tweens
    tweensRef.current.forEach(tween => tween && tween.stop && tween.stop());
    tweensRef.current = [];

    if (isHovered) {
      // Pulse effect on hover
      paths.forEach((path, index) => {
        const pulseTween = KUTE.to(path, {
          opacity: 0.7,
        }, {
          duration: 600,
          easing: 'easingCubicInOut',
          yoyo: true,
          repeat: 1,
        });
        
        tweensRef.current.push(pulseTween);
        pulseTween.start();
      });

      // Scale up SVG
      const scaleTween = KUTE.to(svg, {
        svgTransform: {
          translate: [0, 0],
          scale: 1.1,
        }
      }, {
        duration: 400,
        easing: 'easingCubicOut',
      });
      
      tweensRef.current.push(scaleTween);
      scaleTween.start();
    } else {
      // Reset
      paths.forEach((path) => {
        const resetTween = KUTE.to(path, {
          opacity: 1,
        }, {
          duration: 400,
          easing: 'easingCubicOut',
        });
        
        tweensRef.current.push(resetTween);
        resetTween.start();
      });

      const resetScaleTween = KUTE.to(svg, {
        svgTransform: {
          translate: [0, 0],
          scale: 1,
        }
      }, {
        duration: 400,
        easing: 'easingCubicOut',
      });
      
      tweensRef.current.push(resetScaleTween);
      resetScaleTween.start();
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group"
    >
      {/* Glow Background */}
      <div
        className="absolute inset-0 -m-12 bg-purple-500/30 blur-[80px] rounded-full transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.4 : 0 }}
      />

      {/* SVG Logo */}
      <div className="relative">
        <svg
          ref={svgRef}
          width="280"
          height="280"
          viewBox="0 0 67.55 67.88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="gradient-k" x1="37.74" y1="51.56" x2="52.97" y2="51.56" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f1f1f1"/>
              <stop offset=".66" stopColor="#b3b3b2"/>
            </linearGradient>

            <filter id="glow-kute">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* R */}
          <path
            d="M32.01.61v6.74c0,.33-.27.61-.61.61h-10.36c-.64,0-1.16.52-1.16,1.16v21.46c0,.33-.27.61-.61.61h-6.74c-.34,0-.61-.27-.61-.61V8.55c0-.33.27-.61.61-.61h6.64c.44,0,.83-.24,1.04-.62L23.92.32c.1-.2.31-.32.54-.32h6.94c.34,0,.61.27.61.61Z"
            fill="#eee"
          />

          {/* I */}
          <path
            d="M38.31,0h6.79c.32,0,.58.26.58.58v30.01c0,.32-.26.58-.58.58h-6.79c-.32,0-.58-.26-.58-.58V.58c0-.32.26-.58.58-.58Z"
            fill="#eee"
          />

          {/* C */}
          <path
            d="M32.63,55.86c-1.5,7.03-7.83,12.02-15.88,12.02-9.53,0-16.75-7.03-16.75-16.32s7.21-16.32,16.75-16.32c8.03,0,14.35,4.97,15.87,11.98.08.38-.21.73-.59.73h-7.28c-.24,0-.47-.15-.56-.37-1.15-2.79-3.99-4.64-7.45-4.64-4.72,0-8.54,3.9-8.54,8.62s3.67,8.62,8.56,8.62c3.46,0,6.3-1.86,7.45-4.66.09-.21.3-.35.53-.35h7.35c.36,0,.64.34.56.69Z"
            fill="#eee"
          />

          {/* K - Purple */}
          <path
            d="M66.92,67.15h-8.62c-.19,0-.38-.09-.49-.24l-3.91-5.08-.57-.74-4.15-5.38-.04-.05-4.1-5.22c-.19-.24-.17-.58.03-.8l.61-.67,5.01-5.45,6.82-7.34c.12-.13.28-.2.46-.2h8.31c.55,0,.83.65.45,1.05l-11.72,12.44c-.21.22-.23.57-.04.81l12.44,15.86c.32.41.03,1.01-.49,1.01Z"
            fill="#8d00da"
            filter="url(#glow-kute)"
          />

          {/* K - Gradient Bar */}
          <path
            d="M49.17,55.71l-3.33,3.5c-.11.11-.17.26-.17.42v6.92c0,.33-.27.61-.61.61h-6.73c-.33,0-.61-.27-.61-.61v-29.96c0-.33.27-.61.61-.61h6.73c.34,0,.61.27.61.61v12.38l-.61.67c-.21.22-.22.56-.03.8l4.1,5.22.04.05Z"
            fill="url(#gradient-k)"
          />
        </svg>

        {/* Floating Particles on Hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
