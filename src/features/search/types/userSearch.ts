type UserSearchResult = {
  login: string;
  avatarUrl: string;
};

export type UserSearchResponse = {
  total: number;
  users: UserSearchResult[];
};
