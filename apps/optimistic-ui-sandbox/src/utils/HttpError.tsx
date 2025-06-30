// src/utils/httpError.ts
export class HttpError extends Error {
  status: number;
  statusText: string;

  constructor(status: number = 500, statusText = "Internal Server Error") {
    super(`${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
  }
}
