import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api';
import { isValidUsername } from '../utils/isValidUsername';

export function useUser(username: string) {
  return useQuery({
    // O GitHub não diferencia maiúsculas: /users/Torvalds e /users/torvalds dividem o cache.
    queryKey: ['user', username.toLowerCase()],
    queryFn: ({ signal }) => getUser(username, signal),
    enabled: isValidUsername(username),
  });
}
