// Side-effect import: registers the <image-slot> custom element used by the
// designed panels. Drag-and-drop persistence (omelette sidecar) is a no-op in
// this app — the slots render their placeholder until we wire real images.
import './_image-slot.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          shape?: 'rect' | 'rounded' | 'circle' | 'pill';
          radius?: string | number;
          placeholder?: string;
          fit?: 'cover' | 'contain' | 'fill';
          src?: string;
          mask?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
