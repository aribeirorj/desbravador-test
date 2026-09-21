import { DEFAULT_SORT, SORT_OPTIONS, type SortOption } from './sortRepositories';

/** Repositórios exibidos por vez ("Mostrar mais" soma outros 30). */
export const PAGE_SIZE = 30;

/** Lê Ordenação e quantidade visível da URL; valores inválidos voltam ao padrão. */
export function readSortParams(params: URLSearchParams): { option: SortOption; limit: number } {
  const option =
    SORT_OPTIONS.find((o) => o.sort === params.get('sort') && o.order === params.get('order')) ??
    DEFAULT_SORT;
  const limit = Number(params.get('limit'));

  return { option, limit: Number.isInteger(limit) && limit > PAGE_SIZE ? limit : PAGE_SIZE };
}

/** Troca a Ordenação e remove o `limit`: o Visitante vê o topo da nova ordem. O padrão não aparece na URL. */
export function withSort(params: URLSearchParams, option: SortOption): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete('limit');
  next.delete('sort');
  next.delete('order');
  if (option !== DEFAULT_SORT) {
    next.set('sort', option.sort);
    next.set('order', option.order);
  }
  return next;
}

/** Mostra mais uma página de Repositórios. */
export function withMore(params: URLSearchParams, currentLimit: number): URLSearchParams {
  const next = new URLSearchParams(params);
  next.set('limit', String(currentLimit + PAGE_SIZE));
  return next;
}
