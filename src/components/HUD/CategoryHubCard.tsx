import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

type CategoryHubCardProps = {
  label: string;
  icon: string;
  description: string;
  onOpen: () => void;
};

export function CategoryHubCard({ label, icon, description, onOpen }: CategoryHubCardProps) {
  const { play } = useSound();

  return (
    <motion.button
      type="button"
      className="category-hub-card"
      onClick={() => {
        play('select');
        onOpen();
      }}
      onMouseEnter={() => play('hover')}
      whileHover={{ scale: 1.02, borderColor: 'rgba(0, 255, 204, 0.7)' }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="category-hub-icon">{icon}</span>
      <span className="category-hub-label">{label}</span>
      <span className="category-hub-desc">{description}</span>
      <span className="category-hub-action">OPEN MODULE →</span>
    </motion.button>
  );
}
