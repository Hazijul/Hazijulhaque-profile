import { useMemo } from 'react';
import { navNodes, connections, type NodeId } from '../../data/portfolioData';

type ConnectionPathsProps = {
  activeNode: NodeId | null;
  hoveredNode: NodeId | null;
};

function buildPath(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  orthogonal: boolean,
): string {
  if (!orthogonal) {
    return `M ${ax} ${ay} L ${bx} ${by}`;
  }
  const midY = ay + (by - ay) * 0.55;
  return `M ${ax} ${ay} L ${ax} ${midY} L ${bx} ${midY} L ${bx} ${by}`;
}

export function ConnectionPaths({ activeNode, hoveredNode }: ConnectionPathsProps) {
  const nodeMap = useMemo(
    () => Object.fromEntries(navNodes.map((n) => [n.id, n])),
    [],
  );

  const isHighlighted = (from: NodeId, to: NodeId) => {
    if (!activeNode && !hoveredNode) return true;
    const ids = [from, to];
    return ids.includes(activeNode!) || ids.includes(hoveredNode!);
  };

  return (
    <svg className="connection-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00ffcc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map(([from, to], i) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        if (!a || !b) return null;
        const highlighted = isHighlighted(from, to);
        const isLateral = a.y === b.y;
        const path = buildPath(a.x, a.y, b.x, b.y, !isLateral);

        return (
          <g key={`${from}-${to}`}>
            <path
              d={path}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth={highlighted ? 0.12 : 0.07}
              opacity={highlighted ? 0.9 : 0.35}
              filter="url(#glow)"
            />
            <circle r="0.2" fill="#00ffcc" opacity={highlighted ? 1 : 0.4}>
              <animateMotion
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
                path={path}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
