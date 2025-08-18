import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { TodosStore } from "../../stores/useTodosStore";
import { TestLocators, TodoItem, type TodoItemProps } from "./TodoItem";

const mockToggleTodoDone = jest.fn();

jest.mock("../../stores/useTodosStore", () => ({
  useTodosStore: <T,>(selector: (state: Partial<TodosStore>) => T): T =>
    selector({ toggleTodoDone: mockToggleTodoDone })
}));

const defaultProps: TodoItemProps = {
  todo: {
    id: "mockId",
    label: "mockText",
    done: false
  },
  editingId: "mockId",
  onEditingId: jest.fn(),
  onUpdateTodo: jest.fn(),
  onDeleteTodo: jest.fn()
};

const renderComponent = (props: TodoItemProps = defaultProps) => {
  render(<TodoItem {...props} />);
  return { ...props };
};

describe("TodoItem component", () => {
  it("renders TodoItem without errors", () => {
    renderComponent();
    expect(screen.getByTestId(TestLocators.todoItem)).toBeInTheDocument();
  });

  it("calls onEditingId when 'edit' icon is clicked", async () => {
    const { onEditingId } = renderComponent({
      ...defaultProps,
      editingId: "otherId"
    });
    const editIcon = screen.getByTestId(TestLocators.editIcon);
    await userEvent.click(editIcon);

    expect(onEditingId).toHaveBeenCalled();
  });

  it("calls onUpdateNote when 'check' icon is clicked", async () => {
    const { onUpdateTodo } = renderComponent();
    const checkIcon = await screen.findByTestId(TestLocators.checkIcon);
    await userEvent.click(checkIcon);

    expect(onUpdateTodo).toHaveBeenCalled();
  });

  it("calls toggleTodoDone when the checkbox is checked on and off", async () => {
    renderComponent();
    const checkbox = screen.getByRole("switch");
    await userEvent.click(checkbox);

    expect(mockToggleTodoDone).toHaveBeenCalled();
  });

  it("calls onDeleteNote when 'close' icon is clicked", async () => {
    const { onDeleteTodo } = renderComponent();

    const deleteIcon = screen.getByTestId(TestLocators.deleteIcon);
    await userEvent.click(deleteIcon);

    expect(onDeleteTodo).toHaveBeenCalled();
  });
});
