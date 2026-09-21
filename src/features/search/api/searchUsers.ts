import { http } from '@/shared/lib/http';
import type { UserSearchResponse } from '@/features/search/types/userSearch';

const SEARCH_PAGE_SIZE = 10;

type GitHubUserSearchResponse = {
  total_count: number;
  items: { login: string; avatar_url: string }[];
};

export async function searchUsers(term: string, signal?: AbortSignal): Promise<UserSearchResponse> {
  const { data } = await http.get<GitHubUserSearchResponse>('/search/users', {
    params: { q: term, per_page: SEARCH_PAGE_SIZE },
    signal,
  });

  return {
    total: data.total_count,
    users: data.items.map((item) => ({ login: item.login, avatarUrl: item.avatar_url })),
  };
}
