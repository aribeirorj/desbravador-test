/** Usuário candidato retornado por uma Busca, conhecido só de forma resumida. */
export type UserSearchResult = {
  login: string;
  avatarUrl: string;
};

export type UserSearchResponse = {
  total: number;
  users: UserSearchResult[];
};
