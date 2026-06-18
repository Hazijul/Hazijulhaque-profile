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
        <div className="about-hint">
          <span className="hint-tag">MARK LXXXV CONSTRUCT</span>
          <p>Hover the Arc Reactor core to initiate identity reveal protocol</p>
        </div>

        <div className="portrait-reveal">
          <motion.div
            className={`holo-portrait ${arcRevealed ? 'visible' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: arcRevealed ? 1 : 0,
              scale: arcRevealed ? 1 : 0.8,
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="holo-frame">
              <img src={personalData.portrait} alt={personalData.name} />
              <div className="holo-scan" />
            </div>
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
            <div className="identity-block">
              <h2>{personalData.name}</h2>
              <p>{personalData.title}</p>
              <p className="tagline">{personalData.tagline}</p>
            </div>
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
