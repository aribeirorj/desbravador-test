import { useSearchParams } from 'react-router';
import { readSortParams, withMore, withSort } from '../utils/sortParams';
import { SORT_OPTIONS } from '../utils/sortRepositories';

/** Ordenação e quantidade visível vivem na URL: Voltar e F5 restauram a lista. */
export function useSortParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { option, limit } = readSortParams(searchParams);

  // `replace`: não cria histórico por clique; `preventScrollReset`: não pula para o topo.
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
