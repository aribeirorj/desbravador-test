import { Link } from 'react-router';
import { formatUsersFound } from '@/features/search/utils/formatUsersFound';
import { userPath } from '@/features/user/paths';
import { sizedAvatarUrl } from '@/features/user/utils/sizedAvatarUrl';
import type { UserSearchResponse } from '@/features/search/types/userSearch';

export function SearchResults({ total, users }: UserSearchResponse) {
  return (
    <>
      <p className="text-body-secondary small mb-2">
        {formatUsersFound(total)}
        {total > users.length && `, exibindo os ${users.length} mais relevantes`}
      </p>
      <ul className="list-group">
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
