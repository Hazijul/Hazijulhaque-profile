import { motion } from 'framer-motion';
import type { NodeId } from '../../data/portfolioData';

type DataNodeProps = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  active: boolean;
  isRoot?: boolean;
  isChild?: boolean;
  isBranch?: boolean;
  onHover: (id: NodeId | null) => void;
  onClick: (id: NodeId) => void;
};

export function DataNode({
  id,
  label,
  x,
  y,
  active,
  isRoot,
  isChild,
  isBranch,
  onHover,
  onClick,
}: DataNodeProps) {
  return (
    <motion.button
      type="button"
      className={`data-node ${active ? 'active' : ''} ${isRoot ? 'root' : ''} ${isChild ? 'child' : ''} ${isBranch ? 'branch' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <span className="node-corner tl" />
      <span className="node-corner tr" />
      <span className="node-corner bl" />
      <span className="node-corner br" />
      <span className="node-scanline" />
      <span className="node-label">{label}</span>
      {active && <span className="node-pulse" />}
    </motion.button>
  );
}
