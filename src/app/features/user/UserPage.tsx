import { createSearchParams, Link, useParams } from 'react-router';
import { ApiErrorState } from '../../components/ApiErrorState';
import { ErrorState } from '../../components/ErrorState';
import { PageTitle } from '../../components/PageTitle';
import { UserRepositories } from '../repositories/UserRepositories';
import { UserProfileCard } from './components/UserProfileCard';
import { UserProfileCardPlaceholder } from './components/UserProfileCardPlaceholder';
import { useUser } from './hooks/useUser';
import { isValidUsername } from './utils/isValidUsername';

function SearchInsteadLink({ term }: { term: string }) {
  return (
    <Link
      className="btn btn-primary"
      to={{ pathname: '/', search: `?${createSearchParams({ q: term })}` }}
    >
      Buscar por “{term}”
    </Link>
  );
}

export function UserPage() {
  const { username = '' } = useParams();
  const user = useUser(username);

  // URL digitada à mão com um username impossível: nenhuma requisição é feita.
  if (!isValidUsername(username)) {
    return (
      <>
        <PageTitle title="Username inválido" />
        <ErrorState title="Username inválido" headingAs="h1">
          <p className="text-body-secondary mb-0">
            Usernames do GitHub têm até 39 caracteres: letras, números e hífen.
          </p>
          <SearchInsteadLink term={username} />
        </ErrorState>
      </>
    );
  }

  if (user.isError) {
    return (
      <>
        <PageTitle title={username} />
        <ApiErrorState
          error={user.error}
          onRetry={() => void user.refetch()}
          headingAs="h1"
          notFound={
            <ErrorState title={`Usuário “${username}” não encontrado`} headingAs="h1">
              <SearchInsteadLink term={username} />
            </ErrorState>
          }
        />
      </>
    );
  }

  return (
    <>
      <PageTitle title={user.data?.login ?? username} />
      <div className="row g-4">
        <div className="col-lg-4">
          {user.data ? <UserProfileCard user={user.data} /> : <UserProfileCardPlaceholder />}
        </div>
        <div className="col-lg-8">
          <UserRepositories user={user.data} />
        </div>
      </div>
    </>
  );
}
