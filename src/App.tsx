import { Suspense, lazy, useEffect, useState } from 'react';
import { useGame } from './state/gameStore';
import { Audio } from './audio/AudioManager';
import { BUILDINGS, getBuilding, type BuildingId } from './data/buildings';
import { WorldLoadingScreen } from './components/ui/WorldLoadingScreen';
import { RouteLoadingScreen } from './components/ui/RouteLoadingScreen';

const loadLandingRoute = () => import('./routes/LandingRoute');
const loadQuickRoute = () => import('./routes/QuickRoute');
const loadExploreRoute = () => import('./routes/ExploreRoute');
const loadCharacterRoute = () => import('./routes/CharacterRoute');

const LandingRoute = lazy(loadLandingRoute);
const QuickRoute = lazy(loadQuickRoute);
const ExploreRoute = lazy(loadExploreRoute);
// Design-reference page at /character — not linked from the app UI.
const CharacterRoute = lazy(loadCharacterRoute);

type AppRoute = 'landing' | 'quick' | 'explore' | 'character';

const PANEL_IDS = new Set<string>(BUILDINGS.map((b) => b.id));

// URLs are /quick and /explore, with an optional open panel as a second
// segment (/quick/updt, /explore/lighthouse) so panels are shareable,
// refresh-safe, and the browser Back gesture closes them instead of
// ejecting the visitor from the whole mode.
function parseLocation(pathname: string, hash: string): { route: AppRoute; panel: BuildingId | null } {
  const segs = pathname.split('/').filter(Boolean);
  let route: AppRoute = 'landing';
  if (segs[0] === 'quick' || hash === '#quick-view') route = 'quick';
  else if (segs[0] === 'explore' || hash === '#explore') route = 'explore';
  else if (segs[0] === 'character') route = 'character';
  const panel = route !== 'landing' && segs[1] && PANEL_IDS.has(segs[1]) ? (segs[1] as BuildingId) : null;
  return { route, panel };
}

function pathFor(route: AppRoute, panel: BuildingId | null): string {
  if (route === 'landing') return '/';
  return `/${route}${panel ? `/${panel}` : ''}`;
}

function applyDocumentTitle(route: AppRoute, panel: BuildingId | null) {
  if (panel) {
    document.title = `${getBuilding(panel).name} — Parthiv Farazi`;
  } else if (route === 'quick') {
    document.title = 'Quick View — Parthiv Farazi';
  } else if (route === 'explore') {
    document.title = "Exploration Mode — Parthiv's World";
  } else if (route === 'character') {
    document.title = 'Character Sheet — Parthiv Farazi';
  } else {
    document.title = "Parthiv Farazi — Parthiv's World";
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseLocation(window.location.pathname, window.location.hash).route);

  // Canonicalize the boot URL and restore a deep-linked panel.
  useEffect(() => {
    const { route: initialRoute, panel } = parseLocation(window.location.pathname, window.location.hash);
    const nextPath = pathFor(initialRoute, panel);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.replaceState(null, '', nextPath);
    }
    setRoute(initialRoute);
    if (panel) useGame.getState().openBuilding(panel);
    applyDocumentTitle(initialRoute, panel);
  }, []);

  // Back/Forward: sync both the route and the open-panel state.
  useEffect(() => {
    const syncFromLocation = () => {
      const { route: nextRoute, panel } = parseLocation(window.location.pathname, window.location.hash);
      setRoute(nextRoute);
      const { activeBuildingId, openBuilding, closeBuilding } = useGame.getState();
      if (panel && panel !== activeBuildingId) openBuilding(panel);
      if (!panel && activeBuildingId) closeBuilding();
      applyDocumentTitle(nextRoute, panel);
    };
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  // Panel opened/closed through the UI: reflect it in the URL.
  // Open pushes a history entry (so Back closes the panel); close rewrites
  // in place (safe for deep-linked first entries — never navigates away).
  useEffect(() => {
    let prevPanel = useGame.getState().activeBuildingId;
    return useGame.subscribe((state) => {
      const panel = state.activeBuildingId;
      if (panel === prevPanel) return;
      prevPanel = panel;
      const loc = parseLocation(window.location.pathname, window.location.hash);
      if (loc.route === 'landing') return;
      if (loc.panel === panel) return; // change came from popstate — URL already matches
      if (panel) {
        window.history.pushState(null, '', pathFor(loc.route, panel));
      } else {
        window.history.replaceState(null, '', pathFor(loc.route, null));
      }
      applyDocumentTitle(loc.route, panel);
    });
  }, []);

  useEffect(() => {
    if (route !== 'explore') Audio.enterZone(null);
  }, [route]);

  // Audio boots from a user gesture only inside Exploration Mode — a
  // recruiter scanning Quick View shouldn't get surprise music.
  useEffect(() => {
    if (route !== 'explore') return;
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];
    const handler = () => {
      Audio.ensureStart();
      events.forEach((e) => window.removeEventListener(e, handler));
    };
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, [route]);

  // The Exploration chunk is heavy — three.js + the whole island, ~1 MB
  // (≈290 kB gzip). On a cold cache the FIRST click into the world pays that
  // entire download + parse, which is exactly why a refresh (served from
  // cache) feels instant. So warm both route chunks as soon as the landing
  // has painted — long before a visitor finishes reading and clicks in.
  // requestIdleCallback can defer by several seconds (the very window we need
  // to cover), so we cap it with a short timeout; touch/Safari with no rIC
  // falls back to a brief setTimeout instead of waiting.
  useEffect(() => {
    if (route !== 'landing') return;
    const warm = () => {
      void loadQuickRoute();
      void loadExploreRoute();
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 500);
    return () => window.clearTimeout(id);
  }, [route]);

  const navigate = (next: AppRoute) => {
    useGame.getState().closeBuilding();
    if (next !== 'explore') Audio.enterZone(null);
    setRoute(next);
    window.history.pushState(null, '', pathFor(next, null));
    applyDocumentTitle(next, null);
  };

  if (route === 'quick') {
    return (
      <Suspense
        fallback={
          <RouteLoadingScreen
            title="Opening Quick View..."
            subtitle="Loading the faster, recruiter-friendly path through the portfolio."
          />
        }
      >
        <QuickRoute onOpenWorld={() => navigate('explore')} onBackHome={() => navigate('landing')} />
      </Suspense>
    );
  }

  if (route === 'explore') {
    return (
      <Suspense fallback={<WorldLoadingScreen />}>
        <ExploreRoute onBackHome={() => navigate('landing')} onOpenQuick={() => navigate('quick')} />
      </Suspense>
    );
  }

  if (route === 'character') {
    return (
      <Suspense fallback={<RouteLoadingScreen title="Loading character sheet..." subtitle="Pulling up the mascot turntable." />}>
        <CharacterRoute onBackHome={() => navigate('landing')} />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <RouteLoadingScreen
          title="Waking Parthiv's World..."
          subtitle="Setting up the landing view and the fast path into the portfolio."
        />
      }
    >
      <LandingRoute
        onOpenQuick={() => navigate('quick')}
        onOpenWorld={() => navigate('explore')}
        onPreloadQuick={loadQuickRoute}
        onPreloadWorld={loadExploreRoute}
      />
    </Suspense>
  );
}
