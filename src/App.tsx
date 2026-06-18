import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioCanvas } from './components/3d/PortfolioCanvas';
import { DataNodeGrid } from './components/HUD/DataNodeGrid';
import { AboutMeView } from './components/sections/AboutMeView';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { ExperienceBay } from './components/sections/ExperienceBay';
import { SkillsBay } from './components/sections/SkillsBay';
import { ContactView } from './components/sections/ContactView';
import { personalData, type NodeId } from './data/portfolioData';
import { useSound } from './hooks/useSound';
import { soundManager } from './audio/SoundManager';
import './index.css';

type ViewMode = 'grid' | 'about' | 'projects' | 'experience' | 'skills' | 'contact';

const nodeToView: Partial<Record<NodeId, ViewMode>> = {
  home: 'grid',
  about: 'about',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  contact: 'contact',
};

function App() {
  const [view, setView] = useState<ViewMode>('grid');
  const [activeNode, setActiveNode] = useState<NodeId>('home');
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);
  const [arcRevealed, setArcRevealed] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString());
  const { play, resume } = useSound();

  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleNodeSelect = useCallback(
    (id: NodeId) => {
      resume();
      play('select');
      play('servo');
      setActiveNode(id);
      const nextView = nodeToView[id] ?? 'grid';
      setView(nextView);
      setArcRevealed(false);
    },
    [play, resume],
  );

  const handleNodeHover = useCallback(
    (id: NodeId | null) => {
      if (id && id !== hoveredNode) {
        play('hover');
      }
      setHoveredNode(id);
    },
    [hoveredNode, play],
  );

  const handleBack = useCallback(() => {
    play('servo');
    setView('grid');
    setActiveNode('home');
    setArcRevealed(false);
  }, [play]);

  const canvasMode = view === 'about' ? 'about' : view === 'projects' ? 'projects' : 'grid';

  return (
    <div className="app">
      <PortfolioCanvas
        mode={canvasMode}
        onArcHover={(h) => {
          if (h) play('pulse');
        }}
        arcRevealed={arcRevealed}
        hoveredProject={hoveredProject}
      />

      <div className="hud-layer">
        <header className="hud-header">
          <div className="header-left">
            <span className="sys-label">CYBER-PHYSICAL HUD</span>
            <span className="sys-version">v2.085</span>
          </div>
          <div className="header-center">
            <span className="scan-text">MECHATRONICS WORKSHOP // NODE GRID ACTIVE</span>
          </div>
          <div className="header-right">
            <button
              type="button"
              className={`sound-toggle ${soundOn ? 'on' : ''}`}
              onClick={() => {
                const next = !soundOn;
                setSoundOn(next);
                soundManager.setEnabled(next);
                resume();
              }}
            >
              {soundOn ? '🔊 AUDIO ON' : '🔇 AUDIO OFF'}
            </button>
          </div>
        </header>

        <div className="scan-overlay" aria-hidden />

        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <div key="grid" className="grid-view">
              <div className="hero-panel">
                <h1 className="hero-title">
                  <span className="hero-glitch" data-text={personalData.name}>
                    {personalData.name}
                  </span>
                </h1>
                <p className="hero-sub">{personalData.title}</p>
                <p className="hero-hint">Select a data-node to navigate the portfolio network</p>
              </div>
              <DataNodeGrid
                activeNode={activeNode}
                hoveredNode={hoveredNode}
                onHover={handleNodeHover}
                onSelect={handleNodeSelect}
                visible
              />
            </div>
          )}

          {view === 'about' && (
            <AboutMeView
              key="about"
              arcRevealed={arcRevealed}
              onArcReveal={setArcRevealed}
              onBack={handleBack}
            />
          )}

          {view === 'projects' && (
            <ProjectsGallery
              key="projects"
              onBack={handleBack}
              onProjectHover={setHoveredProject}
            />
          )}

          {view === 'experience' && (
            <ExperienceBay key="experience" onBack={handleBack} />
          )}

          {view === 'skills' && (
            <SkillsBay key="skills" onBack={handleBack} />
          )}

          {view === 'contact' && (
            <ContactView key="contact" onBack={handleBack} />
          )}
        </AnimatePresence>

        <footer className="hud-footer">
          <span>PARALLAX: ACTIVE</span>
          <span>DATA STREAM: NOMINAL</span>
          <span className="footer-time">{clock}</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
