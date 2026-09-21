import { http } from '../../infra/http/client';
import type { Repository, RepositoryListing } from './types';

/** Máximo aceito pela API por página. */
const PER_PAGE = 100;
/** Teto de páginas (1000 Repositórios) para não esgotar o limite de 60 requisições/hora. */
export const MAX_PAGES = 10;

export type GitHubRepository = {
  name: string;
  owner: { login: string };
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  pushed_at: string | null;
};

export function toRepository(data: GitHubRepository): Repository {
  return {
    owner: data.owner.login,
    name: data.name,
    description: data.description,
    stars: data.stargazers_count,
    language: data.language,
    url: data.html_url,
    pushedAt: data.pushed_at,
  };
}

/**
 * A API não ordena por Estrelas e devolve no máximo 100 por página, em ordem
 * alfabética. Para ordenar corretamente, buscamos todas as páginas em paralelo.
 */
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
