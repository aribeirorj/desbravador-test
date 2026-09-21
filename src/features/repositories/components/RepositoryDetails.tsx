import { InfoItem, InfoList } from '../../../components/InfoList';
import type { Repository } from '../types';
import { Stars } from './Stars';

export function RepositoryDetails({ repository }: { repository: Repository }) {
  // Defesa extra: só vira link externo o que de fato aponta para o GitHub.
  const isGitHubUrl = repository.url.startsWith('https://github.com/');

  return (
    <article className="card shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
          <h1 className="h3 mb-0 text-break">
            <span className="text-body-secondary fw-normal">{repository.owner} /</span>{' '}
            {repository.name}
          </h1>
          {isGitHubUrl && (
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Ver no GitHub <span aria-hidden="true">↗</span>
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          )}
        </div>

        <InfoList>
          <InfoItem label="Descrição">{repository.description}</InfoItem>
          <InfoItem label="Estrelas">
            <Stars count={repository.stars} />
          </InfoItem>
          <InfoItem label="Linguagem">{repository.language}</InfoItem>
        </InfoList>
      </div>
    </article>
  );
}
