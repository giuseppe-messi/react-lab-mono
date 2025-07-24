import { axe } from "jest-axe";
import { act, render } from "@testing-library/react";
import App from "./App";

it("should render App without a11y violations", async () => {
  let container: HTMLElement;

  await act(async () => {
    // mount & let any effects run
    const result = render(<App />);
    container = result.container;
  });

  const results = await axe(container!);
  expect(results).toHaveNoViolations();
});
