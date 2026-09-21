export function repositoryPath(owner: string, name: string): string {
  return `/users/${encodeURIComponent(owner)}/repos/${encodeURIComponent(name)}`;
}
