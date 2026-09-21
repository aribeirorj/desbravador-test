import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchUsers } from '../api';

export const MIN_TERM_LENGTH = 3;

export function useUserSearch(term: string) {
  return useQuery({
    queryKey: ['search', term.toLowerCase()],
    queryFn: ({ signal }) => searchUsers(term, signal),
    enabled: term.length >= MIN_TERM_LENGTH,
    // Mantém os resultados anteriores na tela enquanto o novo termo carrega.
    placeholderData: keepPreviousData,
  });
}
