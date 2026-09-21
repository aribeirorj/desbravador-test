/** Pede o avatar já no tamanho exibido: o GitHub aceita o parâmetro `s`. */
export function sizedAvatarUrl(url: string, size: number): string {
  const sized = new URL(url);
  sized.searchParams.set('s', String(size));
  return sized.toString();
}
