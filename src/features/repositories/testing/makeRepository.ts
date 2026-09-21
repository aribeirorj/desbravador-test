import type { Repository } from '@/features/repositories/types/repository';

export function makeRepository(overrides: Partial<Repository> = {}): Repository {
  const owner = overrides.owner ?? 'torvalds';
  const name = overrides.name ?? 'linux';

  return {
    owner,
    name,
    description: 'Linux kernel source tree',
    stars: 214532,
    language: 'C',
    url: `https://github.com/${owner}/${name}`,
    pushedAt: null,
    ...overrides,
  };
}
