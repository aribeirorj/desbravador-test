import { http } from '@/shared/lib/http';
import { toRepository, type GitHubRepository } from '@/features/repositories/api/toRepository';
import type { RepositoryListing } from '@/features/repositories/types/repository';

const PER_PAGE = 100;
const MAX_PAGES = 10;

export async function getUserRepositories(
  username: string,
  publicRepos: number,
  signal?: AbortSignal,
): Promise<RepositoryListing> {
  const pages = Math.min(Math.ceil(publicRepos / PER_PAGE), MAX_PAGES);

  const responses = await Promise.all(
    Array.from({ length: pages }, (_, index) =>
      http.get<GitHubRepository[]>(`/users/${encodeURIComponent(username)}/repos`, {
        params: { per_page: PER_PAGE, page: index + 1 },
        signal,
      }),
    ),
  );

  return {
    repositories: responses.flatMap((response) => response.data.map(toRepository)),
    total: publicRepos,
  };
}
