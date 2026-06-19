import { motion } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import { BaySlot } from '../HUD/BaySlot';
import { useSound } from '../../hooks/useSound';

type SkillsBayProps = {
  onBack: () => void;
};

export function SkillsBay({ onBack }: SkillsBayProps) {
  const { play } = useSound();

  return (
    <motion.div
      className="section-view skills-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="back-btn" onClick={onBack}>
        ← RETURN TO GRID
      </button>

      <div className="section-header">
        <span className="section-tag">SKILLS MODULE</span>
        <h2>Technical Proficiency Matrix</h2>
        <p>{skills.length} skills loaded from portfolio data</p>
      </div>

      <div className="bay-grid skills-grid">
        {skills.map((s) => (
          <BaySlot
            key={s.id}
            label="ADD SKILL MODULE"
            filled
            onHover={() => play('hover')}
          >
            <div className="skill-module">
              <div className="skill-header">
                <strong>{s.name}</strong>
                <span className="skill-cat">{s.category}</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="skill-pct">{s.level}%</span>
            </div>
          </BaySlot>
        ))}
      </div>
    </motion.div>
  );
}
