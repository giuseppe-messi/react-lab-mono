import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { TodosStore } from "../../../stores/useTodosStore";
import { Todos } from "./Todos";

const mockStore = {
  todos: [{ id: "n1", label: "Mock note", done: false }],
  filter: "all",
  totalCount: 1,
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  deleteTodo: jest.fn(),
  editTodoLabel: jest.fn(),
  toggleTodoDone: jest.fn(),
  isLoading: false
} as unknown as TodosStore;

jest.mock("../../../stores/useTodosStore", () => ({
  useTodosStore: <T,>(selector: (state: Partial<TodosStore>) => T): T =>
    selector(mockStore),
  selectFilteredTodos: (state: Partial<TodosStore>) => state.todos
}));

// Mocking children so this test isolates Todos panel
jest.mock("../../TodosList/TodosList", () => ({
  TodosList: () => null
}));
jest.mock("../../FilterTodos/FilterTodos", () => ({
  FilterTodos: () => null
}));
jest.mock("../../AddTodoModal/AddTodoModal", () => ({
  AddTodoModal: jest.fn(() => <div data-testid="modal" />)
}));

const renderComponent = () => render(<Todos />);

const getLastModalProps = () => {
  const { AddTodoModal } = jest.requireMock("../../AddTodoModal/AddTodoModal");
  return AddTodoModal.mock.calls.at(-1)[0];
};

describe("Todos panel component", () => {
  it("renders Todos panel without errors", () => {
    renderComponent();
  });

  it("shows AddTodoModal when 'Add' button is clicked", async () => {
    renderComponent();

    let props = getLastModalProps();
    expect(props.showModal).toBe(false);

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    props = getLastModalProps();
    expect(props.showModal).toBe(true);

    props.valueRef.current = { value: "New todo" };

    act(() => {
      props.handleAddTodo({ preventDefault: jest.fn() });
    });

    expect(mockStore.addTodo).toHaveBeenCalled();
  });

  it("hides the modal when handleHideModal is called", async () => {
    renderComponent();

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    const props = getLastModalProps();

    act(() => {
      props.handleHideModal();
    });

    const nextProps = getLastModalProps();
    expect(nextProps.showModal).toBe(false);
  });
});
