import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';
// import { ApiErrorState } from '../../components/ApiErrorState';
import { EmptyState } from '../../components/EmptyState';
import { PageTitle } from '../../components/PageTitle';
import { formatNumber } from '../../app/formatters';
import { useDebouncedCallback } from '../../app/hooks/useDebouncedCallback';
// import { userPath } from '../user/paths';
// import { isValidUsername } from '../user/utils/isValidUsername';
import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
import { MIN_TERM_LENGTH, useUserSearch } from './hooks/useUserSearch';
import styles from './SearchPage.module.css';
import { normalizeSearchTerm } from './utils/normalizeSearchTerm';

const DEBOUNCE_MS = 400;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('q') ?? '';

  // O campo tem estado próprio; a URL (?q=) só é atualizada após o debounce.
  const [draft, setDraft] = useState(term);
  const [committedTerm, setCommittedTerm] = useState(term);

  // A URL mudou por fora (Voltar, link do logo): o campo acompanha.
  if (term !== committedTerm) {
    setCommittedTerm(term);
    setDraft(term);
  }

  const commit = useCallback(
    (value: string) => {
      const normalized = normalizeSearchTerm(value);
      setCommittedTerm(normalized);
      // `replace`: digitar não cria uma entrada no histórico por tecla.
      setSearchParams(normalized ? { q: normalized } : {}, { replace: true });
    },
    [setSearchParams],
  );
  const debouncedCommit = useDebouncedCallback(commit, DEBOUNCE_MS);

  const search = useUserSearch(term);
  const draftLength = normalizeSearchTerm(draft).length;
  const isTooShort = draftLength > 0 && draftLength < MIN_TERM_LENGTH;
  const hasTerm = term.length >= MIN_TERM_LENGTH;

  let status = '';
  if (hasTerm && search.isFetching) status = 'Buscando…';
  else if (hasTerm && search.data) {
    const { total } = search.data;
    status = `${formatNumber(total)} ${total === 1 ? 'usuário encontrado' : 'usuários encontrados'}`;
  }

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
            // Enter executa a Busca na hora, sem esperar o debounce.
            debouncedCommit.cancel();
            commit(draft);
          }}
          busy={hasTerm && search.isFetching}
          autoFocus
        />

        <p className="visually-hidden" role="status">
          {status}
        </p>

        <div className="mt-4">
          {isTooShort ? (
            <EmptyState>Digite ao menos {MIN_TERM_LENGTH} caracteres.</EmptyState>
          ) : !hasTerm ? null : !search.data ? null : search.data.total === 0 ? (
            <EmptyState>Nenhum usuário encontrado para “{term}”.</EmptyState>
          ) : (
            <SearchResults total={search.data.total} users={search.data.users} />
          )}
        </div>
      </section>
    </>
  );
}
