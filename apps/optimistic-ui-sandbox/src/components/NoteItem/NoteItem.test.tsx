import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNotesStore, type NotesStore } from "../../stores/useNotesStore";
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

  it.only("checks toggleNoteDone is called and 'done' state changed when 'done' checkbox is checked", async () => {
    renderComponent();
    console.log(screen.debug());

    // const { result } = renderHook(() => useNotesStore());

    // console.log("🚀 ~ it ~ result:", result);
    await userEvent.click(screen.getByRole("checkbox"));
    // expect(mockToggleNoteDone).toHaveBeenCalledWith("mockId");
  });
});
