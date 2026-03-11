export function resolveThemeBackground(
  theme: 'light' | 'dark' | 'auto' | undefined,
  override?: string,
): string {
  if (override) return override;
  if (theme === 'dark') return '#1e1e1e';
  if (theme === 'light') return '#f5f5f5';
  // auto
  const isDark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.body.classList.contains('theme-dark');
  return isDark ? '#1e1e1e' : '#f5f5f5';
}

export function getIsDark(): boolean {
  return (
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.body.classList.contains('theme-dark')
  );
}
