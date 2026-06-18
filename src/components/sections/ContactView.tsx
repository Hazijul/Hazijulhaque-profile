import { motion } from 'framer-motion';
import { personalData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';

type ContactViewProps = {
  onBack: () => void;
};

export function ContactView({ onBack }: ContactViewProps) {
  const { play } = useSound();

  const links = [
    { label: 'EMAIL', value: personalData.email, href: `mailto:${personalData.email}` },
    { label: 'GITHUB', value: 'View Profile', href: personalData.github },
    { label: 'LINKEDIN', value: 'Connect', href: personalData.linkedin },
  ];

  return (
    <motion.div
      className="section-view contact-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="back-btn" onClick={onBack}>
        ← RETURN TO GRID
      </button>

      <div className="contact-panel">
        <span className="section-tag">CONTACT NODE</span>
        <h2>Establish Connection</h2>
        <p className="contact-sub">Secure channel available · Response latency &lt; 24h</p>

        <div className="contact-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => play('beep')}
              onClick={() => play('select')}
            >
              <span className="link-label">{link.label}</span>
              <span className="link-value">{link.value}</span>
              <span className="link-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="contact-status">
          <span className="status-dot" />
          SYSTEM ONLINE · READY FOR INQUIRY
        </div>
      </div>
    </motion.div>
  );
}
