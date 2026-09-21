import { describe, expect, it } from 'vitest';
import type { Repository } from '../types';
import { SORT_OPTIONS, sortRepositories } from '../utils/sortRepositories';

function repo(name: string, stars: number, pushedAt: string | null = null): Repository {
  return { owner: 'x', name, stars, pushedAt, description: null, language: null, url: '' };
}

const [starsDesc, starsAsc, nameAsc, pushedDesc] = SORT_OPTIONS;
const names = (repos: Repository[]) => repos.map((r) => r.name);

describe('sortRepositories', () => {
  const repos = [
    repo('beta', 10, '2026-01-01T00:00:00Z'),
    repo('alpha', 50, '2025-01-01T00:00:00Z'),
    repo('gamma', 30, '2026-06-01T00:00:00Z'),
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
    const list = [repo('repo10', 0), repo('Repo2', 0), repo('repo1', 0)];
    expect(names(sortRepositories(list, nameAsc))).toEqual(['repo1', 'Repo2', 'repo10']);
  });

  it('desempata por nome, nas duas direções', () => {
    const ties = [repo('c', 0), repo('a', 0), repo('b', 0)];
    expect(names(sortRepositories(ties, starsDesc))).toEqual(['a', 'b', 'c']);
    expect(names(sortRepositories(ties, starsAsc))).toEqual(['a', 'b', 'c']);
  });

  it('não altera a lista original', () => {
    const original = [...repos];
    sortRepositories(repos, starsDesc);
    expect(repos).toEqual(original);
  });
});
