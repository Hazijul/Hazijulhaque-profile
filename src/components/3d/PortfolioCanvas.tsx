import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { WorkshopEnvironment } from './WorkshopEnvironment';
import { ArmorConstruct } from './ArmorConstruct';
import { RoboticArm } from './RoboticArm';

type SceneMode = 'grid' | 'about' | 'projects';

type PortfolioCanvasProps = {
  mode: SceneMode;
  onArcHover: (hovered: boolean) => void;
  arcRevealed: boolean;
  hoveredProject: string | null;
};

export function PortfolioCanvas({
  mode,
  onArcHover,
  arcRevealed,
  hoveredProject,
}: PortfolioCanvasProps) {
  return (
    <Canvas
      className="portfolio-canvas"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={55} />
      <color attach="background" args={['#020810']} />

      <Suspense fallback={null}>
        <WorkshopEnvironment />

        {mode === 'about' && (
          <ArmorConstruct onArcHover={onArcHover} revealed={arcRevealed} />
        )}

        {mode === 'projects' && (
          <>
            <RoboticArm
              hovered={hoveredProject === 'robotic-arm'}
              position={[-2, -1, 0]}
              scale={1.2}
            />
            <RoboticArm
              hovered={hoveredProject === 'cnc-chassis'}
              position={[2.5, -1, -1]}
              scale={0.9}
            />
          </>
        )}
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={mode !== 'grid'}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={18}
        autoRotate={mode === 'grid'}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
