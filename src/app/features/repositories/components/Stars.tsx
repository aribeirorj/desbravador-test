import { formatNumber } from '../../../formatters';

export function Stars({ count }: { count: number }) {
  return (
    <span className="text-nowrap">
      <span aria-hidden="true" className="text-warning">
        ★
      </span>{' '}
      {formatNumber(count)} <span className="visually-hidden">estrelas</span>
    </span>
  );
}
