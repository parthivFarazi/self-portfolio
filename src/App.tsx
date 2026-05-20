import { Suspense, lazy, useEffect, useState } from 'react';
import { useGame } from './state/gameStore';
import { Audio } from './audio/AudioManager';
import { WorldLoadingScreen } from './components/ui/WorldLoadingScreen';
import { RouteLoadingScreen } from './components/ui/RouteLoadingScreen';

const loadLandingRoute = () => import('./routes/LandingRoute');
const loadQuickRoute = () => import('./routes/QuickRoute');
const loadExploreRoute = () => import('./routes/ExploreRoute');

const LandingRoute = lazy(loadLandingRoute);
const QuickRoute = lazy(loadQuickRoute);
const ExploreRoute = lazy(loadExploreRoute);

type AppRoute = 'landing' | 'quick' | 'explore';

function routeFromLocation(pathname: string, hash: string): AppRoute {
  if (pathname === '/quick' || hash === '#quick-view') return 'quick';
  if (pathname === '/explore' || hash === '#explore') return 'explore';
  return 'landing';
}

function pathForRoute(route: AppRoute): string {
  if (route === 'quick') return '/quick';
  if (route === 'explore') return '/explore';
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => routeFromLocation(window.location.pathname, window.location.hash));
  const closeBuilding = useGame((s) => s.closeBuilding);

  useEffect(() => {
    const initialRoute = routeFromLocation(window.location.pathname, window.location.hash);
    const nextPath = pathForRoute(initialRoute);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.replaceState(null, '', nextPath);
    }
    setRoute(initialRoute);
  }, []);

  useEffect(() => {
    const syncRoute = () => setRoute(routeFromLocation(window.location.pathname, window.location.hash));
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    if (route !== 'explore') Audio.enterZone(null);
  }, [route]);

  const navigate = (next: AppRoute) => {
    closeBuilding();
    if (next !== 'explore') Audio.enterZone(null);
    setRoute(next);
    window.history.pushState(null, '', pathForRoute(next));
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
        <ExploreRoute onBackHome={() => navigate('landing')} />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <RouteLoadingScreen
          title="Waking Resume World..."
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
