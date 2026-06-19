import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';

type AboutMeViewProps = {
  arcRevealed: boolean;
  onArcReveal: (revealed: boolean) => void;
  onBack: () => void;
};

export function AboutMeView({ arcRevealed, onArcReveal, onBack }: AboutMeViewProps) {
  const { play } = useSound();

  useEffect(() => {
    if (arcRevealed) play('reveal');
  }, [arcRevealed, play]);

  return (
    <motion.div
      className="section-view about-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="back-btn" onClick={onBack}>
        ← RETURN TO GRID
      </button>

      <div className="about-layout">
        <div className="about-profile-panel">
          <span className="hint-tag">IDENTITY MODULE</span>
          <h2 className="about-name">{personalData.name}</h2>
          <p className="about-title">{personalData.title}</p>
          <p className="about-tagline">{personalData.tagline}</p>

          <ul className="about-bio-list">
            {personalData.bio.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p className="about-arc-hint">
            Hover the Arc Reactor in the workshop to activate the holographic- portrait
          </p>
        </div>

        <div className="portrait-reveal">
          <motion.div
            className={`holo-portrait ${arcRevealed ? 'revealed' : ''}`}
            animate={{ opacity: arcRevealed ? 1 : 0.35, scale: arcRevealed ? 1 : 0.92 }}
            transition={{ duration: 0.5 }}
          >
            <div className="holo-frame">
              <img src="/profile-pic.jpeg" alt={personalData.name} />
              <div className={`holo-scan ${arcRevealed ? 'active' : ''}`} />
            </div>
            {arcRevealed && (
              <div className="data-scroll">
                <div className="scroll-content">
                  {personalData.bio.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  {personalData.bio.map((line) => (
                    <span key={`dup-${line}`}>{line}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        className="arc-trigger"
        onMouseEnter={() => {
          onArcReveal(true);
          play('scan');
        }}
        onMouseLeave={() => onArcReveal(false)}
        aria-label="Arc Reactor hover zone"
      />
    </motion.div>
  );
}
