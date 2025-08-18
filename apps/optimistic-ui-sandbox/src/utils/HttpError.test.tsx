// HttpError.test.ts
import { HttpError } from "./HttpError";

describe("HttpError class", () => {
  it("uses default status and message", () => {
    const err = new HttpError();
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(HttpError);
    expect(err.status).toBe(500);
    expect(err.statusText).toBe("Internal Server Error");
    expect(err.message).toBe("500 Internal Server Error");
  });

  it("accepts custom status and statusText", () => {
    const err = new HttpError(404, "Not Found");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(HttpError);
    expect(err.status).toBe(404);
    expect(err.statusText).toBe("Not Found");
    expect(err.message).toBe("404 Not Found");
  });
});
