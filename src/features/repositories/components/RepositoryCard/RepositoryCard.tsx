import { Link } from 'react-router';
import { repositoryPath } from '@/features/repositories/paths';
import type { Repository } from '@/features/repositories/types/repository';
import styles from '@/features/repositories/components/RepositoryCard/RepositoryCard.module.css';
import { Stars } from '@/features/repositories/components/Stars/Stars';

export function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column gap-2">
        <h3 className="h6 mb-0 text-break">
          <Link
            to={repositoryPath(repository.owner, repository.name)}
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
