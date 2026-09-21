import type { ReactNode } from 'react';

type ErrorStateProps = {
  title: string;
  headingAs?: 'h1' | 'h2';
  children?: ReactNode;
};

export function ErrorState({ title, headingAs: Heading = 'h2', children }: ErrorStateProps) {
  return (
    <section className="py-5 text-center">
      <Heading className="h4">{title}</Heading>
      {children && (
        <div className="mt-3 d-flex flex-column align-items-center gap-3">{children}</div>
      )}
    </section>
  );
}
