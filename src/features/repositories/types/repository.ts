export type Repository = {
  owner: string;
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  url: string;
  pushedAt: string | null;
};

export type RepositoryListing = {
  repositories: Repository[];
  total: number;
};
