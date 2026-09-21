import axios from "axios";
import { toAppError } from "./toAppError";

export const http = axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github+json" },
  timeout: 10_000,
});

http.interceptors.response.use(undefined, (error) =>
  Promise.reject(toAppError(error)),
);
