import { Link, useParams } from 'react-router';
import { ApiErrorState, ErrorState, PageTitle } from '@/shared/components';
import { userPath } from '@/features/user/paths';
import {
  RepositoryDetails,
  RepositoryDetailsPlaceholder,
} from '@/features/repositories/components';
import { useRepository } from '@/features/repositories/hooks/useRepository';

export function RepositoryPage() {
  const { username: owner = '', repo: name = '' } = useParams();
  const repository = useRepository(owner, name);

  let content;
  if (repository.isError)
    content = (
      <ApiErrorState
        error={repository.error}
        onRetry={() => void repository.refetch()}
        headingAs="h1"
        notFound={
          <ErrorState title="Repositório não encontrado" headingAs="h1">
            <Link className="btn btn-primary" to={userPath(owner)}>
              Ver os repositórios de {owner}
            </Link>
          </ErrorState>
        }
      />
    );
  else if (!repository.data) content = <RepositoryDetailsPlaceholder />;
  else content = <RepositoryDetails repository={repository.data} />;

  return (
    <>
      <PageTitle title={`${owner}/${name}`} />
      <Link to={userPath(owner)} className="d-inline-block mb-3 text-decoration-none">
        ← Voltar para {owner}
      </Link>
      {content}
    </>
  );
}
