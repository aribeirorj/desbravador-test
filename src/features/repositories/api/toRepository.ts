import type { Repository } from '@/features/repositories/types/repository';

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
