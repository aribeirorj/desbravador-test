import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { notFoundError } from '@/shared/testing/notFoundError';
import { renderRoute } from '@/shared/testing/renderRoute';
import { getRepository } from '@/features/repositories/api/getRepository';
import { RepositoryPage } from '@/features/repositories/RepositoryPage/RepositoryPage';
import { makeRepository } from '@/features/repositories/testing/makeRepository';

vi.mock('@/features/repositories/api/getRepository', () => ({ getRepository: vi.fn() }));

const linux = makeRepository();

function renderRepositoryPage(url: string) {
  return renderRoute(RepositoryPage, '/users/:username/repos/:repo', url);
}

describe('RepositoryPage', () => {
  beforeEach(() => {
    vi.mocked(getRepository).mockReset().mockResolvedValue(linux);
  });

  it('mostra os detalhes do repositório, com link externo seguro', async () => {
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

  it('mostra "Não informado" para descrição e linguagem vazias', async () => {
    vi.mocked(getRepository).mockResolvedValue({ ...linux, description: null, language: null });
    renderRepositoryPage('/users/torvalds/repos/linux');

    expect(await screen.findAllByText('Não informado')).toHaveLength(2);
  });

  it('oferece voltar ao perfil quando o repositório não existe', async () => {
    vi.mocked(getRepository).mockRejectedValue(notFoundError());
    renderRepositoryPage('/users/torvalds/repos/nada');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Repositório não encontrado' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Ver os repositórios de torvalds' })).toHaveAttribute(
      'href',
      '/users/torvalds',
    );
  });
});
