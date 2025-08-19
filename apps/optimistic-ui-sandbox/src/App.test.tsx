// App.test.tsx
import { axe } from "jest-axe";
import { act, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders App without a11y violations", async () => {
    let container!: HTMLElement;
    await act(async () => {
      const r = render(<App />);
      container = r.container;
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders the ErrorBoundary fallback on error", () => {
    // silence error logs
    jest.spyOn(console, "error").mockImplementation(() => {});

    jest.isolateModules(() => {
      jest.doMock("./pages/Home/Home", () => ({
        Home: () => {
          throw new Error("Boom");
        }
      }));

      const AppWithBoom = require("./App").default;
      render(<AppWithBoom />);
      expect(screen.getByText(/something is not right!/i)).toBeInTheDocument();
    });
  });
});
