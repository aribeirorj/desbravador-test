export type User = {
  login: string;
  name: string | null;
  avatarUrl: string;
  followers: number;
  following: number;
  email: string | null;
  bio: string | null;
  publicRepos: number;
};
