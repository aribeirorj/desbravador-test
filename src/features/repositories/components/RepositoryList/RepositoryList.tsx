import { formatNumber } from '@/shared/lib/formatters';
import type { Repository } from '@/features/repositories/types/repository';
import { RepositoryCard } from '@/features/repositories/components/RepositoryCard/RepositoryCard';

type RepositoryListProps = {
  repositories: Repository[];
  loaded: number;
  onShowMore: () => void;
};

export function RepositoryList({ repositories, loaded, onShowMore }: RepositoryListProps) {
  const remaining = loaded - repositories.length;

  return (
    <>
      <ol className="list-unstyled row row-cols-1 row-cols-md-2 g-3 mb-0">
        {repositories.map((repository) => (
          <li key={repository.name} className="col">
            <RepositoryCard repository={repository} />
          </li>
        ))}
      </ol>
      {remaining > 0 && (
        <div className="text-center mt-4">
          <button type="button" className="btn btn-outline-primary" onClick={onShowMore}>
            Mostrar mais ({formatNumber(remaining)} restantes)
          </button>
        </div>
      )}
    </>
  );
}
