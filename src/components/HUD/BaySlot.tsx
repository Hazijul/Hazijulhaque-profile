import { motion } from 'framer-motion';

type BaySlotProps = {
  label: string;
  filled?: boolean;
  children?: React.ReactNode;
  onHover?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
};

export function BaySlot({
  label,
  filled = false,
  children,
  onHover,
  onClick,
  className = '',
}: BaySlotProps) {
  return (
    <motion.div
      className={`bay-slot ${filled ? 'filled' : 'empty'} ${className}`}
      onMouseEnter={onHover}
      onClick={onClick}
      whileHover={{ borderColor: 'rgba(0, 255, 204, 0.6)' }}
      layout
    >
      <div className="bay-header">
        <span className="bay-indicator" />
        <span className="bay-id">MODULE BAY</span>
      </div>
      {filled ? (
        <div className="bay-content">{children}</div>
      ) : (
        <div className="bay-placeholder">
          <span className="placeholder-bracket">[</span>
          {label}
          <span className="placeholder-bracket">]</span>
          <div className="placeholder-pulse" />
        </div>
      )}
    </motion.div>
  );
}
