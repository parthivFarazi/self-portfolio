import { createElement } from 'react';
import type { PanelProps } from './UPDTPanel';
import { panelImages } from './panelImages';

// AthleticPanel uses image-slot with percentage width — Slot from _shared expects
// numeric w. Replicate the inline createElement pattern here.
function PctSlot({
  id,
  w,
  h,
  placeholder,
  shape = 'rect',
  fit,
  src,
}: {
  id: string;
  w: number | string;
  h: number | string;
  placeholder?: string;
  shape?: 'rect' | 'rounded';
  fit?: 'cover' | 'contain' | 'fill';
  src?: string;
}) {
  return createElement('image-slot', { id, placeholder, shape, fit, src, style: { width: w, height: h } });
}

export function AthleticPanel({ width = 880, height = 900 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#2a2520',
      padding: 20,
      fontFamily: 'var(--rw-sans)',
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, boxShadow: '0 18px 36px rgba(0,0,0,.6)' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 30, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,.35), transparent)', zIndex: 5, pointerEvents: 'none' }}/>

        <div style={{ background: '#fbf6e6', padding: '28px 32px 24px', position: 'relative', borderRight: '1px solid #d8c8a0' }}>
          <div style={{ position: 'absolute', left: 12, top: 24, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Issue 14 · Long Read
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingLeft: 12, borderBottom: '2px solid #1a1410', paddingBottom: 10 }}>
            <div style={{ font: 'italic 700 28px var(--rw-serif)', color: '#1a1410', letterSpacing: '-.01em' }}>The Stadium Files</div>
            <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Sports · Business · Analytics</div>
          </div>

          <div style={{ marginTop: 16, paddingLeft: 12 }}>
            <h1 style={{ font: 'italic 700 46px/1.05 var(--rw-serif)', margin: '0 0 14px', color: '#1a1410' }}>
              What is a college football program <em>actually</em> worth?
            </h1>
            <div style={{ font: '13px "JetBrains Mono", monospace', letterSpacing: '.08em', color: '#7a5a30', marginBottom: 18 }}>
              by Parthiv Farazi · with Georgia Tech Athletics · 2024 — 2025
            </div>

            <div style={{ font: '17px/1.6 var(--rw-serif)', color: '#1a1410', columnCount: 1 }}>
              <p style={{ margin: 0 }}>
                <span style={{ float: 'left', font: 'italic 700 74px/0.82 var(--rw-serif)', margin: '6px 8px 0 0', color: '#c44a3a' }}>F</span>
                or all the noise about realignment and TV deals, almost no one publishes a clean answer to the question every athletic director quietly asks. So we built one — a valuation pipeline across <strong>60+ programs</strong> and <strong>four conferences</strong>, with data partnerships at Georgia Tech, and ran it against the public record.
              </p>
              <p style={{ marginTop: 12 }}>
                What follows is the unglamorous part: the spreadsheets, the assumptions, and the moments the numbers refused to behave.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 22, paddingLeft: 12 }}>
            <div style={{ font: '12px "JetBrains Mono", monospace', letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 8 }}>
              Fig. 1 — University Tracker and Organiser
            </div>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <PctSlot id="athletic-chart" w="100%" h={172} placeholder="bar chart · program valuations" src={panelImages.athletic.chart}/>
            </div>
            <div style={{ font: '14px/1.45 var(--rw-serif)', fontStyle: 'italic', color: '#5a3e20', marginTop: 8 }}>
              60 programs, four power conferences, normalized to FY '24.
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 12, left: 22, font: '10px "JetBrains Mono", monospace', color: '#7a5a30' }}>14</div>
        </div>

        <div style={{ background: '#fbf6e6', padding: '28px 32px 24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', right: 12, top: 24, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', writingMode: 'vertical-rl' }}>
            cont. from p. 14
          </div>

          <div style={{ paddingRight: 12, marginBottom: 14 }}>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <PctSlot id="athletic-stadium" w="100%" h={250} placeholder="stadium · photograph" src={panelImages.athletic.stadium}/>
            </div>
            <div style={{ font: '14px/1.45 var(--rw-serif)', fontStyle: 'italic', color: '#5a3e20', marginTop: 8, paddingRight: 4 }}>
              Bobby Dodd Stadium on a quiet Tuesday. The math doesn't care what day it is.
            </div>
          </div>

          <div style={{ font: '16px/1.6 var(--rw-serif)', color: '#1a1410', columnCount: 2, columnGap: 18, paddingRight: 12, marginBottom: 16 }}>
            <p style={{ margin: 0 }}>
              The pipeline begins where most analyses stop: with the messy numbers. Donations, media rights allocations, ticketing, NIL collectives. We standardize each line into a comparable schema, then run them through a Python valuation model that adjusts for conference strength, recruit pipeline, and stadium fill.
            </p>
            <p style={{ marginTop: 10 }}>
              The output, surprisingly, is not a single number. It's a <em>distribution</em> — the band of values where the program is plausibly worth something, given the inputs you trust.
            </p>
          </div>

          <div style={{ paddingRight: 12 }}>
            <div style={{ font: '12px "JetBrains Mono", monospace', letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 8 }}>
              Fig. 2 — the Excel/Python pipeline
            </div>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <PctSlot id="athletic-pipeline" w="100%" h={188} placeholder="Excel + Python pipeline · screenshot" src={panelImages.athletic.pipeline}/>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 14 }}>
            <div style={{ borderTop: '2px solid #1a1410', borderBottom: '1px solid #1a1410', padding: '12px 0 10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              <AthleticStat n="60+" k="schools modeled" first/>
              <AthleticStat n="4" k="conferences"/>
              <AthleticStat n="14pp" k="featured in The Athletic"/>
              <AthleticStat n="GT" k="partner · athletics"/>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 12, right: 22, font: '10px "JetBrains Mono", monospace', color: '#7a5a30' }}>15</div>
        </div>
      </div>
    </div>
  );
}

function AthleticStat({ n, k, first }: { n: string; k: string; first?: boolean }) {
  return (
    <div style={{ padding: '0 14px', borderLeft: first ? 'none' : '1px solid #c8b585' }}>
      <div style={{ font: 'italic 700 28px var(--rw-serif)', color: '#c44a3a', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a5a30', marginTop: 5 }}>{k}</div>
    </div>
  );
}
