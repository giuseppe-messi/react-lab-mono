import { render, screen } from "@testing-library/react";
import { type NotesStore } from "../../stores/useNotesStore";
import { NoteItem, TestLocators, type NoteItemProps } from "./NoteItem";

const mockToggleNoteDone = jest.fn();

jest.mock("../../stores/useNotesStore", () => ({
  useNotesStore: jest.fn(
    <T,>(selector: (state: Partial<NotesStore>) => T): T =>
      selector({
        toggleNoteDone: mockToggleNoteDone
      })
  )
}));

const defaultProps: NoteItemProps = {
  note: {
    id: "mockId",
    text: "mockText",
    done: false
  },
  editingId: "mockEditingId",
  onEditingId: jest.fn(),
  onUpdateNote: jest.fn(),
  onDeleteNote: jest.fn()
};

const renderComponent = (props: NoteItemProps = defaultProps) =>
  render(<NoteItem {...props} />);

describe("NoteItem component", () => {
  beforeEach(() => {
    mockToggleNoteDone.mockClear();
  });

  it("renders NoteItem without errors", () => {
    renderComponent();
    expect(screen.getByTestId(TestLocators.noteItem)).toBeInTheDocument();
  });
});
