import { createSearchParams } from 'react-router';

export function searchPath(term: string): string {
  return `/?${createSearchParams({ q: term })}`;
}
