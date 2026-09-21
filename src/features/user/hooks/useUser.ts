import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/features/user/api/getUser';

export function useUser(username: string) {
  return useQuery({
    queryKey: ['user', username.toLowerCase()],
    queryFn: ({ signal }) => getUser(username, signal),
  });
}
