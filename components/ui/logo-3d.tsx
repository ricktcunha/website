"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  useGLTF,
  Stage,
  Float,
  MeshTransmissionMaterial
} from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// ============================================
// DESIGN TOKENS - CSS Variables
// ============================================
// Estas variáveis devem ser injetadas no CSS global do site
// Use getComputedStyle para ler as variáveis em runtime
const getCSSVariable = (varName: string, fallback: string = "0") => {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim() || fallback;
};

// Helper para converter HEX para RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [1, 1, 1];
};

// ============================================
// INTERFACES E TIPOS
// ============================================
interface Logo3DProps {
  /** Profundidade da extrusão do logo (padrão: 1.5) */
  depth?: number;
  /** Transmissão do material (0-1, padrão: 0.9) */
  transmission?: number;
  /** Rugosidade do material (0-1, padrão: 0.1) */
  roughness?: number;
  /** Intensidade do bloom/glow (padrão: 0.6) */
  bloomIntensity?: number;
  /** Tint do envMap usando cor primária do site (padrão: true) */
  usePrimaryTint?: boolean;
  /** Habilita rotação automática (padrão: true) */
  autoRotate?: boolean;
  /** Velocidade de rotação (padrão: 0.5) */
  rotationSpeed?: number;
  /** Habilita interação com mouse (padrão: true) */
  interactive?: boolean;
  /** Preset visual: 'brand', 'soft', 'high-contrast' (padrão: 'brand') */
  preset?: "brand" | "soft" | "high-contrast";
  /** Habilita fallback para PNG em dispositivos móveis ou baixa performance */
  fallbackOnMobile?: boolean;
  /** URL do SVG do logo (padrão: usa o SVG inline) */
  logoSvg?: string;
  /** URL da imagem PNG de fallback */
  fallbackImage?: string;
  /** Tamanho do logo (padrão: 'auto') */
  size?: "small" | "medium" | "large" | "auto";
}

interface ExtrudedLogoMeshProps {
  depth: number;
  transmission: number;
  roughness: number;
  bloomIntensity: number;
  envMapTint: THREE.Color;
  preset: "brand" | "soft" | "high-contrast";
  autoRotate: boolean;
  rotationSpeed: number;
}

// ============================================
// SVG PATH DATA (do logo atual)
// ============================================
const LOGO_SVG_PATHS = [
  // R
  "M32.01.61v6.74c0,.33-.27.61-.61.61h-10.36c-.64,0-1.16.52-1.16,1.16v21.46c0,.33-.27.61-.61.61h-6.74c-.34,0-.61-.27-.61-.61V8.55c0-.33.27-.61.61-.61h6.64c.44,0,.83-.24,1.04-.62L23.92.32c.1-.2.31-.32.54-.32h6.94c.34,0,.61.27.61.61Z",
  // I
  "M38.31,0h6.79c.32,0,.58.26.58.58v30.01c0,.32-.26.58-.58.58h-6.79c-.32,0-.58-.26-.58-.58V.58c0-.32.26-.58.58-.58Z",
  // C
  "M32.63,55.86c-1.5,7.03-7.83,12.02-15.88,12.02-9.53,0-16.75-7.03-16.75-16.32s7.21-16.32,16.75-16.32c8.03,0,14.35,4.97,15.87,11.98.08.38-.21.73-.59.73h-7.28c-.24,0-.47-.15-.56-.37-1.15-2.79-3.99-4.64-7.45-4.64-4.72,0-8.54,3.9-8.54,8.62s3.67,8.62,8.56,8.62c3.46,0,6.3-1.86,7.45-4.66.09-.21.3-.35.53-.35h7.35c.36,0,.64.34.56.69Z",
  // K - Purple
  "M66.92,67.15h-8.62c-.19,0-.38-.09-.49-.24l-3.91-5.08-.57-.74-4.15-5.38-.04-.05-4.1-5.22c-.19-.24-.17-.58.03-.8l.61-.67,5.01-5.45,6.82-7.34c.12-.13.28-.2.46-.2h8.31c.55,0,.83.65.45,1.05l-11.72,12.44c-.21.22-.23.57-.04.81l12.44,15.86c.32.41.03,1.01-.49,1.01Z",
  // K - Gradient Bar
  "M49.17,55.71l-3.33,3.5c-.11.11-.17.26-.17.42v6.92c0,.33-.27.61-.61.61h-6.73c-.33,0-.61-.27-.61-.61v-29.96c0-.33.27-.61.61-.61h6.73c.34,0,.61.27.61.61v12.38l-.61.67c-.21.22-.22.56-.03.8l4.1,5.22.04.05Z",
];

// Cores do logo (R, I, C em cinza claro, K em roxo)
const LOGO_COLORS = ["#eee", "#eee", "#eee", "#8d00da", "#b3b3b2"];

// ============================================
// COMPONENTE: Extruded Logo Mesh
// ============================================
function ExtrudedLogoMesh({
  depth,
  transmission,
  roughness,
  bloomIntensity,
  envMapTint,
  preset,
  autoRotate,
  rotationSpeed,
}: ExtrudedLogoMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { gl, scene } = useThree();

  // Gerar geometrias extrudadas a partir dos paths SVG
  const [extrudedShapes, setExtrudedShapes] = useState<THREE.ExtrudeGeometry[]>([]);
  const [colors, setColors] = useState<THREE.Color[]>([]);

  useEffect(() => {
    const loader = new SVGLoader();
    const shapes: THREE.ExtrudeGeometry[] = [];
    const shapeColors: THREE.Color[] = [];

    // Criar um SVG completo com todos os paths de uma vez
    const allPaths = LOGO_SVG_PATHS.map((pathData, index) => {
      const color = LOGO_COLORS[index] || "#eee";
      return `<path d="${pathData}" fill="${color}" />`;
    }).join('\n');

    const svgString = `
      <svg viewBox="0 0 67.55 67.88" xmlns="http://www.w3.org/2000/svg">
        ${allPaths}
      </svg>
    `;

    try {
      // Parse SVG completo
      const svgData = loader.parse(svgString);
      
      // Processar cada path do SVG
      svgData.paths.forEach((path, pathIndex) => {
        try {
          // O método toShapes() está no path, não no subPath
          if (typeof path.toShapes === 'function') {
            const shapes2D = path.toShapes(true);
            
            shapes2D.forEach((shape) => {
              if (!shape) return;
              
              const extrudeSettings = {
                depth: depth,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 3,
              };

              try {
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                shapes.push(geometry);
                // Usar a cor do path correspondente
                const colorIndex = pathIndex < LOGO_COLORS.length ? pathIndex : 0;
                shapeColors.push(new THREE.Color(LOGO_COLORS[colorIndex] || "#eee"));
              } catch (geomError) {
                console.warn(`Erro ao criar geometria para path ${pathIndex}:`, geomError);
              }
            });
          } else {
            console.warn(`Path ${pathIndex} não tem método toShapes()`, path);
          }
        } catch (pathError) {
          console.warn(`Erro ao processar path ${pathIndex}:`, pathError);
        }
      });
    } catch (error) {
      console.error('Erro ao processar SVG:', error);
      // Em caso de erro, retornar array vazio para usar fallback
      return;
    }

    if (shapes.length > 0) {
      setExtrudedShapes(shapes);
      setColors(shapeColors);
    } else {
      console.warn('Nenhuma geometria foi criada a partir do SVG. O componente usará fallback.');
    }
  }, [depth]);

  // Animação de rotação
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed * 0.1;
    }
  });

  // Aplicar bloom via EffectComposer (será configurado no canvas)
  useEffect(() => {
    // A configuração de bloom será feita no componente principal
  }, [bloomIntensity]);

  // Presets de materiais
  const getMaterialProps = () => {
    const baseProps = {
      transmission,
      roughness,
      thickness: 1.5,
      ior: 1.5,
      chromaticAberration: 0.02,
      anisotropicBlur: 0.1,
      envMapIntensity: 1,
    };

    switch (preset) {
      case "soft":
        return {
          ...baseProps,
          transmission: 0.95,
          roughness: 0.2,
          envMapIntensity: 0.8,
        };
      case "high-contrast":
        return {
          ...baseProps,
          transmission: 0.7,
          roughness: 0.05,
          envMapIntensity: 1.5,
        };
      default: // "brand"
        return baseProps;
    }
  };

  // Se não conseguiu criar shapes, retornar um placeholder para debug
  if (extrudedShapes.length === 0) {
    console.warn("Logo3D: Nenhuma geometria foi criada. Verifique o SVGLoader.");
    // Retornar um placeholder visual em vez de null
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 0.5]} />
        <meshStandardMaterial color="#8d00da" opacity={0.5} transparent />
      </mesh>
    );
  }

  return (
    <group 
      ref={meshRef} 
      position={[0, 0, 0]}
      scale={0.8}
    >
      {extrudedShapes.map((geometry, index) => (
        <mesh 
          key={index} 
          geometry={geometry} 
          position={[0, 0, 0]}
        >
          <MeshTransmissionMaterial
            {...getMaterialProps()}
            color={colors[index] || "#eee"}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// COMPONENTE: Logo 3D Principal
// ============================================
export function Logo3D({
  depth = 1.5,
  transmission = 0.9,
  roughness = 0.1,
  bloomIntensity = 0.6,
  usePrimaryTint = true,
  autoRotate = true,
  rotationSpeed = 0.5,
  interactive = true,
  preset = "brand",
  fallbackOnMobile = true,
  logoSvg,
  fallbackImage = "/rick-logo.svg",
  size = "auto",
}: Logo3DProps) {
  const [shouldUseFallback, setShouldUseFallback] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Detectar mobile ou baixa performance
    if (fallbackOnMobile && typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasWeakGPU = !window.navigator.gpu;

      // Usar fallback em mobile, reduzido movimento ou GPU fraco
      if (isMobile || prefersReducedMotion || hasWeakGPU) {
        setShouldUseFallback(true);
      }
    }
  }, [fallbackOnMobile]);

  // Fallback: usar imagem estática apenas se realmente necessário
  if ((shouldUseFallback || !isClient) && fallbackOnMobile) {
    const sizeClasses = {
      small: "w-32 h-32",
      medium: "w-64 h-64",
      large: "w-96 h-96 lg:w-[768px] lg:h-[768px]",
      auto: "w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]",
    };

    return (
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <img
          src={fallbackImage}
          alt="Logo RICK"
          className="w-full h-full object-contain opacity-90"
          loading="eager"
        />
      </div>
    );
  }

  // Ler cores do design system via CSS variables
  const primaryColor = getCSSVariable("--color-primary", "hsl(265, 89%, 78%)");
  const accentColor = getCSSVariable("--color-accent", "hsl(265, 89%, 78%)");
  const envMapTint = usePrimaryTint
    ? new THREE.Color(primaryColor)
    : new THREE.Color(accentColor);

  const sizeClasses = {
    small: { width: 256, height: 256 },
    medium: { width: 512, height: 512 },
    large: { width: 768, height: 768 },
    auto: { width: "100%", height: "100%" },
  };

  const canvasSize = sizeClasses[size];

  // Para garantir que o logo apareça completamente, usar um container muito maior que o canvas
  const containerWidth = size === "large" ? "1500px" : size === "medium" ? "1000px" : size === "small" ? "500px" : "1500px";
  const containerHeight = size === "large" ? "1500px" : size === "medium" ? "1000px" : size === "small" ? "500px" : "1500px";
  const canvasWidth = size === "large" ? "1200px" : size === "medium" ? "800px" : size === "small" ? "400px" : "1200px";
  const canvasHeight = size === "large" ? "1200px" : size === "medium" ? "800px" : size === "small" ? "400px" : "1200px";

  return (
    <div
      className="relative"
      style={{
        overflow: "visible",
        zIndex: 30,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "none",
        isolation: "isolate",
        width: containerWidth,
        height: containerHeight,
        minWidth: containerWidth,
        minHeight: containerHeight,
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 18], fov: 75 }}
        dpr={[1, 2]}
        style={{ 
          width: canvasWidth, 
          height: canvasHeight,
          display: "block",
          overflow: "visible",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
          clipPath: "none",
          maxWidth: "none",
          maxHeight: "none",
        }}
        frameloop="always"
        onCreated={({ gl, scene, camera }) => {
          // Garantir que o canvas não tenha limitações de overflow
          const canvas = gl.domElement;
          canvas.style.overflow = "visible";
          canvas.style.position = "absolute";
          canvas.style.top = "50%";
          canvas.style.left = "50%";
          canvas.style.transform = "translate(-50%, -50%)";
          canvas.style.width = canvasWidth;
          canvas.style.height = canvasHeight;
          canvas.style.zIndex = "30";
          canvas.style.pointerEvents = "auto";
          canvas.style.clipPath = "none";
          canvas.style.maxWidth = "none";
          canvas.style.maxHeight = "none";
          // Remover qualquer limitação de clipping de todos os parents
          let parent = canvas.parentElement;
          let depth = 0;
          while (parent && depth < 10) {
            parent.style.overflow = "visible";
            parent.style.clipPath = "none";
            parent.style.maxWidth = "none";
            parent.style.maxHeight = "none";
            parent = parent.parentElement;
            depth++;
          }
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={75} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color={envMapTint} />

          {/* Environment Map removido temporariamente para evitar carregamento externo */}
          {/* Usando apenas as luzes configuradas acima */}

          {/* Float animation */}
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <ExtrudedLogoMesh
              depth={depth}
              transmission={transmission}
              roughness={roughness}
              bloomIntensity={bloomIntensity}
              envMapTint={envMapTint}
              preset={preset}
              autoRotate={autoRotate}
              rotationSpeed={rotationSpeed}
            />
          </Float>

          {/* Controles de órbita (opcional) */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={autoRotate}
              autoRotateSpeed={rotationSpeed}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

