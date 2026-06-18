import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectSpec } from '../../data/portfolioData';

type HUDPopupProps = {
  project: ProjectSpec | null;
  position: { x: number; y: number };
};

const ICONS: Record<string, string> = {
  SolidWorks: '◈',
  'Fusion 360': '◇',
  'ROS 2': '⬡',
  Python: '⌬',
  'C++': '▣',
  CNC: '⚙',
  'SLA 3D Printing': '▲',
  KiCad: '◎',
  C: '◆',
  FreeRTOS: '⬢',
};

export function HUDPopup({ project, position }: HUDPopupProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="hud-popup"
          style={{ left: position.x, top: position.y }}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="popup-header">
            <span className="popup-tag">PROJECT SPEC</span>
            <span className="popup-title">{project.title}</span>
          </div>

          <div className="popup-complexity">
            <span>Complexity: Level {project.complexity}/{project.maxComplexity}</span>
            <div className="complexity-bar">
              <motion.div
                className="complexity-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(project.complexity / project.maxComplexity) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="popup-section">
            <span className="section-label">SOFTWARE</span>
            <div className="icon-row">
              {project.software.map((s) => (
                <span key={s} className="tech-icon" title={s}>
                  <span className="icon-glyph">{ICONS[s] ?? '●'}</span>
                  <span className="icon-text">{s}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="popup-section">
            <span className="section-label">MANUFACTURING</span>
            <div className="tag-row">
              {project.manufacturing.map((m) => (
                <span key={m} className="hud-tag amber">{m}</span>
              ))}
            </div>
          </div>

          <div className="popup-section">
            <span className="section-label">KEY COMPONENTS</span>
            <ul className="component-list">
              {project.components.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <p className="popup-desc">{project.description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
