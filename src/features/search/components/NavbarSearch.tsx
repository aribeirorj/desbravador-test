import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router';
import { normalizeSearchTerm } from '../utils/normalizeSearchTerm';
import { SearchForm } from './SearchForm';

/** Busca compacta da navbar: leva para a página de Busca com o termo. */
export function NavbarSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <SearchForm
      value={value}
      onChange={setValue}
      onSubmit={() => {
        const term = normalizeSearchTerm(value);
        if (!term) return;
        setValue('');
        navigate({ pathname: '/', search: `?${createSearchParams({ q: term })}` });
      }}
      compact
    />
  );
}
