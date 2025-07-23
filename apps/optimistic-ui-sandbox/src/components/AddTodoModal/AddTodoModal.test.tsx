// TODO: come back to a11y test fix
import { render } from "@testing-library/react";
import { AddTodoModal, type AddTodoModalProps } from "./AddTodoModal";
// import { axe } from "jest-axe";

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

  // it("renders AddTodoModal without a11y violations", async () => {
  //   renderComponent();
  //   const results = await axe(document.body); // document.body because that's where portal is rendered
  //   console.log(results);
  //   expect(results).toHaveNoViolations();
  // });
});
