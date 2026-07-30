/**
 * Runs before hydration (inlined as a blocking <script> in <head>) so the
 * correct theme is set on <html> before first paint — no flash. Kept as a
 * plain string, not a bundled module.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var mode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {}
})();
`;
