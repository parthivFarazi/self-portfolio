// PanelZoom — the phone reading experience for designed panels.
//
// The panel opens fully visible (the "postcard" fit); reading happens by
// zooming. Gestures follow the platform conventions every photo/map app
// trained users on (Apple HIG / Material / Baymard):
//   • pinch — zoom at the finger midpoint, rubber-band past the limits
//   • double-tap — zoom into the tapped spot; double-tap again → fit
//   • drag — pan while zoomed, with flick momentum
// Plus one visible control (Apple HIG: keep a simple, visible way to do
// the action): a magnifier button that toggles fit ↔ readable scale. A
// one-time "pinch or double-tap to zoom" chip signals the gestures and
// retires on first use (Baymard: signaling zoomability matters as much
// as supporting it).

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchContentRef,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

const ZOOM_HINT_KEY = 'rw-zoom-hint-seen';

export function PanelZoom({
  fitScale,
  children,
}: {
  /** The scale ResponsivePanel rendered the panel at (its layout size). */
  fitScale: number;
  children: ReactNode;
}) {
  const apiRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [hintVisible, setHintVisible] = useState(() => {
    try {
      return !window.localStorage.getItem(ZOOM_HINT_KEY);
    } catch {
      return true;
    }
  });

  // Transform scale at which the panel's designed type renders at intended
  // size (panel CSS px ≈ device px). Capped: past ~2x native everything is
  // blurry upscaling anyway.
  const readableScale = Math.min(1 / fitScale, 4);
  const maxScale = Math.min(readableScale * 1.5, 5);

  const retireHint = () => {
    setHintVisible(false);
    try {
      window.localStorage.setItem(ZOOM_HINT_KEY, '1');
    } catch {
      /* fine */
    }
  };

  // The chip fades on its own after a few seconds (NN/g: one brief
  // contextual hint), and instantly the moment a gesture happens.
  useEffect(() => {
    if (!hintVisible) return;
    const id = window.setTimeout(() => setHintVisible(false), 5000);
    return () => window.clearTimeout(id);
  }, [hintVisible]);

  // iOS Safari fires proprietary gesture* events for its NATIVE page pinch,
  // which hijacks two-finger gestures before our handlers run — the panel
  // wouldn't zoom and the page would. Suppress native pinch while a panel
  // is open (page pinch-zoom stays available everywhere else).
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    const opts = { passive: false } as AddEventListenerOptions;
    document.addEventListener('gesturestart', prevent, opts);
    document.addEventListener('gesturechange', prevent, opts);
    document.addEventListener('gestureend', prevent, opts);
    return () => {
      document.removeEventListener('gesturestart', prevent);
      document.removeEventListener('gesturechange', prevent);
      document.removeEventListener('gestureend', prevent);
    };
  }, []);

  // Keep the magnifier in sync with EVERY zoom path — pinch, double-tap,
  // wheel, programmatic — so it always offers the correct direction.
  const syncZoom = (ref: ReactZoomPanPinchRef) => {
    const isZoomed = ref.state.scale > 1.04;
    setZoomed((z) => (z === isZoomed ? z : isZoomed));
    if (isZoomed) retireHint();
  };

  const toggleZoom = () => {
    const api = apiRef.current;
    if (!api) return;
    if (zoomed) {
      api.resetTransform(220);
    } else {
      // Zoom toward the panel's center at readable scale.
      api.centerView(readableScale, 220);
    }
  };

  return (
    <div className="relative h-full w-full">
      <TransformWrapper
        ref={apiRef}
        minScale={1}
        maxScale={maxScale}
        initialScale={1}
        centerOnInit
        limitToBounds
        doubleClick={{ mode: 'toggle', step: 0.7, animationTime: 220 }}
        pinch={{ step: 5 }}
        wheel={{ step: 0.08 }}
        panning={{ velocityDisabled: false }}
        autoAlignment={{ sizeX: 80, sizeY: 80, animationTime: 220 }}
        onTransform={(ref) => syncZoom(ref)}
        onZoom={(ref) => syncZoom(ref)}
        onZoomStop={(ref) => syncZoom(ref)}
        onPinch={(ref) => syncZoom(ref)}
        onPinchStop={(ref) => syncZoom(ref)}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100%',
            height: '100%',
            touchAction: 'none',
            overscrollBehavior: 'contain',
          }}
          contentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </TransformComponent>
      </TransformWrapper>

      {/* One-time gesture signal — fades after 5s or on first zoom. */}
      {hintVisible && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2a1a0e]/75 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-[#fffaee] shadow-lg backdrop-blur-sm"
          style={{ animation: 'rw-zoom-hint 5s ease forwards' }}
        >
          Pinch or double-tap to zoom
        </div>
      )}

      {/* The visible zoom control — magnifier toggles fit ↔ readable. */}
      <button
        type="button"
        onClick={toggleZoom}
        aria-label={zoomed ? 'Fit whole panel on screen' : 'Zoom in to read'}
        className="absolute bottom-3 right-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-rw-paper text-[19px] leading-none text-rw-ink shadow-[0_2px_0_#d4c178,0_10px_24px_rgba(0,0,0,0.35)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
      >
        <span aria-hidden="true">{zoomed ? '⤡' : '⊕'}</span>
      </button>
    </div>
  );
}
