import { formatNumber } from '@/shared/lib/formatters';

export function Stars({ count }: { count: number }) {
  return (
    <span className="text-nowrap">
      <span className="text-warning">★</span> {formatNumber(count)}
    </span>
  );
}
