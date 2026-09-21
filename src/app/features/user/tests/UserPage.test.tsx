import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../../infra/http/errors';
import { renderRoute } from '../../../testing/renderRoute';
import { getUserRepositories } from '../../repositories/api';
import type { Repository } from '../../repositories/types';
import { getUser } from '../api';
import type { User } from '../types';
import { UserPage } from '../UserPage';

vi.mock('../api', () => ({ getUser: vi.fn() }));
vi.mock('../../repositories/api', () => ({ getUserRepositories: vi.fn() }));

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

function repo(name: string, stars: number): Repository {
  const url = `https://github.com/torvalds/${name}`;
  return { owner: 'torvalds', name, stars, url, description: null, language: 'C', pushedAt: null };
}

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
        repositories: [repo('subsurface', 2800), repo('linux', 214532), repo('libdc', 1700)],
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

  it('lista os Repositórios por mais Estrelas e reordena pelo seletor', async () => {
    const router = renderUserPage('torvalds');

    await screen.findByRole('link', { name: 'linux' });
    expect(repositoryNames()).toEqual(['linux', 'subsurface', 'libdc']);
    expect(getUserRepositories).toHaveBeenCalledWith('torvalds', 11, expect.any(AbortSignal));

    await userEvent.selectOptions(screen.getByLabelText('Ordenar por'), 'Nome (A–Z)');

    expect(repositoryNames()).toEqual(['libdc', 'linux', 'subsurface']);
    await userEvent.selectOptions(screen.getByLabelText('Ordenar por'), 'Menos estrelas');

    expect(repositoryNames()).toEqual(['libdc', 'subsurface', 'linux']);
    expect(router.state.location.search).toBe('?sort=stars&order=asc');
  });

  it('oferece a Busca quando o Usuário não existe', async () => {
    vi.mocked(getUser).mockRejectedValue(new NotFoundError());
    renderUserPage('linus');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Usuário “linus” não encontrado' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Buscar por “linus”' })).toHaveAttribute(
      'href',
      '/?q=linus',
    );
  });

  it('não faz requisição para um username impossível', () => {
    renderUserPage('nome com espaço');

    expect(screen.getByRole('heading', { level: 1, name: 'Username inválido' })).toBeVisible();
    expect(getUser).not.toHaveBeenCalled();
  });
});
