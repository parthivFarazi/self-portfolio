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
// Bypassed on liteWorld (mobile / low-end) — the warmed lighting carries
// most of the look without paying the post-process GPU cost.
export function PostFX() {
  return (
    <EffectComposer>
      {/* Subtle saturation lift — pulls the lawn from muted olive into a
          lush green without pushing the warm tones into cartoon orange. */}
      <HueSaturation hue={0} saturation={0.18} />
      <Bloom
        intensity={0.95}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.4}
        mipmapBlur
        kernelSize={KernelSize.LARGE}
      />
      <Vignette
        blendFunction={BlendFunction.NORMAL}
        eskil={false}
        offset={0.28}
        darkness={0.58}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
