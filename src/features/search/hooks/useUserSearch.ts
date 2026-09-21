import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchUsers } from '@/features/search/api/searchUsers';

export const MIN_TERM_LENGTH = 3;

export function useUserSearch(term: string) {
  return useQuery({
    queryKey: ['search', term.toLowerCase()],
    queryFn: ({ signal }) => searchUsers(term, signal),
    enabled: term.length >= MIN_TERM_LENGTH,
    placeholderData: keepPreviousData,
  });
}
