const screenMap = {
  'sm': '639px',
  'md': '768px',
  'lg': '992px'
}

export type ScreenSize = 'sm' | 'md' | 'lg';

export function isScreenWidthAtLeast(size: ScreenSize) {
  const minWidth = screenMap[size];
  return window.matchMedia(`(min-width: ${minWidth})`).matches;
}
