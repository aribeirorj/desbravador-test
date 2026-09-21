import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { notFoundError } from '@/shared/testing/notFoundError';
import { renderRoute } from '@/shared/testing/renderRoute';
import { getUserRepositories } from '@/features/repositories/api/getUserRepositories';
import { makeRepository } from '@/features/repositories/testing/makeRepository';
import { getUser } from '@/features/user/api/getUser';
import type { User } from '@/features/user/types/user';
import { UserPage } from '@/features/user/UserPage/UserPage';

vi.mock('@/features/user/api/getUser', () => ({ getUser: vi.fn() }));
vi.mock('@/features/repositories/api/getUserRepositories', () => ({
  getUserRepositories: vi.fn(),
}));

const torvalds: User = {
  login: 'torvalds',
  name: 'Linus Torvalds',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
  followers: 283456,
  following: 0,
  email: null,
  bio: null,
  publicRepos: 11,
};

const repositoryNames = () =>
  screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

function renderUserPage(username: string) {
  return renderRoute(UserPage, '/users/:username', `/users/${username}`);
}

describe('UserPage', () => {
  beforeEach(() => {
    vi.mocked(getUser).mockReset().mockResolvedValue(torvalds);
    vi.mocked(getUserRepositories)
      .mockReset()
      .mockResolvedValue({
        total: 3,
        repositories: [
          makeRepository({ name: 'subsurface', stars: 2800 }),
          makeRepository({ name: 'linux', stars: 214532 }),
          makeRepository({ name: 'libdc', stars: 1700 }),
        ],
      });
  });

  it('mostra o perfil com os campos obrigatórios, e "Não informado" quando vazios', async () => {
    renderUserPage('torvalds');

    expect(await screen.findByRole('heading', { level: 1, name: 'Linus Torvalds' })).toBeVisible();
    expect(screen.getByRole('img', { name: 'Avatar de torvalds' })).toBeVisible();
    expect(screen.getByText('283.456')).toBeVisible();

    const email = screen.getByText('E-mail').closest('div')!;
    expect(within(email).getByText('Não informado')).toBeVisible();
    const bio = screen.getByText('Bio').closest('div')!;
    expect(within(bio).getByText('Não informado')).toBeVisible();
  });

  it('lista os repositórios por mais estrelas e reordena pelo seletor', async () => {
    const router = renderUserPage('torvalds');

    await screen.findByRole('link', { name: 'linux' });
    expect(repositoryNames()).toEqual(['linux', 'subsurface', 'libdc']);
    expect(getUserRepositories).toHaveBeenCalledWith('torvalds', 11, expect.any(AbortSignal));

    await userEvent.selectOptions(screen.getByLabelText('Ordenar por'), 'Nome (A-Z)');

    expect(repositoryNames()).toEqual(['libdc', 'linux', 'subsurface']);
    await userEvent.selectOptions(screen.getByLabelText('Ordenar por'), 'Menos estrelas');

    expect(repositoryNames()).toEqual(['libdc', 'subsurface', 'linux']);
    expect(router.state.location.search).toBe('?sort=stars&order=asc');
  });

  it('oferece a busca quando o usuário não existe', async () => {
    vi.mocked(getUser).mockRejectedValue(notFoundError());
    renderUserPage('linus');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Usuário "linus" não encontrado' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Buscar por "linus"' })).toHaveAttribute(
      'href',
      '/?q=linus',
    );
  });
});
