import { useCallback } from 'react';
import { soundManager } from '../audio/SoundManager';

export function useSound() {
  const play = useCallback((type: Parameters<typeof soundManager.play>[0]) => {
    soundManager.play(type);
  }, []);

  const resume = useCallback(() => {
    soundManager.resume();
  }, []);

  return { play, resume };
}
