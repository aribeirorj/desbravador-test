import { formatNumber } from '@/shared/lib/formatters';

export function formatUsersFound(total: number): string {
  return `${formatNumber(total)} ${total === 1 ? 'usuário encontrado' : 'usuários encontrados'}`;
}
