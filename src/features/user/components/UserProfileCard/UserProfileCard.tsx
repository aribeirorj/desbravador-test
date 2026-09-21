import { InfoItem, InfoList } from '@/shared/components';
import { formatNumber } from '@/shared/lib/formatters';
import type { User } from '@/features/user/types/user';
import { sizedAvatarUrl } from '@/features/user/utils/sizedAvatarUrl';
import styles from '@/features/user/components/UserProfileCard/UserProfileCard.module.css';

export function UserProfileCard({ user }: { user: User }) {
  return (
    <article className="card shadow-sm">
      <div className="card-body">
        <div className="text-center">
          <img
            src={sizedAvatarUrl(user.avatarUrl, 320)}
            alt={`Avatar de ${user.login}`}
            width={160}
            height={160}
            className="rounded-circle bg-body-secondary mb-3"
          />
          <h1 className="h3 mb-0 text-break">{user.name ?? user.login}</h1>
          {user.name && <p className="text-body-secondary mb-0">{user.login}</p>}
        </div>

        <dl className="row g-0 text-center my-4">
          <div className="col d-flex flex-column-reverse">
            <dt className="small text-body-secondary fw-normal">seguidores</dt>
            <dd className="fs-4 fw-semibold mb-0">{formatNumber(user.followers)}</dd>
          </div>
          <div className="col d-flex flex-column-reverse border-start">
            <dt className="small text-body-secondary fw-normal">seguidos</dt>
            <dd className="fs-4 fw-semibold mb-0">{formatNumber(user.following)}</dd>
          </div>
        </dl>

        <InfoList>
          <InfoItem label="E-mail">
            {user.email && (
              <a href={`mailto:${user.email}`} className="text-break">
                {user.email}
              </a>
            )}
          </InfoItem>
          <InfoItem label="Bio">
            {user.bio && <span className={styles.bio}>{user.bio}</span>}
          </InfoItem>
        </InfoList>
      </div>
    </article>
  );
}
