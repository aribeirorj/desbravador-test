import axios from "axios";
import {
  HttpError,
  NetworkError,
  NotFoundError,
  RateLimitError,
} from "./errors";

export function toAppError(error: unknown): unknown {
  if (axios.isCancel(error) || !axios.isAxiosError(error)) return error;

  const { response } = error;
  if (!response) return new NetworkError();
  if (response.status === 404) return new NotFoundError();

  if (response.status === 403 || response.status === 429) {
    const headers = response.headers;
    const resource = headers["x-ratelimit-resource"] as string | undefined;

    // Limite primário: 60/h (core) ou 10/min (search).
    if (headers["x-ratelimit-remaining"] === "0") {
      const resetAt = new Date(Number(headers["x-ratelimit-reset"]) * 1000);
      return new RateLimitError(resetAt, resource);
    }

    // Limite secundário: o GitHub informa quantos segundos esperar.
    const retryAfter = Number(headers["retry-after"]);
    if (retryAfter > 0) {
      return new RateLimitError(
        new Date(Date.now() + retryAfter * 1000),
        resource,
      );
    }
  }

  return new HttpError(response.status);
}
