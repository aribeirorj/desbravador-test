const numberFormat = new Intl.NumberFormat('pt-BR');
const timeFormat = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

/** 83987 → "83.987" */
export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

/** Date → "14:32" */
export function formatTime(date: Date): string {
  return timeFormat.format(date);
}
