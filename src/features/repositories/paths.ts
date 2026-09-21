import { generatePath } from 'react-router';
import { USER_ROUTE } from '@/features/user/paths';

export const REPOSITORY_ROUTE = `${USER_ROUTE}/repos/:repo`;

export function repositoryPath(owner: string, name: string): string {
  return generatePath(REPOSITORY_ROUTE, { username: owner, repo: name });
}
