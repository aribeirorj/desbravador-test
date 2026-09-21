import { useQuery } from '@tanstack/react-query';
import type { User } from '@/features/user/types/user';
import { getUserRepositories } from '@/features/repositories/api/getUserRepositories';

export function useUserRepositories(user: User | undefined) {
  return useQuery({
    queryKey: ['repositories', user?.login.toLowerCase()],
    queryFn: ({ signal }) => getUserRepositories(user!.login, user!.publicRepos, signal),
    enabled: user !== undefined,
  });
}
