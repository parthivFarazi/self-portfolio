export function RouteLoadingScreen({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.16),transparent_26%),linear-gradient(180deg,#f6dfbc_0%,#efcfaa_42%,#e3bc93_100%)] px-6 text-[#2a1a0e]">
      <div className="rounded-[30px] border border-[#d4c178]/70 bg-[#fff8e2]/90 px-8 py-7 text-center shadow-[0_3px_0_#d4c178,0_20px_48px_rgba(40,20,8,0.16)] backdrop-blur">
        <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#7a5a30]">
          Parthiv's World
        </div>
        <h2 className="mt-3 text-[38px] leading-none tracking-[-0.04em]" style={{ fontFamily: '"Pixelify Sans", monospace' }}>
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-[#5a3e20]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
