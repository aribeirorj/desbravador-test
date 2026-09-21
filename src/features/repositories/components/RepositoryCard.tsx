import { Link, useLocation } from 'react-router';
import { repositoryPath } from '../paths';
import type { Repository } from '../types';
import styles from './RepositoryCard.module.css';
import { Stars } from './Stars';

export function RepositoryCard({ repository }: { repository: Repository }) {
  // A página de detalhes volta para a lista com a mesma Ordenação e quantidade visível.
  const { search } = useLocation();

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column gap-2">
        <h3 className="h6 mb-0 text-break">
          <Link
            to={repositoryPath(repository.owner, repository.name)}
            state={{ listSearch: search }}
            className="stretched-link text-decoration-none"
          >
            {repository.name}
          </Link>
        </h3>
        {repository.description && (
          <p className={`small text-body-secondary mb-0 ${styles.description}`}>
            {repository.description}
          </p>
        )}
        <div className="d-flex gap-3 small mt-auto">
          <Stars count={repository.stars} />
          {repository.language && <span>{repository.language}</span>}
        </div>
      </div>
    </article>
  );
}
