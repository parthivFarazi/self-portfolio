import { useEffect, useState } from 'react';
import { Audio } from './AudioManager';

/** Reactive accessor for the global AudioManager. */
export function useAudio() {
  const [muted, setMutedState] = useState(Audio.isMuted());

  useEffect(() => {
    return Audio.subscribe(() => setMutedState(Audio.isMuted()));
  }, []);

  return {
    muted,
    toggleMute: () => Audio.setMuted(!Audio.isMuted()),
    audio: Audio,
  };
}
