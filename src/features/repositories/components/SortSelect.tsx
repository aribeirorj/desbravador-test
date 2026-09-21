import { useId } from 'react';
import { SORT_OPTIONS, type SortOption } from '../utils/sortRepositories';

type SortSelectProps = {
  value: SortOption;
  onChange: (id: string) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  const id = useId();

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor={id} className="small text-body-secondary text-nowrap">
        Ordenar por
      </label>
      <select
        id={id}
        className="form-select form-select-sm"
        value={value.id}
        onChange={(event) => onChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
