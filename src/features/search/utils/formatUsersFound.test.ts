import { describe, expect, it } from 'vitest';
import { formatUsersFound } from '@/features/search/utils/formatUsersFound';

describe('formatUsersFound', () => {
  it('usa o singular para um usuário', () => {
    expect(formatUsersFound(1)).toBe('1 usuário encontrado');
  });

  it('usa o plural e separa os milhares', () => {
    expect(formatUsersFound(0)).toBe('0 usuários encontrados');
    expect(formatUsersFound(1234)).toBe('1.234 usuários encontrados');
  });
});
