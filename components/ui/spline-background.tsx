"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SplineBackgroundProps {
  url?: string;
  className?: string;
  containerClassName?: string;
}

export function SplineBackground({
  url = "https://my.spline.design/3dgradient-AcpgG6LxFkpnJSoowRHPfcbO",
  className,
  containerClassName,
}: SplineBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", handleLoad);
      return () => {
        if (iframeRef.current) {
          iframeRef.current.removeEventListener("load", handleLoad);
        }
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full z-0 pointer-events-none",
        containerClassName
      )}
    >
      <iframe
        ref={iframeRef}
        src={url}
        frameBorder="0"
        width="100%"
        height="100%"
        className={cn(
          "absolute inset-0 w-full h-full border-none opacity-0 transition-opacity duration-1000",
          isLoaded && "opacity-100",
          className
        )}
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
        allow="fullscreen"
        loading="eager"
        title="Spline 3D Background"
      />
      
      {/* Overlay escuro opcional para melhorar legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60 pointer-events-none" />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

