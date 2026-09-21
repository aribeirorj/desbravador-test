import { describe, expect, it } from 'vitest';
import { isValidUsername } from '../utils/isValidUsername';

describe('isValidUsername', () => {
  it.each(['torvalds', 'a', 'Sindre-Sorhus', 'a'.repeat(39)])('aceita "%s"', (username) => {
    expect(isValidUsername(username)).toBe(true);
  });

  it.each(['old--account', '-legacy', 'legacy-'])(
    'aceita hífens de contas antigas: "%s"',
    (username) => {
      expect(isValidUsername(username)).toBe(true);
    },
  );

  it.each(['', 'a'.repeat(40), 'linus torvalds', 'joão', '<script>', 'user/repo'])(
    'recusa "%s"',
    (username) => {
      expect(isValidUsername(username)).toBe(false);
    },
  );
});
