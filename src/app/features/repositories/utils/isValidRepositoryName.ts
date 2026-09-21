/** Letras, números, `.`, `-` e `_`, até 100 caracteres; `.` e `..` não são nomes. */
export function isValidRepositoryName(value: string): boolean {
  return /^[\w.-]{1,100}$/.test(value) && value !== '.' && value !== '..';
}
