export function WorldLoadingScreen() {
  const touch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,#f4d7b0_0%,#e8c6a2_40%,#d8b08b_100%)] px-6 text-[#2a1a0e]"
      role="status"
      aria-live="polite"
      aria-label="Loading exploration mode"
    >
      <div className="flex max-w-[440px] flex-col items-center gap-4 rounded-[28px] border border-[#d4c178]/80 bg-[#fff8e2]/88 px-8 py-7 text-center shadow-[0_3px_0_#d4c178,0_18px_42px_rgba(40,20,8,0.18)] backdrop-blur">
        <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#7a5a30]">
          Exploration Mode
        </div>
        <h2 className="text-[40px] leading-none tracking-[-0.04em]" style={{ fontFamily: '"Pixelify Sans", monospace' }}>
          Loading the island...
        </h2>
        {/* The captive wait teaches the goal + controls instead of flavor text */}
        <p className="max-w-[320px] text-sm leading-6 text-[#5a3e20]">
          Every building on the island holds a project or part of my story.
        </p>
        <div className="rounded-full border border-[#d4c178]/70 bg-[#fff8e2] px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-[#5a3e20]">
          {touch ? 'Drag to walk · Tap GO to enter' : 'WASD to walk · E to enter · ESC to close'}
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <PulseDot delay="0s" />
          <PulseDot delay="0.16s" />
          <PulseDot delay="0.32s" />
        </div>
      </div>
    </div>
  );
}

function PulseDot({ delay }: { delay: string }) {
  return (
    <span
      className="h-3 w-3 rounded-full bg-[#b3a369] shadow-[0_0_0_1px_rgba(42,26,14,0.08),0_0_14px_rgba(179,163,105,0.45)] animate-[rw-loading-bounce_0.9s_ease-in-out_infinite]"
      style={{ animationDelay: delay }}
    />
  );
}
