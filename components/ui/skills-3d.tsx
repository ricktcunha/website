"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Object3D } from "three";
import { Float } from "@react-three/drei";

function MinimalParticles() {
  const meshRef = useRef<InstancedMesh>(null);
  const count = 30; // Fewer particles for minimalism
  const dummy = useMemo(() => new Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5,
        speed: 0.2 + Math.random() * 0.2,
        factor: 0.5 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      // Gentle floating motion
      dummy.position.set(
        particle.x,
        particle.y + Math.sin(time * particle.speed + particle.x) * 0.5,
        particle.z
      );
      
      // Subtle rotation
      dummy.rotation.x = time * 0.1 * particle.factor;
      dummy.rotation.y = time * 0.1 * particle.factor;
      
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        {/* Very simple geometry: Tetrahedrons look modern/sharp */}
        <tetrahedronGeometry args={[0.15, 0]} /> 
        <meshBasicMaterial 
            color="#e4e4e7" // Zinc-200 (Light Grey/White)
            transparent 
            opacity={0.2} // Very faint
            wireframe={true} // Just outlines
        />
      </instancedMesh>
    </Float>
  );
}

export function Skills3D() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-60">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <MinimalParticles />
      </Canvas>
    </div>
  );
}
