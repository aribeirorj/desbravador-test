import { useQuery } from '@tanstack/react-query';
import type { User } from '../../user/types';
import { getUserRepositories } from '../api';

export function repositoriesQueryKey(username: string) {
  return ['repositories', username.toLowerCase()] as const;
}

/** Depende do Usuário carregado: `publicRepos` diz quantas páginas buscar. */
export function useUserRepositories(user: User | undefined) {
  return useQuery({
    queryKey: repositoriesQueryKey(user?.login ?? ''),
    queryFn: ({ signal }) => getUserRepositories(user!.login, user!.publicRepos, signal),
    enabled: user !== undefined,
  });
}
