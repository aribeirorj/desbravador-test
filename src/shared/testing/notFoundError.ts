import { AxiosError, type AxiosResponse } from 'axios';

export function notFoundError() {
  return new AxiosError('Not Found', undefined, undefined, undefined, {
    status: 404,
  } as AxiosResponse);
}
