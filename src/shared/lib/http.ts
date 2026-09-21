import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github+json' },
  timeout: 10_000,
});

export function isNotFound(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}
