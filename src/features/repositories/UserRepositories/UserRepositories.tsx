import { useMemo } from 'react';
import { ApiErrorState, EmptyState } from '@/shared/components';
import { formatNumber } from '@/shared/lib/formatters';
import type { User } from '@/features/user/types/user';
import {
  RepositoryList,
  RepositoryListPlaceholder,
  SortSelect,
} from '@/features/repositories/components';
import { useSortParams } from '@/features/repositories/hooks/useSortParams';
import { useUserRepositories } from '@/features/repositories/hooks/useUserRepositories';
import { sortRepositories } from '@/features/repositories/utils/sortRepositories';

export function UserRepositories({ user }: { user: User | undefined }) {
  const listing = useUserRepositories(user);
  const { sortOption, limit, setSort, showMore } = useSortParams();

  const sorted = useMemo(
    () => (listing.data ? sortRepositories(listing.data.repositories, sortOption) : []),
    [listing.data, sortOption],
  );

  let content;
  if (listing.isError) {
    content = <ApiErrorState error={listing.error} onRetry={() => void listing.refetch()} />;
  } else if (!listing.data) {
    content = <RepositoryListPlaceholder />;
  } else if (sorted.length === 0) {
    content = <EmptyState>{user?.login} ainda não tem repositórios públicos.</EmptyState>;
  } else {
    const { total } = listing.data;
    content = (
      <>
        {sorted.length < total && (
          <p className="alert alert-info small">
            {user?.login} tem {formatNumber(total)} repositórios. Para preservar o limite de
            requisições do GitHub, a lista considera os {formatNumber(sorted.length)} primeiros em
            ordem alfabética.
          </p>
        )}
        <RepositoryList
          repositories={sorted.slice(0, limit)}
          loaded={sorted.length}
          onShowMore={showMore}
        />
      </>
    );
  }

  return (
    <section>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h2 className="h4 mb-0">
          Repositórios
          {user && (
            <span className="badge text-bg-secondary ms-2 align-middle fs-6">
              {formatNumber(user.publicRepos)}
            </span>
          )}
        </h2>
        <SortSelect value={sortOption} onChange={setSort} />
      </div>
      {content}
    </section>
  );
}
