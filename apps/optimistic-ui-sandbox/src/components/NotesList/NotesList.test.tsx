import { act, render } from "@testing-library/react";
import type { NotesStore } from "../../stores/useNotesStore";
import { NotesList, type NotesListProps } from "./NotesList";

jest.mock("../NoteItem/NoteItem", () => ({
  NoteItem: jest.fn(() => null)
}));

const mockEditNoteText = jest.fn();

jest.mock("../../stores/useNotesStore", () => ({
  useNotesStore: <T,>(selector: (state: Partial<NotesStore>) => T): T =>
    selector({ editNoteText: mockEditNoteText })
}));

const defaultProps: NotesListProps = {
  notes: [{ id: "n1", text: "Mock note text 1", done: false }]
};

const renderComponent = (props: NotesListProps = defaultProps) => {
  render(<NotesList {...props} />);
  return { ...props };
};

describe("NotesList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders NotesList without errors", () => {
    renderComponent();
  });

  it("checks that editingId is changed on a NoteItem's onEditingId call", () => {
    renderComponent();

    const { NoteItem } = jest.requireMock("../NoteItem/NoteItem");

    // get the NoteItem props
    const firstProps = NoteItem.mock.calls[0][0];

    // triggers handleEditingId("n1") which calls setEditingId
    act(() => {
      firstProps.onEditingId("n1");
    });

    const lastProps = NoteItem.mock.calls.at(-1)[0];
    expect(lastProps.editingId).toBe("n1");
  });

  it("checks that editNoteText is called on a NoteItem's onUpdateNote call", () => {
    renderComponent();

    const { NoteItem } = jest.requireMock("../NoteItem/NoteItem");

    // get the NoteItem props
    const firstProps = NoteItem.mock.calls[0][0];

    // triggers handleEditingId("n1") which calls setEditingId
    act(() => {
      firstProps.onUpdateNote("n1", "new mock text");
    });

    expect(mockEditNoteText).toHaveBeenCalled();
    expect(mockEditNoteText).toHaveBeenCalledWith("n1", "new mock text");
  });
});
