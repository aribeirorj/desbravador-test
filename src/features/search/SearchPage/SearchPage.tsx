import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ApiErrorState, EmptyState, PageTitle } from '@/shared/components';
import { useDebouncedCallback } from '@/shared/hooks/useDebouncedCallback';
import { SearchForm, SearchResults } from '@/features/search/components';
import { MIN_TERM_LENGTH, useUserSearch } from '@/features/search/hooks/useUserSearch';
import styles from '@/features/search/SearchPage/SearchPage.module.css';
import { normalizeSearchTerm } from '@/features/search/utils/normalizeSearchTerm';

const DEBOUNCE_MS = 400;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('q') ?? '';

  const [draft, setDraft] = useState(term);
  const [committedTerm, setCommittedTerm] = useState(term);

  if (term !== committedTerm) {
    setCommittedTerm(term);
    setDraft(term);
  }

  const commit = useCallback(
    (value: string) => {
      const normalized = normalizeSearchTerm(value);
      setCommittedTerm(normalized);
      setSearchParams(normalized ? { q: normalized } : {}, { replace: true });
    },
    [setSearchParams],
  );
  const debouncedCommit = useDebouncedCallback(commit, DEBOUNCE_MS);

  const search = useUserSearch(term);
  const draftLength = normalizeSearchTerm(draft).length;
  const isTooShort = draftLength > 0 && draftLength < MIN_TERM_LENGTH;
  const hasTerm = term.length >= MIN_TERM_LENGTH;

  return (
    <>
      <PageTitle title={term || undefined} />
      <section className={`py-4 py-md-5 mx-auto ${styles.hero}`}>
        <h1 className="h2 text-center mb-2">Explore os repositórios mais populares</h1>
        <p className="lead text-center text-body-secondary mb-4">
          Busque um usuário do GitHub pelo username ou pelo nome.
        </p>

        <SearchForm
          value={draft}
          onChange={(value) => {
            setDraft(value);
            debouncedCommit.run(value);
          }}
          onSubmit={() => {
            debouncedCommit.cancel();
            commit(draft);
          }}
          busy={hasTerm && search.isFetching}
          autoFocus
        />

        <div className="mt-4">
          {isTooShort ? (
            <EmptyState>Digite ao menos {MIN_TERM_LENGTH} caracteres.</EmptyState>
          ) : !hasTerm ? null : search.isError ? (
            <ApiErrorState error={search.error} onRetry={() => void search.refetch()} />
          ) : !search.data ? null : search.data.total === 0 ? (
            <EmptyState>Nenhum usuário encontrado para "{term}".</EmptyState>
          ) : (
            <SearchResults total={search.data.total} users={search.data.users} />
          )}
        </div>
      </section>
    </>
  );
}
