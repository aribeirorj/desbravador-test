const APP_NAME = 'GitHub Explorer';

/** Título da aba. O React 19 move o `<title>` para o `<head>` sozinho. */
export function PageTitle({ title }: { title?: string }) {
  return <title>{title ? `${title} · ${APP_NAME}` : APP_NAME}</title>;
}
