export class NotFoundError extends Error {
  name = "NotFoundError";
  constructor() {
    super("Recurso não encontrado no GitHub.");
  }
}

export class NetworkError extends Error {
  name = "NetworkError";
  constructor() {
    super("Não foi possível conectar ao GitHub.");
  }
}

export class HttpError extends Error {
  name = "HttpError";
  readonly status: number;
  constructor(status: number) {
    super(`O GitHub respondeu com o status ${status}.`);
    this.status = status;
  }
}
