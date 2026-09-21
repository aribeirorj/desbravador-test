import { Link, Outlet, ScrollRestoration } from 'react-router';

export function RootLayout() {
  return (
    <>
      <header className="navbar bg-body-tertiary border-bottom">
        <nav className="container flex-wrap gap-2">
          <Link className="navbar-brand fw-semibold" to="/">
            GitHub Explorer
          </Link>
        </nav>
      </header>
      <main className="container py-4">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
