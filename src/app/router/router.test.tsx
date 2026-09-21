import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { routes } from '@/app/router/router';

vi.mock('@/features/user/api/getUser', () => ({ getUser: vi.fn(() => new Promise(() => {})) }));

function renderAt(path: string) {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />
    </QueryClientProvider>,
  );
}

describe('rotas', () => {
  it('mostra a página "não encontrado" dentro do layout para rotas inexistentes', async () => {
    renderAt('/rota/que/nao/existe');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Página não encontrada' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub Explorer' })).toBeInTheDocument();
  });

  it('carrega a página inicial sob demanda', async () => {
    renderAt('/');

    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('não mostra a busca no header fora da página inicial', async () => {
    renderAt('/users/torvalds');

    expect(await screen.findByRole('heading', { name: 'Repositórios' })).toBeInTheDocument();
    expect(screen.queryByRole('search')).not.toBeInTheDocument();
  });
});
