import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type RoboticArmProps = {
  hovered: boolean;
  position?: [number, number, number];
  scale?: number;
};

export function RoboticArm({ hovered, position = [0, 0, 0], scale = 1 }: RoboticArmProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (hovered ? 0.8 : 0.3);
    }
    if (baseRef.current) {
      baseRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  const wireMat = (
    <meshBasicMaterial color={hovered ? '#00ffcc' : '#00aaff'} wireframe transparent opacity={hovered ? 1 : 0.7} />
  );

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={baseRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.6, 12]} />
        {wireMat}
      </mesh>
      <group position={[0, 0.8, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.2, 1.2, 0.2]} />
          {wireMat}
        </mesh>
        <group position={[0, 0.7, 0]} rotation={[0, 0, -0.5]}>
          <mesh>
            <boxGeometry args={[0.15, 1, 0.15]} />
            {wireMat}
          </mesh>
          <group position={[0, 0.6, 0]} rotation={[0.4, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.12, 0.8, 0.12]} />
              {wireMat}
            </mesh>
            <mesh position={[0, 0.5, 0.15]}>
              <boxGeometry args={[0.3, 0.1, 0.2]} />
              {wireMat}
            </mesh>
          </group>
        </group>
      </group>
      {hovered && (
        <pointLight color="#00ffcc" intensity={2} distance={4} position={[0, 1, 0]} />
      )}
    </group>
  );
}
