"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Environment, MeshTransmissionMaterial, Float, Lightformer } from "@react-three/drei";

function LiquidCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  // We use a ref to track mouse position manually to avoid R3F event source issues with pointer-events: none
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse from -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smoothly rotate towards mouse
    // Increased multiplier for more noticeable movement
    const targetRotX = mouse.current.y * 0.5; 
    const targetRotY = mouse.current.x * 0.5;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 2);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 2);

    // Add a subtle "breathing" scale effect
    const time = state.clock.elapsedTime;
    const breathing = Math.sin(time * 0.5) * 0.05 + 1.8; // Base scale 1.8
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, breathing, delta));
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} scale={1.8}>
        {/* Complex Organic Shape using Icosahedron with high detail */}
        <icosahedronGeometry args={[1, 16]} /> 
        <MeshTransmissionMaterial 
            backside
            samples={4}
            resolution={1024} // Higher res for better reflections
            thickness={0.25}
            roughness={0.05} // Slightly smoother
            anisotropy={0.1}
            chromaticAberration={0.06}
            distortion={1} // High distortion for liquid feel
            distortionScale={0.6}
            temporalDistortion={0.15} // Faster internal movement
            color="#ffffff"
            bg="#000000"
        />
      </mesh>
    </Float>
  );
}

function BackgroundLights() {
    return (
        <group>
            <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#a78bfa" />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} color="#8b5cf6" />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color="#fff" />
        </group>
    )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-100 pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* No background color - let CSS gradient handle it if needed, keeps it transparent */}
        
        <Environment resolution={512}>
            <BackgroundLights />
        </Environment>

        <LiquidCrystal />
        
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
