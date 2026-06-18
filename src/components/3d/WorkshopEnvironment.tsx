import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GridFloor() {
  return (
    <gridHelper args={[40, 40, '#0a4a6e', '#062a40']} position={[0, -2, 0]} />
  );
}

function TSlotFrame() {
  const frameRef = useRef<THREE.Group>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8a9baa',
        metalness: 0.9,
        roughness: 0.3,
      }),
    [],
  );

  const beams = useMemo(() => {
    const positions: [number, number, number, number, number, number][] = [
      [-3, 0, -2, 6, 0.08, 0.08],
      [-3, 0, 2, 6, 0.08, 0.08],
      [-3, 0, -2, 0.08, 0.08, 4],
      [3, 0, -2, 0.08, 0.08, 4],
      [-3, 2, -2, 6, 0.08, 0.08],
      [-3, 2, 2, 6, 0.08, 0.08],
      [-3, 0, -2, 0.08, 2, 0.08],
      [3, 0, -2, 0.08, 2, 0.08],
      [-3, 0, 2, 0.08, 2, 0.08],
      [3, 0, 2, 0.08, 2, 0.08],
    ];
    return positions;
  }, []);

  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={frameRef} position={[4, -1, -6]}>
      {beams.map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x + w / 2 - 3, y + h / 2, z + d / 2 - 2]} material={material}>
          <boxGeometry args={[w, h, d]} />
        </mesh>
      ))}
    </group>
  );
}

function CircuitBoard() {
  const boardRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (boardRef.current) {
      boardRef.current.position.y = -1.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group position={[-5, -1.5, -4]} rotation={[-0.3, 0.4, 0]}>
      <mesh ref={boardRef}>
        <boxGeometry args={[2.5, 0.05, 1.8]} />
        <meshStandardMaterial color="#1a5c3a" metalness={0.2} roughness={0.8} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            0.06,
            (Math.random() - 0.5) * 1.5,
          ]}
        >
          <boxGeometry args={[0.08 + Math.random() * 0.15, 0.04, 0.08 + Math.random() * 0.1]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#c0c0c0' : '#2a2a2a'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <pointLight
          key={`led-${i}`}
          position={[(Math.random() - 0.5) * 2, 0.2, (Math.random() - 0.5) * 1.5]}
          color={i % 2 === 0 ? '#00ff88' : '#00aaff'}
          intensity={0.3}
          distance={1}
        />
      ))}
    </group>
  );
}

function CarbonPanel() {
  return (
    <mesh position={[-6, 0, 2]} rotation={[0, 0.5, 0]}>
      <boxGeometry args={[3, 2, 0.08]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

function Actuator() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group ref={ref} position={[6, -0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
        <meshStandardMaterial color="#4a5568" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 12]} />
        <meshStandardMaterial color="#00d4ff" emissive="#003344" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function PartialRobot() {
  const armRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      armRef.current.children[1].rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
    }
  });

  return (
    <group ref={armRef} position={[2, 0, -3]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} wireframe />
      </mesh>
      <group position={[0, 1.2, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#00ffcc" wireframe emissive="#002222" />
        </mesh>
        <mesh position={[0, 0.5, 0.3]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#ffaa00" wireframe emissive="#331100" />
        </mesh>
      </group>
    </group>
  );
}

function AmbientParticles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function WorkshopEnvironment() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#aaccff" />
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#00ffcc" distance={15} />
      <pointLight position={[4, 2, -3]} intensity={0.5} color="#ffaa00" distance={12} />
      <fog attach="fog" args={['#020810', 8, 35]} />
      <GridFloor />
      <TSlotFrame />
      <CircuitBoard />
      <CarbonPanel />
      <Actuator />
      <PartialRobot />
      <AmbientParticles />
    </>
  );
}
