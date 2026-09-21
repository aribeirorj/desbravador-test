import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

export function createTestQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

/**
 * Renderiza uma página numa rota, com roteador em memória e um QueryClient
 * novo (sem novas tentativas). Devolve o roteador para inspecionar a URL.
 */
export function renderRoute(
  Component: ComponentType,
  path: string,
  url: string,
  queryClient = createTestQueryClient(),
) {
  const router = createMemoryRouter([{ path, Component }], { initialEntries: [url] });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return router;
}
