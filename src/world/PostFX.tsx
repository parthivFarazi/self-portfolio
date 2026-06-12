import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  HueSaturation,
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize, ToneMappingMode } from 'postprocessing';

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
  return (
    // Desktop: 4x multisampling (default is 8) — the composer owns AA now
    // that the canvas context is created without it. Mobile: 2x — plenty
    // for the chunky low-poly style at 1.5 DPR, half the bandwidth.
    <EffectComposer multisampling={lite ? 2 : 4}>
      {/* Subtle saturation lift — pulls the lawn from muted olive into a
          lush green without pushing the warm tones into cartoon orange. */}
      <HueSaturation hue={0} saturation={0.18} />
      <Bloom
        intensity={0.95}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.4}
        mipmapBlur
        kernelSize={lite ? KernelSize.MEDIUM : KernelSize.LARGE}
      />
      {/* Narrow portrait frames sit much closer to the vignette's corners —
          ease it off on the lite tier so phones keep the desktop's daylight. */}
      <Vignette
        blendFunction={BlendFunction.NORMAL}
        eskil={false}
        offset={lite ? 0.34 : 0.28}
        darkness={lite ? 0.36 : 0.58}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

// Default export so Scene can React.lazy() this module.
export default PostFX;
