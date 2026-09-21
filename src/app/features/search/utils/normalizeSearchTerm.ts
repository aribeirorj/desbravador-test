/** Remove espaços nas pontas e um `@` inicial: quem cola `@torvalds` encontra `torvalds`. */
export function normalizeSearchTerm(value: string): string {
  return value.trim().replace(/^@/, '');
}
