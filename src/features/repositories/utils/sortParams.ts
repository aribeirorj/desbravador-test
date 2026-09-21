import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  type SortOption,
} from '@/features/repositories/utils/sortRepositories';

export const PAGE_SIZE = 30;

export function readSortParams(params: URLSearchParams): { option: SortOption; limit: number } {
  const option =
    SORT_OPTIONS.find((o) => o.sort === params.get('sort') && o.order === params.get('order')) ??
    DEFAULT_SORT;
  const limit = Number(params.get('limit'));

  return { option, limit: Number.isInteger(limit) && limit > PAGE_SIZE ? limit : PAGE_SIZE };
}

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

export function withMore(params: URLSearchParams, currentLimit: number): URLSearchParams {
  const next = new URLSearchParams(params);
  next.set('limit', String(currentLimit + PAGE_SIZE));
  return next;
}
