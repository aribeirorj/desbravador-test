import { generatePath } from 'react-router';

export const USER_ROUTE = '/users/:username';

export function userPath(username: string): string {
  return generatePath(USER_ROUTE, { username });
}
