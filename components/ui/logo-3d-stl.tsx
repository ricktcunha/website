"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera,
  Float,
  MeshTransmissionMaterial,
  Environment
} from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// ============================================
// HELPER: Carregar STL
// ============================================
function STLModel({ url, ...props }: { url: string; [key: string]: any }) {
  const geometry = useLoader(STLLoader, url);
  
  // STLLoader já retorna BufferGeometry
  const bufferGeometry = geometry instanceof THREE.BufferGeometry 
    ? geometry 
    : geometry;
  
  // Calcular normais se não existirem
  if (!bufferGeometry.attributes.normal) {
    bufferGeometry.computeVertexNormals();
  }
  
  // Calcular bounding box para centralizar o modelo
  bufferGeometry.computeBoundingBox();
  const box = bufferGeometry.boundingBox!;
  const center = new THREE.Vector3();
  box.getCenter(center);
  bufferGeometry.translate(-center.x, -center.y, -center.z);
  
  // Calcular escala para normalizar tamanho
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 1 / maxDim : 1;
  
  // ⬅️ AUMENTAR AQUI: mude o 5.5 para 6, 7, 8, etc para aumentar o modelo 3D
  return (
    <mesh 
      geometry={bufferGeometry} 
      scale={scale * 5.5}
      {...props}
    >
      <MeshTransmissionMaterial
        transmission={1.0}
        roughness={0.0}
        thickness={2.5}
        ior={1.8}
        chromaticAberration={0.5}
        anisotropicBlur={0.5}
        distortion={0.1}
        distortionScale={0.5}
        temporalDistortion={0.1}
        envMapIntensity={2.0}
        color="#0a0a0a"
        background={new THREE.Color("#000000")}
        side={THREE.DoubleSide}
        backside={true}
      />
    </mesh>
  );
}

// ============================================
// COMPONENTE: Logo 3D Scene
// ============================================
function Logo3DScene({ 
  autoRotate = true, 
  rotationSpeed = 0.5,
  envMapTint = new THREE.Color(1, 1, 1)
}: {
  autoRotate?: boolean;
  rotationSpeed?: number;
  envMapTint?: THREE.Color;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed * 0.1;
    }
  });
  
  return (
    <>
      {/* ⬅️ AUMENTAR AQUI: diminua o 3 para 2.5 para aproximar mais */}
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={90} />
      <Environment
        preset="city"
        resolution={256}
        environmentIntensity={2}
      />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, 10]} intensity={1.5} color="#8888ff" />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={1} color={envMapTint} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
      
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={meshRef}>
          <Suspense fallback={null}>
            <STLModel url="/rick-logo-vertical.stl" />
          </Suspense>
        </group>
      </Float>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed}
      />
    </>
  );
}

// ============================================
// COMPONENTE: Logo 3D Principal
// ============================================
interface Logo3DSTLProps {
  /** Tamanho do logo */
  size?: "small" | "medium" | "large" | "auto";
  /** Habilita rotação automática */
  autoRotate?: boolean;
  /** Velocidade de rotação */
  rotationSpeed?: number;
  /** Habilita interação com mouse */
  interactive?: boolean;
  /** Fallback para mobile */
  fallbackOnMobile?: boolean;
  /** URL da imagem de fallback */
  fallbackImage?: string;
}

export function Logo3DSTL({
  size = "auto",
  autoRotate = true,
  rotationSpeed = 0.5,
  interactive = true,
  fallbackOnMobile = true,
  fallbackImage = "/images/assets/logos/rick-logo.svg",
}: Logo3DSTLProps) {
  const [shouldUseFallback, setShouldUseFallback] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
    
    if (fallbackOnMobile && typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (isMobile || prefersReducedMotion) {
        setShouldUseFallback(true);
      }
    }
  }, [fallbackOnMobile]);
  
  // Fallback: usar imagem estática
  if (shouldUseFallback || !isClient) {
    const sizeClasses = {
      small: "w-32 h-32",
      medium: "w-64 h-64",
      large: "w-96 h-96",
      // ⬅️ AUMENTAR AQUI (fallback): mude w-[900px] para w-[1000px], etc
      auto: "w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px] 2xl:w-[1000px] 2xl:h-[1000px]",
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
  
  // Ler cor primária do design system
  const getCSSVariable = (varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback;
  };
  
  const primaryColor = getCSSVariable("--color-primary", "hsl(265, 89%, 78%)");
  const envMapTint = new THREE.Color(primaryColor);
  
  const sizeStyles = {
    small: { width: 256, height: 256 },
    medium: { width: 512, height: 512 },
    large: { width: 768, height: 768 },
    auto: {},
  };
  
  const containerStyles = size === "auto" 
    ? { width: "100%", height: "100%" }
    : sizeStyles[size];
  
  return (
    <div
      // ⬅️ AUMENTAR AQUI: mude os valores w-[900px] para w-[1000px], etc. (w = width/largura, h = height/altura)
      className={`relative flex items-center justify-center ${
        size === "auto" ? "w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px] 2xl:w-[1000px] 2xl:h-[1000px]" : ""
      }`}
      style={{
        ...containerStyles,
        minWidth: size === "auto" ? "500px" : undefined,
        minHeight: size === "auto" ? "500px" : undefined,
        overflow: "visible",
        clipPath: "none",
        maxWidth: "none",
        maxHeight: "none",
      }}
    >
      {/* ⬅️ AUMENTAR AQUI: igual ao de cima - diminua 3 para aproximar mais */}
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3], fov: 90 }}
        dpr={[1, 2]}
        style={{ 
          width: "100%", 
          height: "100%",
          overflow: "visible",
          clipPath: "none",
          maxWidth: "none",
          maxHeight: "none",
        }}
        onCreated={({ gl, scene, camera }) => {
          // Forçar remoção de clipping em todos os elementos
          const canvas = gl.domElement;
          if (canvas) {
            canvas.style.overflow = "visible";
            canvas.style.clipPath = "none";
            canvas.style.maxWidth = "none";
            canvas.style.maxHeight = "none";
            
            // Remover clipping de elementos pais recursivamente
            let parent = canvas.parentElement;
            while (parent) {
              parent.style.overflow = "visible";
              parent.style.clipPath = "none";
              parent.style.maxWidth = "none";
              parent.style.maxHeight = "none";
              parent = parent.parentElement;
            }
          }
        }}
      >
        <Suspense 
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#8b5cf6" opacity={0.3} transparent />
            </mesh>
          }
        >
          <Logo3DScene
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            envMapTint={envMapTint}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

