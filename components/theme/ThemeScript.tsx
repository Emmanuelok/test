/**
 * Runs before React hydrates — sets the theme attribute from localStorage or
 * the system preference so there's no flash on first paint.
 */
export function ThemeScript() {
  const code = `
(function(){try{
  var s = localStorage.getItem('theme');
  var sys = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  var t = s === 'light' || s === 'dark' ? s : sys;
  document.documentElement.setAttribute('data-theme', t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
