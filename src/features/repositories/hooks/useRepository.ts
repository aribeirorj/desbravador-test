import { useQuery } from '@tanstack/react-query';
import { getRepository } from '@/features/repositories/api/getRepository';

export function useRepository(owner: string, name: string) {
  return useQuery({
    queryKey: ['repository', owner.toLowerCase(), name.toLowerCase()],
    queryFn: ({ signal }) => getRepository(owner, name, signal),
  });
}
