const numberFormat = new Intl.NumberFormat('pt-BR');

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}
