import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  HueSaturation,
} from '@react-three/postprocessing';
import {
  BlendFunction,
  EdgeDetectionMode,
  EffectPass,
  PredicationMode,
  SMAAEffect,
  SMAAPreset,
  ToneMappingMode,
} from 'postprocessing';

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
// Anti-aliasing: 4x MSAA on EVERY tier, phones included. The old
// "multisampling=0 on Apple TBDR GPUs" rule is outdated folklore — the iOS
// depth/stencil corruption behind it was fixed in WebKit in 2022, and the
// ANGLE-Metal backend resolves multisampled targets on-tile, so the cost on
// A15+ is a few percent of render time. MSAA adds true subpixel coverage on
// geometry silhouettes (the extruded signage, roof lines), which a
// morphological pass like SMAA structurally cannot reconstruct — and it
// feeds Bloom an already-smooth edge instead of amplifying a hard one.
//
// `?msaa=0` escape hatch: if a future iOS release regresses renderbuffer
// MSAA, this swaps in the old no-multisample path with a standalone SMAA
// ULTRA pass appended AFTER the grading pass. Standalone matters: as a
// plain child, SMAA gets merged into the grading EffectPass and would
// edge-detect the pre-tonemap HDR buffer, where bright emissives clip to
// flat white and no edge gradient survives to detect.
export function PostFX({ lite = false }: { lite?: boolean }) {
  const camera = useThree((s) => s.camera);
  const msaaOff = useMemo(
    () => new URLSearchParams(window.location.search).get('msaa') === '0',
    [],
  );

  // Fallback-path SMAA, built only when the hatch is open.
  const smaaPass = useMemo(() => {
    if (!msaaOff) return null;
    return new EffectPass(
      camera,
      new SMAAEffect({
        preset: SMAAPreset.ULTRA,
        edgeDetectionMode: EdgeDetectionMode.LUMA,
        // Depth predication tracks geometric silhouettes even where the
        // pixels themselves have saturated to one flat color.
        predicationMode: PredicationMode.DEPTH,
      }),
    );
  }, [camera, msaaOff]);

  useEffect(() => () => smaaPass?.dispose(), [smaaPass]);

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
    <EffectComposer multisampling={msaaOff ? 0 : 4}>
      {smaaPass ? [...grading, <primitive key="smaa" object={smaaPass} />] : grading}
    </EffectComposer>
  );
}

// Default export so Scene can React.lazy() this module.
export default PostFX;
