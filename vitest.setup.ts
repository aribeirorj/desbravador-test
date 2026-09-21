import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// O jsdom não implementa rolagem; o <ScrollRestoration /> chama window.scrollTo.
window.scrollTo = () => {};

// Sem `globals: true`, a Testing Library não desmonta os componentes sozinha.
afterEach(() => {
  cleanup();
});
