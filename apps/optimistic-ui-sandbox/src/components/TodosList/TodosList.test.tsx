import { act, render } from "@testing-library/react";
import type { TodosStore } from "../../stores/useTodosStore";
import { TodosList, type TodosListProps } from "./TodosList";

jest.mock("../TodoItem/TodoItem", () => ({
  TodoItem: jest.fn(() => null)
}));

const mockEditTodoLabel = jest.fn();

jest.mock("../../stores/useTodosStore", () => ({
  useTodosStore: <T,>(selector: (state: Partial<TodosStore>) => T): T =>
    selector({ editTodoLabel: mockEditTodoLabel })
}));

const defaultProps: TodosListProps = {
  todos: [{ id: "n1", label: "Mock todo label 1", done: false }]
};

const renderComponent = (props: TodosListProps = defaultProps) => {
  render(<TodosList {...props} />);
  return { ...props };
};

describe("TodosList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders TodosList without errors", () => {
    renderComponent();
  });

  it("checks that editingId is changed on a TodoItem's onEditingId call", () => {
    renderComponent();

    const { TodoItem } = jest.requireMock("../TodoItem/TodoItem");

    // get the TodoItem props
    const firstProps = TodoItem.mock.calls[0][0];

    // triggers handleEditingId("n1") which calls setEditingId
    act(() => {
      firstProps.onEditingId("n1");
    });

    const lastProps = TodoItem.mock.calls.at(-1)[0];
    expect(lastProps.editingId).toBe("n1");
  });

  it("checks that editTodoLabel is called on a TodoItem's onUpdateTodo call", () => {
    renderComponent();

    const { TodoItem } = jest.requireMock("../TodoItem/TodoItem");

    // get the TodoItem props
    const firstProps = TodoItem.mock.calls[0][0];

    // triggers handleEditingId("n1") which calls setEditingId
    act(() => {
      firstProps.onUpdateTodo("n1", "new mock label");
    });

    expect(mockEditTodoLabel).toHaveBeenCalled();
    expect(mockEditTodoLabel).toHaveBeenCalledWith("n1", "new mock label");
  });
});
