import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  HueSaturation,
  SMAA,
} from '@react-three/postprocessing';
import { BlendFunction, SMAAPreset, ToneMappingMode } from 'postprocessing';

// Hero-match post-processing pass.
//
// The live scene was reading flat compared to the OG hero screenshot
// (warm golden-hour, glowing lanterns, contrasty edges). Geometry is the
// same — only lighting + grading differ. This composer pulls the live
// game up to the hero look:
//
//   • Bloom — soft halos on emissive lantern glass, UPDT/Tech signage,
//     RMAICT antenna, Lighthouse beacon. luminanceThreshold ~0.7 keeps
//     the bloom on actually-bright surfaces (emissive maxes ≥ 1.0) and
//     off the diffuse grass/plaza.
//   • Vignette — gentle corner darkening so the eye lands on the plaza.
//   • ToneMapping (ACES) — owned by the composer so we don't double-tone-map
//     with the renderer.
//
// Phones run the same look in a `lite` trim: the bloom and saturation are
// what make the world feel vibrant, and they're cheap at the capped mobile
// DPR — only the multisampling and bloom kernel step down.
export function PostFX({ lite = false }: { lite?: boolean }) {
  // Shared grading stack — these four merge into a single fullscreen pass.
  const grading = [
    // Subtle saturation lift — pulls the lawn from muted olive into a
    // lush green without pushing the warm tones into cartoon orange.
    <HueSaturation key="sat" hue={0} saturation={0.18} />,
    <Bloom
      key="bloom"
      intensity={0.95}
      luminanceThreshold={0.5}
      luminanceSmoothing={0.4}
      mipmapBlur
      // With mipmapBlur the kernelSize prop is ignored; the real mobile
      // lever is the mip chain depth. Levels 6-8 are 1-8px textures at
      // phone resolution — six extra render-pass switches for nothing.
      levels={lite ? 5 : 8}
    />,
    // Narrow portrait frames sit much closer to the vignette's corners —
    // ease it off on the lite tier so phones keep the desktop's daylight.
    <Vignette
      key="vig"
      blendFunction={BlendFunction.NORMAL}
      eskil={false}
      offset={lite ? 0.34 : 0.28}
      darkness={lite ? 0.36 : 0.58}
    />,
    <ToneMapping key="tone" mode={ToneMappingMode.ACES_FILMIC} />,
  ];

  return (
    // Desktop: 4x multisampling (default is 8) — the composer owns AA now
    // that the canvas context is created without it. Mobile: MSAA off — on
    // Apple TBDR GPUs an offscreen multisampled framebuffer must be fully
    // stored to memory and resolved via a blit every frame (a pipeline sync
    // point, ~4-5x the bandwidth). SMAA supplies the smooth edges instead:
    // one cheap shader pass over the final tonemapped image, no multisample
    // storage at all.
    <EffectComposer multisampling={lite ? 0 : 4}>
      {lite ? [...grading, <SMAA key="smaa" preset={SMAAPreset.HIGH} />] : grading}
    </EffectComposer>
  );
}

// Default export so Scene can React.lazy() this module.
export default PostFX;
