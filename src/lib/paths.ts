/** Prefix local links and assets for GitHub project Pages, preserving external URLs. */
export function sitePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
