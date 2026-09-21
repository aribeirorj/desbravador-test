import { useSearchParams } from 'react-router';
import { readSortParams, withMore, withSort } from '@/features/repositories/utils/sortParams';
import { SORT_OPTIONS } from '@/features/repositories/utils/sortRepositories';

export function useSortParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { option, limit } = readSortParams(searchParams);

  const navigation = { replace: true, preventScrollReset: true };

  return {
    sortOption: option,
    limit,
    setSort: (id: string) => {
      const next = SORT_OPTIONS.find((o) => o.id === id);
      if (next) setSearchParams((params) => withSort(params, next), navigation);
    },
    showMore: () => setSearchParams((params) => withMore(params, limit), navigation),
  };
}
