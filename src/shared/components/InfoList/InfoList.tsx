import type { ReactNode } from 'react';
import { NotInformed } from '@/shared/components/NotInformed/NotInformed';

export function InfoList({ children }: { children: ReactNode }) {
  return <dl className="mb-0">{children}</dl>;
}

type InfoItemProps = {
  label: string;
  children: ReactNode;
};

export function InfoItem({ label, children }: InfoItemProps) {
  const isEmpty =
    children === null || children === undefined || children === '' || children === false;

  return (
    <div className="mb-3">
      <dt className="small text-body-secondary fw-normal">{label}</dt>
      <dd className="mb-0">{isEmpty ? <NotInformed /> : children}</dd>
    </div>
  );
}
