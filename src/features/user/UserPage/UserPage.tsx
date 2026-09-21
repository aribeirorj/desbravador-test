import { Link, useParams } from 'react-router';
import { ApiErrorState, ErrorState, PageTitle } from '@/shared/components';
import { searchPath } from '@/features/search/paths';
import { UserRepositories } from '@/features/repositories/UserRepositories/UserRepositories';
import { UserProfileCard, UserProfileCardPlaceholder } from '@/features/user/components';
import { useUser } from '@/features/user/hooks/useUser';

function SearchInsteadLink({ term }: { term: string }) {
  return (
    <Link className="btn btn-primary" to={searchPath(term)}>
      Buscar por "{term}"
    </Link>
  );
}

export function UserPage() {
  const { username = '' } = useParams();
  const user = useUser(username);

  if (user.isError) {
    return (
      <>
        <PageTitle title={username} />
        <ApiErrorState
          error={user.error}
          onRetry={() => void user.refetch()}
          headingAs="h1"
          notFound={
            <ErrorState title={`Usuário "${username}" não encontrado`} headingAs="h1">
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
