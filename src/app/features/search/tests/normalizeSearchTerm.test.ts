import { describe, expect, it } from 'vitest';
import { normalizeSearchTerm } from '../utils/normalizeSearchTerm';

describe('normalizeSearchTerm', () => {
  it('remove espaços nas pontas e um @ inicial', () => {
    expect(normalizeSearchTerm('  @torvalds ')).toBe('torvalds');
  });

  it('preserva espaços internos, porque a Busca também encontra pelo nome', () => {
    expect(normalizeSearchTerm('linus torvalds')).toBe('linus torvalds');
  });

  it('remove só o primeiro @', () => {
    expect(normalizeSearchTerm('@@x')).toBe('@x');
  });
});
