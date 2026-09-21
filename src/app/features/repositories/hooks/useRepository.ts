import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepository } from '../api';
import type { Repository, RepositoryListing } from '../types';
import { repositoriesQueryKey } from './useUserRepositories';

export function useRepository(owner: string, name: string, enabled: boolean) {
  const queryClient = useQueryClient();

  return useQuery<Repository>({
    queryKey: ['repository', owner.toLowerCase(), name.toLowerCase()],
    queryFn: ({ signal }) => getRepository(owner, name, signal),
    enabled,
    // Vindo da lista, a página aparece na hora com os dados já carregados, mas
    // /repos/{full_name} é chamada mesmo assim (a API pedida pelo enunciado).
    placeholderData: () =>
      queryClient
        .getQueryData<RepositoryListing>(repositoriesQueryKey(owner))
        ?.repositories.find((repository) => repository.name.toLowerCase() === name.toLowerCase()),
  });
}
