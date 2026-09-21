import { createBrowserRouter, type RouteObject } from 'react-router';
import { NotFoundPage, RootLayout } from '@/app/layout';
import { REPOSITORY_ROUTE } from '@/features/repositories/paths';
import { USER_ROUTE } from '@/features/user/paths';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: () => null,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/features/search/SearchPage/SearchPage')).SearchPage,
        }),
      },
      {
        path: USER_ROUTE,
        lazy: async () => ({
          Component: (await import('@/features/user/UserPage/UserPage')).UserPage,
        }),
      },
      {
        path: REPOSITORY_ROUTE,
        lazy: async () => ({
          Component: (await import('@/features/repositories/RepositoryPage/RepositoryPage'))
            .RepositoryPage,
        }),
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
];

export const router = createBrowserRouter(routes);
