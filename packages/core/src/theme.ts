export function resolveThemeBackground(
  theme: 'light' | 'dark' | 'auto' | undefined,
  override?: string,
): string {
  if (override) return override;
  if (theme === 'light') return '#ffffff';
  // dark or auto → engineering drawing standard dark background
  return '#1e1e1e';
}

export function getIsDark(): boolean {
  return (
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.body.classList.contains('theme-dark')
  );
}
