import type { ReactNode } from 'react';

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="py-5 text-center text-body-secondary">{children}</p>;
}
