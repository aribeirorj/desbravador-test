import { createBrowserRouter, type RouteObject } from "react-router";
import { NotFoundPage } from "./NotFoundPage";
import { RootErrorPage } from "./RootErrorPage";
import { RootLayout } from "./RootLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    // Nada a mostrar nos milissegundos em que a primeira página lazy é baixada.
    HydrateFallback: () => null,
    // Último recurso, caso o próprio layout falhe.
    ErrorBoundary: RootErrorPage,
    children: [
      {
        // Erros das páginas aparecem dentro do layout: a navbar continua visível.
        ErrorBoundary: RootErrorPage,
        children: [
          // Cada página vira um arquivo separado, carregado sob demanda.
          {
            index: true,
            lazy: async () => ({
              Component: (await import("../features/search/SearchPage"))
                .SearchPage,
            }),
          },
          {
            path: "users/:username",
            lazy: async () => ({
              Component: (await import("../features/user/UserPage")).UserPage,
            }),
          },
          {
            path: "users/:username/repos/:repo",
            lazy: async () => ({
              Component: (
                await import("../features/repositories/RepositoryPage")
              ).RepositoryPage,
            }),
          },
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
