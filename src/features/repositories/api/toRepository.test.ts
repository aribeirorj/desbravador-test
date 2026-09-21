import { describe, expect, it } from 'vitest';
import { toRepository, type GitHubRepository } from '@/features/repositories/api/toRepository';

describe('toRepository', () => {
  it('converte o JSON do GitHub para Repository, preservando null', () => {
    const data: GitHubRepository = {
      name: 'linux',
      owner: { login: 'torvalds' },
      description: null,
      stargazers_count: 214532,
      language: null,
      html_url: 'https://github.com/torvalds/linux',
      pushed_at: '2026-09-17T10:00:00Z',
    };

    expect(toRepository(data)).toEqual({
      owner: 'torvalds',
      name: 'linux',
      description: null,
      stars: 214532,
      language: null,
      url: 'https://github.com/torvalds/linux',
      pushedAt: '2026-09-17T10:00:00Z',
    });
  });
});
