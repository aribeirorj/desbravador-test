import { useId, type FormEvent } from 'react';

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  busy?: boolean;
  autoFocus?: boolean;
};

export function SearchForm({ value, onChange, onSubmit, busy, autoFocus }: SearchFormProps) {
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="visually-hidden">
        Buscar usuário do GitHub pelo username ou nome
      </label>
      <div className="input-group input-group-lg">
        <input
          id={inputId}
          type="search"
          className="form-control"
          placeholder="Username ou nome, ex.: torvalds"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={256}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="search"
          autoFocus={autoFocus}
        />
        <button type="submit" className="btn btn-primary">
          {busy && <span className="spinner-border spinner-border-sm me-2" />}
          Buscar
        </button>
      </div>
    </form>
  );
}
