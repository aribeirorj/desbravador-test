import { Link } from 'react-router';
import { ErrorState, PageTitle } from '@/shared/components';

export function NotFoundPage() {
  return (
    <>
      <PageTitle title="Página não encontrada" />
      <ErrorState title="Página não encontrada" headingAs="h1">
        <p className="text-body-secondary mb-0">O endereço acessado não existe.</p>
        <Link className="btn btn-primary" to="/">
          Ir para o início
        </Link>
      </ErrorState>
    </>
  );
}
