import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  projects,
  projectCategories,
  countProjectsByCategory,
  type ProjectCategoryId,
} from '../../data/portfolioData';
import { BaySlot } from '../HUD/BaySlot';
import { HUDPopup } from '../HUD/HUDPopup';
import { CategoryHubCard } from '../HUD/CategoryHubCard';
import { useSound } from '../../hooks/useSound';

type ProjectsGalleryProps = {
  onBack: () => void;
  onProjectHover: (id: string | null) => void;
};

export function ProjectsGallery({ onBack, onProjectHover }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const { play } = useSound();

  const categoryMeta = projectCategories.find((c) => c.id === activeCategory);
  const categoryProjects = activeCategory
    ? projects.filter((p) => p.category === categoryMeta?.dataCategory)
    : [];

  useEffect(() => {
    onProjectHover(null);
    setHoveredId(null);
  }, [activeCategory, onProjectHover]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (hoveredId) {
        setPopupPos({ x: e.clientX + 20, y: e.clientY - 20 });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [hoveredId]);

  const handleHover = (id: string | null, e?: React.MouseEvent) => {
    if (id && id !== hoveredId) play('scan');
    setHoveredId(id);
    onProjectHover(id);
    if (e) setPopupPos({ x: e.clientX + 20, y: e.clientY - 20 });
  };

  const hoveredProject = projects.find((p) => p.id === hoveredId) ?? null;

  return (
    <motion.div
      className="section-view projects-view"
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
        {activeCategory ? '← BACK TO PROJECTS GALLERY' : '← RETURN TO GRID'}
      </button>

      <div className="section-header">
        <span className="section-tag">PROJECTS GALLERY</span>
        <h2>{activeCategory ? categoryMeta?.label : 'Select a Project Module'}</h2>
        <p>
          {activeCategory
            ? `${categoryProjects.length} project(s) · hover for full spec readout`
            : `${projects.length} total projects across all categories`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="hub"
            className="category-hub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {projectCategories.map((cat) => (
              <CategoryHubCard
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                description={cat.description}
                count={countProjectsByCategory(cat.dataCategory)}
                countLabel="projects"
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
            {categoryProjects.length === 0 ? (
              <p className="empty-data-hint">
                No projects in this category yet. Add entries to the{' '}
                <code>projects</code> array in <code>src/data/portfolioData.ts</code> with
                category &apos;{categoryMeta?.dataCategory}&apos;.
              </p>
            ) : (
              <div className="bay-grid single-col">
                <div className="bay-column">
                  {categoryProjects.map((p) => (
                    <BaySlot
                      key={p.id}
                      label="ADD PROJECT MODULE"
                      filled
                      onHover={(e) => handleHover(p.id, e)}
                      className={hoveredId === p.id ? 'highlighted' : ''}
                    >
                      <div className="project-module">
                        <span className="module-icon">{categoryMeta?.icon}</span>
                        <div>
                          <strong>{p.title}</strong>
                          <span className="module-level">
                            LVL {p.complexity}/{p.maxComplexity}
                          </span>
                          <span className="module-desc">{p.description}</span>
                        </div>
                      </div>
                    </BaySlot>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <HUDPopup project={hoveredProject} position={popupPos} />
    </motion.div>
  );
}
