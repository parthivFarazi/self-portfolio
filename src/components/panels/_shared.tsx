import type { CSSProperties, ReactNode } from 'react';
import { createElement } from 'react';

// Shared helpers extracted from the prototype's project-panels.jsx top.
// These render verbatim — no design changes.

export interface SlotProps {
  id: string;
  w: number;
  h: number;
  placeholder?: string;
  shape?: 'rect' | 'rounded' | 'circle' | 'pill';
  radius?: number | string;
  style?: CSSProperties;
}

export function Slot({ id, w, h, placeholder, shape = 'rect', radius, style }: SlotProps) {
  const props: Record<string, unknown> = {
    id,
    placeholder,
    style: { width: w, height: h, ...(style || {}) },
  };
  if (shape) props.shape = shape;
  if (radius != null) props.radius = String(radius);
  return createElement('image-slot', props);
}

export interface PanelHeaderProps {
  kicker: ReactNode;
  title: ReactNode;
  meta: ReactNode;
}

export function PanelHeader({ kicker, title, meta }: PanelHeaderProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,.55)' }}>{kicker}</div>
      <h1 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 4px', color: 'var(--rw-ink)' }}>{title}</h1>
      <div style={{ font: '11.5px var(--rw-mono)', color: 'rgba(0,0,0,.55)' }}>{meta}</div>
    </div>
  );
}

// project-panels-2.jsx variant — configurable colors.
export interface P2HeaderProps {
  kicker: ReactNode;
  title: ReactNode;
  meta: ReactNode;
  kickerColor?: string;
  titleColor?: string;
  metaColor?: string;
}

export function P2Header({
  kicker, title, meta,
  kickerColor = 'rgba(0,0,0,.55)',
  titleColor = 'var(--rw-ink)',
  metaColor = 'rgba(0,0,0,.55)',
}: P2HeaderProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: kickerColor }}>{kicker}</div>
      <h1 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 4px', color: titleColor }}>{title}</h1>
      <div style={{ font: '11.5px var(--rw-mono)', color: metaColor }}>{meta}</div>
    </div>
  );
}

export interface P2StatStripProps {
  items: Array<{ n: ReactNode; k: ReactNode }>;
  accent?: string;
  labelColor?: string;
  valueColor?: string;
  valueFont?: string;
}

export function P2StatStrip({
  items,
  accent = '#c44a3a',
  labelColor = '#7a5a30',
  valueColor = '#2a1a0e',
  valueFont = '700 22px var(--rw-serif)',
}: P2StatStripProps) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: 1, paddingLeft: 12, borderLeft: `2px solid ${accent}` }}>
          <div style={{ font: valueFont, color: valueColor, lineHeight: 1 }}>{it.n}</div>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: labelColor, marginTop: 4 }}>{it.k}</div>
        </div>
      ))}
    </div>
  );
}
