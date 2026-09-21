export function userPath(username: string, search = ''): string {
  return `/users/${encodeURIComponent(username)}${search}`;
}
