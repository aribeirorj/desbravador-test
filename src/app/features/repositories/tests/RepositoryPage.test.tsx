import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../../infra/http/errors';
import { createTestQueryClient, renderRoute } from '../../../testing/renderRoute';
import { getRepository } from '../api';
import { repositoriesQueryKey } from '../hooks/useUserRepositories';
import { RepositoryPage } from '../RepositoryPage';
import type { Repository, RepositoryListing } from '../types';

vi.mock('../api', () => ({ getRepository: vi.fn() }));

const linux: Repository = {
  owner: 'torvalds',
  name: 'linux',
  description: 'Linux kernel source tree',
  stars: 214532,
  language: 'C',
  url: 'https://github.com/torvalds/linux',
  pushedAt: null,
};

function renderRepositoryPage(url: string, queryClient = createTestQueryClient()) {
  return renderRoute(RepositoryPage, '/users/:username/repos/:repo', url, queryClient);
}

describe('RepositoryPage', () => {
  beforeEach(() => {
    vi.mocked(getRepository).mockReset().mockResolvedValue(linux);
  });

  it('mostra os 5 campos do enunciado, com link externo seguro', async () => {
    renderRepositoryPage('/users/torvalds/repos/linux');

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('torvalds / linux');
    expect(screen.getByText('Linux kernel source tree')).toBeVisible();
    expect(screen.getByText('214.532')).toBeVisible();
    expect(screen.getByText('C')).toBeVisible();

    const external = screen.getByRole('link', { name: /Ver no GitHub/ });
    expect(external).toHaveAttribute('href', 'https://github.com/torvalds/linux');
    expect(external).toHaveAttribute('rel', 'noopener noreferrer');
    expect(external).toHaveAttribute('target', '_blank');
  });

  it('vindo da lista, aparece na hora e ainda assim chama a API de detalhes', async () => {
    const queryClient = createTestQueryClient();
    const listing: RepositoryListing = { total: 1, repositories: [{ ...linux, stars: 1 }] };
    queryClient.setQueryData(repositoriesQueryKey('torvalds'), listing);

    renderRepositoryPage('/users/torvalds/repos/linux', queryClient);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('torvalds / linux');
    expect(await screen.findByText('214.532')).toBeVisible();
    expect(getRepository).toHaveBeenCalledWith('torvalds', 'linux', expect.any(AbortSignal));
  });

  it('mostra "Não informado" para descrição e linguagem vazias', async () => {
    vi.mocked(getRepository).mockResolvedValue({ ...linux, description: null, language: null });
    renderRepositoryPage('/users/torvalds/repos/linux');

    expect(await screen.findAllByText('Não informado')).toHaveLength(2);
  });

  it('oferece voltar ao perfil quando o Repositório não existe', async () => {
    vi.mocked(getRepository).mockRejectedValue(new NotFoundError());
    renderRepositoryPage('/users/torvalds/repos/nada');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Repositório não encontrado' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Ver os repositórios de torvalds' })).toHaveAttribute(
      'href',
      '/users/torvalds',
    );
  });

  it('não faz requisição para um nome impossível', () => {
    renderRepositoryPage('/users/torvalds/repos/..');

    expect(screen.getByRole('heading', { name: 'Repositório não encontrado' })).toBeVisible();
    expect(getRepository).not.toHaveBeenCalled();
  });
});
