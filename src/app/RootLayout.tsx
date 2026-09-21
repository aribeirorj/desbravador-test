import { Link, Outlet, ScrollRestoration, useMatch } from 'react-router';
import { NavbarSearch } from '../features/search/components/NavbarSearch';
import styles from './RootLayout.module.css';

export function RootLayout() {
  // Na página inicial a Busca já está em destaque; nas demais, fica na navbar.
  const isHome = useMatch('/') !== null;

  return (
    <>
      <a
        className="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-primary"
        href="#conteudo"
      >
        Pular para o conteúdo
      </a>
      <header className="navbar bg-body-tertiary border-bottom">
        <nav className="container flex-wrap gap-2" aria-label="Principal">
          <Link className="navbar-brand fw-semibold" to="/">
            GitHub Explorer
          </Link>
          {!isHome && (
            <div className={styles.navbarSearch}>
              <NavbarSearch />
            </div>
          )}
        </nav>
      </header>
      <main id="conteudo" className="container py-4" tabIndex={-1}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
