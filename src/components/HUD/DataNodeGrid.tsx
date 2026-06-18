import { navNodes, type NodeId } from '../../data/portfolioData';
import { ConnectionPaths } from './ConnectionPaths';
import { DataNode } from './DataNode';

type DataNodeGridProps = {
  activeNode: NodeId;
  hoveredNode: NodeId | null;
  onHover: (id: NodeId | null) => void;
  onSelect: (id: NodeId) => void;
  visible: boolean;
};

export function DataNodeGrid({
  activeNode,
  hoveredNode,
  onHover,
  onSelect,
  visible,
}: DataNodeGridProps) {
  if (!visible) return null;

  return (
    <div className="data-node-grid">
      <ConnectionPaths activeNode={activeNode} hoveredNode={hoveredNode} />
      {navNodes.map((node) => (
        <DataNode
          key={node.id}
          id={node.id}
          label={node.label}
          x={node.x}
          y={node.y}
          active={activeNode === node.id || hoveredNode === node.id}
          isRoot={node.id === 'home'}
          isChild={!!node.parent && node.parent !== 'home'}
          isBranch={node.parent === 'home'}
          onHover={onHover}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
