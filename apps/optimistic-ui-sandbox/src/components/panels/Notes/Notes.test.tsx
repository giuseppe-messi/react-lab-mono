import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { NotesStore } from "../../../stores/useNotesStore";
import { Notes } from "./Notes";

const mockStore = {
  notes: [{ id: "n1", text: "Mock note", done: false }],
  filter: "all",
  totalCount: 1,
  getNotes: jest.fn(),
  addNote: jest.fn(),
  deleteNote: jest.fn(),
  editNoteText: jest.fn(),
  toggleNoteDone: jest.fn(),
  isLoading: false
} as unknown as NotesStore;

jest.mock("../../../stores/useNotesStore", () => ({
  useNotesStore: <T,>(selector: (state: Partial<NotesStore>) => T): T =>
    selector(mockStore),
  selectFilteredNotes: (state: Partial<NotesStore>) => state.notes
}));

// Mocking children so this test isolates Notes panel
jest.mock("../../NotesList/NotesList", () => ({
  NotesList: () => null
}));
jest.mock("../../FilterNotes/FilterNotes", () => ({
  FilterNotes: () => null
}));
jest.mock("../../AddNoteModal/AddNoteModal", () => ({
  AddNoteModal: jest.fn(() => <div data-testid="modal" />)
}));

const renderComponent = () => render(<Notes />);

const getLastModalProps = () => {
  const { AddNoteModal } = jest.requireMock("../../AddNoteModal/AddNoteModal");
  return AddNoteModal.mock.calls.at(-1)[0];
};

describe("Notes panel component", () => {
  it("renders Notes panel without errors", () => {
    renderComponent();
  });

  it("shows AddNoteModal when 'Add' button is clicked", async () => {
    renderComponent();

    let props = getLastModalProps();
    expect(props.showModal).toBe(false);

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    props = getLastModalProps();
    expect(props.showModal).toBe(true);

    props.valueRef.current = { value: "New note" };

    act(() => {
      props.handleAddNote({ preventDefault: jest.fn() });
    });

    expect(mockStore.addNote).toHaveBeenCalled();
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
