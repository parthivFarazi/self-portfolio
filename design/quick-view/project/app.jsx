// app.jsx — DesignCanvas composition + Tweaks wiring.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "timeOfDay": "golden"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const tod = t.timeOfDay || 'golden';

  return (
    <>
      <window.DesignCanvas>
        <window.DCSection id="brand" title="Brand & World" subtitle="The visual direction — palette, type, materials, and a one-liner teaser">
          <window.DCArtboard id="teaser" label="01 · Teaser landing" width={1280} height={720}>
            <window.TeaserCard tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="palette" label="02 · Palette" width={980} height={660}>
            <window.PaletteCard />
          </window.DCArtboard>
          <window.DCArtboard id="type" label="03 · Type system" width={980} height={660}>
            <window.TypeCard />
          </window.DCArtboard>
          <window.DCArtboard id="materials" label="04 · Materials" width={980} height={540}>
            <window.MaterialsCard />
          </window.DCArtboard>
          <window.DCArtboard id="character" label="05 · Character sheet" width={980} height={640}>
            <window.CharacterSheetCard />
          </window.DCArtboard>
        </window.DCSection>

        <window.DCSection id="scenes" title="Concept Art · 14 Isometric Renders" subtitle="Polished “game screenshots” from the player's perspective. Camera at ~30° pitch. The whole island is never visible at once — each frame is one area the player is standing in. Cycle time-of-day via Tweaks.">
          <window.DCArtboard id="s-spawn" label="01 · Spawn Plaza" width={1280} height={720}>
            <window.SceneSpawnPlaza tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-updt" label="02 · UPDT. Soccer Stadium" width={1280} height={720}>
            <window.SceneUPDTStadium tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-petronas" label="03 · Petronas Towers" width={1280} height={720}>
            <window.ScenePetronas tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-tech" label="04 · Tech Tower" width={1280} height={720}>
            <window.SceneTechTower tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-du" label="05 · Delta Upsilon" width={1280} height={720}>
            <window.SceneDeltaUpsilon tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-rmaict" label="06 · RMAICT Tower" width={1280} height={720}>
            <window.SceneRMAICT tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-qard" label="07 · Qard Greenhouse" width={1280} height={720}>
            <window.SceneQard tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-athletic" label="08 · Athletic Stadium" width={1280} height={720}>
            <window.SceneAthletic tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-archive" label="09 · Whispering Archive" width={1280} height={720}>
            <window.SceneArchive tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-zen" label="10 · Zen Garden" width={1280} height={720}>
            <window.SceneZen tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-heatmap" label="11 · Heatmap Garden" width={1280} height={720}>
            <window.SceneHeatmap tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-workshop" label="12 · Robot's Workshop" width={1280} height={720}>
            <window.SceneWorkshop tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-forge" label="13 · The Forge" width={1280} height={720}>
            <window.SceneForge tod={tod} />
          </window.DCArtboard>
          <window.DCArtboard id="s-lighthouse" label="14 · The Lighthouse" width={1280} height={720}>
            <window.SceneLighthouse tod={tod} />
          </window.DCArtboard>
        </window.DCSection>

        <window.DCSection id="dashboard" title="Quick View · the fast path" subtitle="An alternative entry point for 90-second recruiters — single page, scannable, opens the same UI panels as the game.">
          <window.DCArtboard id="landing" label="Landing · choose your speed" width={1440} height={900}>
            <window.LandingPage tod={tod}/>
          </window.DCArtboard>
          <window.DCArtboard id="dash-desktop" label="Quick View dashboard · desktop" width={1440} height={2200}>
            <window.QuickViewDashboard tod={tod}/>
          </window.DCArtboard>
          <window.DCArtboard id="landing-mobile" label="Landing · mobile" width={390} height={844}>
            <window.LandingPageMobile tod={tod}/>
          </window.DCArtboard>
          <window.DCArtboard id="dash-mobile" label="Quick View · mobile" width={390} height={1900}>
            <window.QuickViewDashboardMobile tod={tod}/>
          </window.DCArtboard>
        </window.DCSection>

        <window.DCSection id="panels" title="UI Panels" subtitle="Each panel themed to its building. Project panels include drag-and-drop image slots — drop your real screenshots or photos straight onto them.">
          <window.DCArtboard id="panel-updt" label="UPDT Stadium — ScoutPro dashboard" width={820} height={780}>
            <window.UPDTPanel width={820} height={780} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-pong" label="Pong — Baseball logging app" width={760} height={780}>
            <window.PongPanelV2 width={760} height={780} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-qard" label="Qard — Fintech frontend" width={760} height={780}>
            <window.QardPanel width={760} height={780} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-soothe" label="Soothe — Mental health app" width={760} height={780}>
            <window.SoothePanel width={760} height={780} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-workshop" label="Robot Workshop — origin story" width={760} height={780}>
            <window.WorkshopPanel width={760} height={780} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-edu" label="Tech Tower — Education" width={680} height={760}>
            <window.CollegiateTowerPanel width={680} height={760} />
          </window.DCArtboard>
          <window.DCArtboard id="panel-about" label="Petronas Towers — About Me" width={720} height={760}>
            <window.PetronasTowersPanel width={720} height={760} />
          </window.DCArtboard>
        </window.DCSection>
      </window.DesignCanvas>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Time of day" />
        <window.TweakRadio
          label="Sky"
          value={tod}
          options={['golden', 'dusk', 'night']}
          onChange={(v) => setTweak('timeOfDay', v)}
        />
        <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.1em', color: 'rgba(41,38,27,.55)', padding: '4px 2px', lineHeight: 1.45 }}>
          Reflects across all 14 scenes: sky gradient, sun/moon, window glow, beam intensity, lantern strength. Golden is the canonical look from the brief.
        </div>
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
