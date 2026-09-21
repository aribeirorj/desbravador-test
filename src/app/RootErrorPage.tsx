import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { ErrorState } from '../components/ErrorState';
import { PageTitle } from '../components/PageTitle';
import { NotFoundPage } from './NotFoundPage';

/** Erro inesperado no código: mensagem amigável em vez de tela branca. */
export function RootErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;

  return (
    <>
      <PageTitle title="Erro" />
      <ErrorState title="Algo deu errado" headingAs="h1">
        <p className="text-body-secondary mb-0">
          Um erro inesperado impediu esta página de ser exibida.
        </p>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary" onClick={() => location.reload()}>
            Recarregar a página
          </button>
          <Link className="btn btn-outline-secondary" to="/">
            Ir para o início
          </Link>
        </div>
      </ErrorState>
    </>
  );
}
