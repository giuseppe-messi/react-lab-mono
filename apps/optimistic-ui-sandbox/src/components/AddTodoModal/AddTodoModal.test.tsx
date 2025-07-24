// TODO: come back to a11y test fix
import { render } from "@testing-library/react";
import { AddTodoModal, type AddTodoModalProps } from "./AddTodoModal";

const defaultProps: AddTodoModalProps = {
  showModal: true,
  valueRef: { current: null },
  handleAddTodo: jest.fn(),
  handleHideModal: jest.fn()
};

const renderComponent = (props: AddTodoModalProps = defaultProps) =>
  render(<AddTodoModal {...props} />);

describe("AddTodoModal component", () => {
  it("renders AddTodoModal without errors", () => {
    renderComponent();
  });
  it(" should not render AddTodoModal (showModal prop false)", () => {
    renderComponent({ ...defaultProps, showModal: false });
  });
});
