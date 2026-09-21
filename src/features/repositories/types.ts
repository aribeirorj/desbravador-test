/** Projeto de código público de um Usuário (forks incluídos). */
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
  /** Total de Repositórios públicos do Usuário (pode ser maior que o carregado). */
  total: number;
};
