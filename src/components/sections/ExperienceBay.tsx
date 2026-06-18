import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  experience,
  experienceCategories,
  type ExperienceCategoryId,
} from '../../data/portfolioData';
import { BaySlot } from '../HUD/BaySlot';
import { CategoryHubCard } from '../HUD/CategoryHubCard';
import { useSound } from '../../hooks/useSound';

type ExperienceBayProps = {
  onBack: () => void;
};

export function ExperienceBay({ onBack }: ExperienceBayProps) {
  const [activeCategory, setActiveCategory] = useState<ExperienceCategoryId | null>(null);
  const { play } = useSound();

  const categoryMeta = experienceCategories.find((c) => c.id === activeCategory);
  const entries = activeCategory
    ? experience.filter((e) => e.type === (activeCategory === 'teams' ? 'team' : 'internship'))
    : [];

  return (
    <motion.div
      className="section-view experience-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="back-btn"
        onClick={() => {
          if (activeCategory) {
            play('servo');
            setActiveCategory(null);
          } else {
            onBack();
          }
        }}
      >
        {activeCategory ? '← BACK TO EXPERIENCE' : '← RETURN TO GRID'}
      </button>

      <div className="section-header">
        <span className="section-tag">EXPERIENCE MATRIX</span>
        <h2>{activeCategory ? categoryMeta?.label : 'Select Experience Module'}</h2>
        <p>
          {activeCategory
            ? 'Review roles and organizations in this category'
            : 'Choose Teams or Internships to view your experience details'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="hub"
            className="category-hub two-col"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {experienceCategories.map((cat) => (
              <CategoryHubCard
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                description={cat.description}
                onOpen={() => setActiveCategory(cat.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            className="category-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="bay-grid single-col">
              <div className="bay-column">
                {entries.map((e) => (
                  <BaySlot
                    key={e.id}
                    label="ADD EXPERIENCE DETAILS"
                    filled
                    onHover={() => play('hover')}
                  >
                    <div className="experience-module">
                      <strong>{e.title}</strong>
                      <span>{e.org}</span>
                      <span className="period">{e.period}</span>
                    </div>
                  </BaySlot>
                ))}
                <BaySlot label="ADD EXPERIENCE DETAILS" onHover={() => play('pulse')} />
                {activeCategory === 'internships' && (
                  <BaySlot label="ADD EXPERIENCE DETAILS" onHover={() => play('pulse')} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
