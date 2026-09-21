/**
 * Regra flexível de username do GitHub: letras, números e hífen, de 1 a 39
 * caracteres. De propósito, não valida a posição do hífen (não começar/terminar
 * com hífen, nem dois seguidos): contas antigas não seguem essas regras atuais.
 */
const USERNAME_PATTERN = /^[a-z\d-]{1,39}$/i;

export function isValidUsername(value: string): boolean {
  return USERNAME_PATTERN.test(value);
}
