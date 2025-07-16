import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AddNoteModal, type AddTodoModalProps } from "./AddNoteModal";

const defaultProps: AddTodoModalProps = {
  showModal: false,
  valueRef: { current: null },
  handleAddNote: jest.fn(),
  handleHideModal: jest.fn()
};

const renderComponent = (props: AddTodoModalProps = defaultProps) =>
  render(<AddNoteModal {...props} />);

describe("AddNoteModal component", () => {
  it("renders AddNoteModal without errors", () => {
    renderComponent();
  });

  it("renders AddNoteModal without a11y violations", async () => {
    const { container } = renderComponent({ ...defaultProps, showModal: true });
    const results = await axe(document.body);
    if (results.violations.length) {
      console.log(
        results.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.html).join(", ")}`
        )
      );
    }
    console.log(screen.debug());
    expect(results).toHaveNoViolations();
  });
});
