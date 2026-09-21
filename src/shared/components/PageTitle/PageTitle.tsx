const APP_NAME = 'GitHub Explorer';

export function PageTitle({ title }: { title?: string }) {
  return <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>;
}
