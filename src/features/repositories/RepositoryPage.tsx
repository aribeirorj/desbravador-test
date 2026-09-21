import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { ApiErrorState } from '../../components/ApiErrorState';
import { ErrorState } from '../../components/ErrorState';
import { PageTitle } from '../../components/PageTitle';
import { userPath } from '../user/paths';
import { isValidUsername } from '../user/utils/isValidUsername';
import { RepositoryDetails } from './components/RepositoryDetails';
import { RepositoryDetailsPlaceholder } from './components/RepositoryDetailsPlaceholder';
import { useRepository } from './hooks/useRepository';
import { isValidRepositoryName } from './utils/isValidRepositoryName';

type ListState = { listSearch?: string } | null;

function BackToList({ owner }: { owner: string }) {
  const navigate = useNavigate();
  const listSearch = (useLocation().state as ListState)?.listSearch;
  const cameFromList = listSearch !== undefined;

  return (
    <Link
      to={userPath(owner, listSearch)}
      onClick={(event) => {
        // Vindo da lista, "voltar" de verdade restaura a Ordenação, o "Mostrar mais" e a rolagem.
        if (!cameFromList) return;
        event.preventDefault();
        navigate(-1);
      }}
      className="d-inline-block mb-3 text-decoration-none"
    >
      <span aria-hidden="true">←</span> Voltar para {owner}
    </Link>
  );
}

export function RepositoryPage() {
  const { username: owner = '', repo: name = '' } = useParams();
  const isValid = isValidUsername(owner) && isValidRepositoryName(name);
  const repository = useRepository(owner, name, isValid);

  const notFound = (
    <ErrorState title="Repositório não encontrado" headingAs="h1">
      <Link className="btn btn-primary" to={userPath(owner)}>
        Ver os repositórios de {owner}
      </Link>
    </ErrorState>
  );

  let content;
  if (!isValid) content = notFound;
  else if (repository.isError)
    content = (
      <ApiErrorState
        error={repository.error}
        onRetry={() => void repository.refetch()}
        headingAs="h1"
        notFound={notFound}
      />
    );
  else if (!repository.data) content = <RepositoryDetailsPlaceholder />;
  else content = <RepositoryDetails repository={repository.data} />;

  return (
    <>
      <PageTitle title={`${owner}/${name}`} />
      <BackToList owner={owner} />
      {content}
    </>
  );
}
