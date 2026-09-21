import { http } from '@/shared/lib/http';
import { toRepository, type GitHubRepository } from '@/features/repositories/api/toRepository';
import type { Repository } from '@/features/repositories/types/repository';

export async function getRepository(
  owner: string,
  name: string,
  signal?: AbortSignal,
): Promise<Repository> {
  const { data } = await http.get<GitHubRepository>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
    { signal },
  );
  return toRepository(data);
}
