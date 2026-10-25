// Mutable store read every frame by the 3D scene (avoids React re-renders on scroll).
export const scrollStore = {
  /** Float section index: 2.4 means 40% of the way from section 2 to section 3. */
  section: 0,
  /** Overall page progress 0..1 */
  progress: 0,
  /** Normalised pointer, -1..1 */
  pointerX: 0,
  pointerY: 0,
  /** True when the visitor prefers reduced motion. */
  calm: false,
};
