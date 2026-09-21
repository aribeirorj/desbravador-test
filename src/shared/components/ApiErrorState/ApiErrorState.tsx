import type { ReactNode } from 'react';
import { isNotFound } from '@/shared/lib/http';
import { ErrorState } from '@/shared/components/ErrorState/ErrorState';

type ApiErrorStateProps = {
  error: unknown;
  onRetry: () => void;
  notFound?: ReactNode;
  headingAs?: 'h1' | 'h2';
};

export function ApiErrorState({ error, onRetry, notFound, headingAs }: ApiErrorStateProps) {
  if (isNotFound(error) && notFound) return notFound;

  return (
    <ErrorState title="Não foi possível carregar os dados" headingAs={headingAs}>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Tentar novamente
      </button>
    </ErrorState>
  );
}
