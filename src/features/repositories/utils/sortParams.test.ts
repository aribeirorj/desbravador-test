import { describe, expect, it } from 'vitest';
import {
  PAGE_SIZE,
  readSortParams,
  withMore,
  withSort,
} from '@/features/repositories/utils/sortParams';
import { DEFAULT_SORT, SORT_OPTIONS } from '@/features/repositories/utils/sortRepositories';

const params = (query: string) => new URLSearchParams(query);

describe('readSortParams', () => {
  it('usa o padrão sem parâmetros', () => {
    expect(readSortParams(params(''))).toEqual({ option: DEFAULT_SORT, limit: PAGE_SIZE });
  });

  it('lê uma ordenação válida e o limit', () => {
    const { option, limit } = readSortParams(params('sort=name&order=asc&limit=90'));
    expect(option.id).toBe('name-asc');
    expect(limit).toBe(90);
  });

  it('volta ao padrão com valores inválidos', () => {
    expect(readSortParams(params('sort=xpto&order=asc&limit=abc'))).toEqual({
      option: DEFAULT_SORT,
      limit: PAGE_SIZE,
    });
    expect(readSortParams(params('sort=name&order=desc')).option).toBe(DEFAULT_SORT);
  });
});

describe('withSort', () => {
  it('troca a ordenação e remove o limit', () => {
    const next = withSort(params('limit=90'), SORT_OPTIONS[2]);
    expect(next.toString()).toBe('sort=name&order=asc');
  });

  it('não coloca a ordenação padrão na URL', () => {
    expect(withSort(params('sort=name&order=asc&limit=60'), DEFAULT_SORT).toString()).toBe('');
  });
});

describe('withMore', () => {
  it('soma uma página ao limit, preservando a ordenação', () => {
    expect(withMore(params('sort=name&order=asc'), 30).toString()).toBe(
      'sort=name&order=asc&limit=60',
    );
  });
});
