import { Link } from 'react-router';
import { formatNumber } from '../../../app/formatters';
import { userPath } from '../../user/paths';
import { sizedAvatarUrl } from '../../user/utils/sizedAvatarUrl';
import type { UserSearchResponse } from '../types';

export function SearchResults({ total, users }: UserSearchResponse) {
  return (
    <>
      <p className="text-body-secondary small mb-2">
        {formatNumber(total)} {total === 1 ? 'usuário encontrado' : 'usuários encontrados'}
        {total > users.length && ` · exibindo os ${users.length} mais relevantes`}
      </p>
      <ul className="list-group">
        npm
        {users.map((user) => (
          <li key={user.login} className="list-group-item p-0">
            <Link
              to={userPath(user.login)}
              className="list-group-item-action d-flex align-items-center gap-3 px-3 py-2 text-decoration-none"
            >
              <img
                src={sizedAvatarUrl(user.avatarUrl, 80)}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="rounded-circle bg-body-secondary"
              />
              <span className="fw-semibold">{user.login}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
