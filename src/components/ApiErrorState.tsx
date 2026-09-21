import type { ReactNode } from 'react';
import { formatTime } from '../formatters';
import { NetworkError, NotFoundError, RateLimitError } from '../infra/http/errors';
import { ErrorState } from './ErrorState';

type ApiErrorStateProps = {
  error: unknown;
  onRetry: () => void;
  /** O que mostrar num 404: cada página sabe o que "não encontrado" significa. */
  notFound?: ReactNode;
  headingAs?: 'h1' | 'h2';
  /** Ações extras, exibidas junto da mensagem. */
  children?: ReactNode;
};

/** Traduz um erro da API do GitHub em mensagem e ação para o Visitante. */
export function ApiErrorState({
  error,
  onRetry,
  notFound,
  headingAs,
  children,
}: ApiErrorStateProps) {
  if (error instanceof NotFoundError && notFound) return notFound;

  if (error instanceof RateLimitError) {
    const isSearch = error.resource === 'search';

    return (
      <ErrorState
        title={isSearch ? 'Muitas buscas seguidas' : 'Limite de requisições do GitHub atingido'}
        headingAs={headingAs}
      >
        <p className="text-body-secondary mb-0">
          {isSearch
            ? `Tente novamente em ${error.retryInSeconds} s.`
            : `Tente novamente às ${formatTime(error.resetAt)}.`}
        </p>
        {children}
      </ErrorState>
    );
  }

  const retry = (
    <button type="button" className="btn btn-primary" onClick={onRetry}>
      Tentar novamente
    </button>
  );

  if (error instanceof NetworkError) {
    return (
      <ErrorState title="Sem conexão com o GitHub" headingAs={headingAs}>
        <p className="text-body-secondary mb-0">Verifique sua internet e tente de novo.</p>
        {retry}
        {children}
      </ErrorState>
    );
  }

  return (
    <ErrorState title="Não foi possível carregar os dados" headingAs={headingAs}>
      {retry}
      {children}
    </ErrorState>
  );
}
