import { describe, expect, it } from 'vitest';
import type { Repository } from '@/features/repositories/types/repository';
import { SORT_OPTIONS, sortRepositories } from '@/features/repositories/utils/sortRepositories';
import { makeRepository } from '@/features/repositories/testing/makeRepository';

const [starsDesc, starsAsc, nameAsc, pushedDesc] = SORT_OPTIONS;
const names = (repos: Repository[]) => repos.map((r) => r.name);

describe('sortRepositories', () => {
  const repos = [
    makeRepository({ name: 'beta', stars: 10, pushedAt: '2026-01-01T00:00:00Z' }),
    makeRepository({ name: 'alpha', stars: 50, pushedAt: '2025-01-01T00:00:00Z' }),
    makeRepository({ name: 'gamma', stars: 30, pushedAt: '2026-06-01T00:00:00Z' }),
  ];

  it('ordena por mais estrelas', () => {
    expect(names(sortRepositories(repos, starsDesc))).toEqual(['alpha', 'gamma', 'beta']);
  });

  it('ordena por menos estrelas', () => {
    expect(names(sortRepositories(repos, starsAsc))).toEqual(['beta', 'gamma', 'alpha']);
  });

  it('ordena pelo push mais recente', () => {
    expect(names(sortRepositories(repos, pushedDesc))).toEqual(['gamma', 'beta', 'alpha']);
  });

  it('ordena nomes ignorando maiúsculas e entendendo números', () => {
    const list = [
      makeRepository({ name: 'repo10', stars: 0 }),
      makeRepository({ name: 'Repo2', stars: 0 }),
      makeRepository({ name: 'repo1', stars: 0 }),
    ];
    expect(names(sortRepositories(list, nameAsc))).toEqual(['repo1', 'Repo2', 'repo10']);
  });

  it('desempata por nome, nas duas direções', () => {
    const ties = [
      makeRepository({ name: 'c', stars: 0 }),
      makeRepository({ name: 'a', stars: 0 }),
      makeRepository({ name: 'b', stars: 0 }),
    ];
    expect(names(sortRepositories(ties, starsDesc))).toEqual(['a', 'b', 'c']);
    expect(names(sortRepositories(ties, starsAsc))).toEqual(['a', 'b', 'c']);
  });

  it('não altera a lista original', () => {
    const original = [...repos];
    sortRepositories(repos, starsDesc);
    expect(repos).toEqual(original);
  });
});
