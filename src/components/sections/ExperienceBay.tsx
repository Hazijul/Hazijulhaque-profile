import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  experience,
  experienceCategories,
  countExperienceByType,
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
  const entryType = activeCategory === 'teams' ? 'team' : 'internship';
  const entries = activeCategory
    ? experience.filter((e) => e.type === entryType)
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
            ? `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} listed`
            : `${experience.length} total entries · Teams & Internships`}
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
                count={countExperienceByType(cat.id === 'teams' ? 'team' : 'internship')}
                countLabel="entries"
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
            {entries.length === 0 ? (
              <p className="empty-data-hint">
                No {categoryMeta?.label.toLowerCase()} yet. Add entries to the{' '}
                <code>experience</code> array in <code>src/data/portfolioData.ts</code> with
                type &apos;{entryType}&apos;.
              </p>
            ) : (
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
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
