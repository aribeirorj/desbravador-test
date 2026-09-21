import type { Repository } from '@/features/repositories/types/repository';

export const SORT_OPTIONS = [
  { id: 'stars-desc', label: 'Mais estrelas', sort: 'stars', order: 'desc' },
  { id: 'stars-asc', label: 'Menos estrelas', sort: 'stars', order: 'asc' },
  { id: 'name-asc', label: 'Nome (A-Z)', sort: 'name', order: 'asc' },
  { id: 'pushed-desc', label: 'Atualizados recentemente', sort: 'pushed', order: 'desc' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const DEFAULT_SORT: SortOption = SORT_OPTIONS[0];

const collator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });

type Compare = (a: Repository, b: Repository) => number;

const byName: Compare = (a, b) => collator.compare(a.name, b.name);

const comparators: Record<SortOption['sort'], Compare> = {
  stars: (a, b) => a.stars - b.stars,
  name: byName,
  pushed: (a, b) => Date.parse(a.pushedAt ?? '') - Date.parse(b.pushedAt ?? '') || 0,
};

export function sortRepositories(
  repositories: readonly Repository[],
  { sort, order }: SortOption,
): Repository[] {
  const direction = order === 'asc' ? 1 : -1;
  const compare = comparators[sort];

  return repositories.toSorted((a, b) => direction * compare(a, b) || byName(a, b));
}
