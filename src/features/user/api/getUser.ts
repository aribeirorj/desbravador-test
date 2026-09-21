import { http } from '@/shared/lib/http';
import type { User } from '@/features/user/types/user';

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  email: string | null;
  bio: string | null;
  public_repos: number;
};

export async function getUser(username: string, signal?: AbortSignal): Promise<User> {
  const { data } = await http.get<GitHubUser>(`/users/${encodeURIComponent(username)}`, {
    signal,
  });

  return {
    login: data.login,
    name: data.name,
    avatarUrl: data.avatar_url,
    followers: data.followers,
    following: data.following,
    email: data.email,
    bio: data.bio,
    publicRepos: data.public_repos,
  };
}
