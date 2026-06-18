import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

type ArmorConstructProps = {
  onArcHover: (hovered: boolean) => void;
  revealed: boolean;
};

export function ArmorConstruct({ onArcHover, revealed }: ArmorConstructProps) {
  const groupRef = useRef<THREE.Group>(null);
  const helmetRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [arcHovered, setArcHovered] = useState(false);
  const ringScale = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (helmetRef.current) {
      const target = revealed ? -0.6 : 0;
      helmetRef.current.rotation.x = THREE.MathUtils.lerp(
        helmetRef.current.rotation.x,
        target,
        delta * 3,
      );
      helmetRef.current.position.y = THREE.MathUtils.lerp(
        helmetRef.current.position.y,
        revealed ? 0.8 : 0,
        delta * 3,
      );
    }
    if (ringRef.current) {
      const targetScale = arcHovered || revealed ? 1 : 0;
      ringScale.current = THREE.MathUtils.lerp(ringScale.current, targetScale, delta * 5);
      ringRef.current.scale.setScalar(ringScale.current);
      ringRef.current.rotation.z += delta * 2;
    }
  });

  const handleArcPointer = (hovered: boolean) => {
    setArcHovered(hovered);
    onArcHover(hovered);
  };

  const armorMaterial = (
    <meshStandardMaterial
      color="#c0c8d4"
      metalness={0.95}
      roughness={0.15}
      envMapIntensity={1.5}
    />
  );

  const darkArmor = (
    <meshStandardMaterial color="#2a3540" metalness={0.9} roughness={0.2} />
  );

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
        {/* Shoulder pauldron */}
        <mesh position={[-1.2, 0.8, 0]} rotation={[0, 0, 0.3]}>
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI]} />
          {armorMaterial}
        </mesh>

        {/* Upper arm */}
        <mesh position={[-1.5, 0.1, 0.1]} rotation={[0.2, 0, 0.5]}>
          <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
          {armorMaterial}
        </mesh>

        {/* Forearm */}
        <mesh position={[-1.8, -0.8, 0.2]} rotation={[0.4, 0, 0.3]}>
          <capsuleGeometry args={[0.28, 1, 8, 16]} />
          {darkArmor}
        </mesh>

        {/* Chest plate */}
        <mesh position={[0, 0.3, 0.2]}>
          <boxGeometry args={[1.4, 1.6, 0.5]} />
          {armorMaterial}
        </mesh>

        {/* Chest detail lines */}
        <mesh position={[0, 0.5, 0.46]}>
          <boxGeometry args={[0.8, 0.04, 0.02]} />
          <meshStandardMaterial color="#00d4ff" emissive="#004466" metalness={1} roughness={0.1} />
        </mesh>

        {/* Arc Reactor housing */}
        <group position={[0, 0.2, 0.5]}>
          <mesh
            onPointerEnter={() => handleArcPointer(true)}
            onPointerLeave={() => handleArcPointer(false)}
          >
            <torusGeometry args={[0.35, 0.08, 16, 32]} />
            <meshStandardMaterial color="#8899aa" metalness={1} roughness={0.1} />
          </mesh>
          <mesh>
            <circleGeometry args={[0.28, 32]} />
            <MeshDistortMaterial
              color="#00e5ff"
              emissive="#00aacc"
              emissiveIntensity={arcHovered || revealed ? 3 : 1}
              metalness={0.8}
              roughness={0.1}
              distort={0.2}
              speed={2}
            />
          </mesh>
          <mesh ref={ringRef} position={[0, 0, 0.05]}>
            <ringGeometry args={[0.4, 0.55, 64]} />
            <meshBasicMaterial color="#00ffcc" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <pointLight
            color="#00e5ff"
            intensity={arcHovered || revealed ? 4 : 1.5}
            distance={5}
          />
        </group>

        {/* Helmet / faceplate */}
        <group ref={helmetRef} position={[0, 1.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            {armorMaterial}
          </mesh>
          <mesh position={[0, -0.05, 0.35]}>
            <boxGeometry args={[0.7, 0.25, 0.1]} />
            <meshStandardMaterial
              color="#1a2530"
              metalness={0.95}
              roughness={0.1}
              emissive={revealed ? '#002244' : '#000000'}
            />
          </mesh>
          {/* Eye slits */}
          <mesh position={[-0.15, 0.05, 0.42]}>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshBasicMaterial color={revealed ? '#00ffcc' : '#00aaff'} />
          </mesh>
          <mesh position={[0.15, 0.05, 0.42]}>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshBasicMaterial color={revealed ? '#00ffcc' : '#00aaff'} />
          </mesh>
        </group>

        {/* Hand */}
        <mesh position={[-2.2, -1.5, 0.3]}>
          <boxGeometry args={[0.35, 0.5, 0.25]} />
          {darkArmor}
        </mesh>
      </group>
    </Float>
  );
}
