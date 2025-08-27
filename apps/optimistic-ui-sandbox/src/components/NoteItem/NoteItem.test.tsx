import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { NotesStore } from "../../stores/useNotesStore";
import { NoteItem, TestLocators, type NoteItemProps } from "./NoteItem";

const mockToggleNoteDone = jest.fn();

jest.mock("../../stores/useNotesStore", () => ({
  useNotesStore: <T,>(selector: (state: Partial<NotesStore>) => T): T =>
    selector({ toggleNoteDone: mockToggleNoteDone })
}));

const defaultProps: NoteItemProps = {
  note: {
    id: "mockId",
    text: "mockText",
    done: false
  },
  editingId: "mockId",
  onEditingId: jest.fn(),
  onUpdateNote: jest.fn(),
  onDeleteNote: jest.fn()
};

const renderComponent = (props: NoteItemProps = defaultProps) => {
  render(<NoteItem {...props} />);
  return { ...props };
};

describe("NoteItem component", () => {
  it("renders NoteItem without errors", () => {
    renderComponent();
    expect(screen.getByTestId(TestLocators.noteItem)).toBeInTheDocument();
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
    const { onUpdateNote } = renderComponent();
    const checkIcon = await screen.findByTestId(TestLocators.checkIcon);
    await userEvent.click(checkIcon);

    expect(onUpdateNote).toHaveBeenCalled();
  });

  it("calls toggleNoteDone when the checkbox is checked on and off", async () => {
    renderComponent();
    const checkbox = screen.getByRole("switch");
    await userEvent.click(checkbox);

    expect(mockToggleNoteDone).toHaveBeenCalled();
  });

  it("calls onDeleteNote when 'close' icon is clicked", async () => {
    const { onDeleteNote } = renderComponent();

    const deleteIcon = screen.getByTestId(TestLocators.deleteIcon);
    await userEvent.click(deleteIcon);

    expect(onDeleteNote).toHaveBeenCalled();
  });
});
