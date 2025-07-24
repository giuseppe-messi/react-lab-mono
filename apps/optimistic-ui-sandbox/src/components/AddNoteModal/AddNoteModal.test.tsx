// TODO: come back to a11y test fix
import { render } from "@testing-library/react";
import { AddNoteModal, type AddTodoModalProps } from "./AddNoteModal";

const defaultProps: AddTodoModalProps = {
  showModal: true,
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
  it(" should not render AddNoteModal (showModal prop false)", () => {
    renderComponent({ ...defaultProps, showModal: false });
  });
});
