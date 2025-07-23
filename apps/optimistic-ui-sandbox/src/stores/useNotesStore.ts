import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { generateUUID, useToastersStore } from "@react-lab-mono/ui";
import { HttpError } from "../utils/HttpError";
import { useControlsPanelStore } from "./useControlsPanelStore";

export const NOTES_STORE_KEY = "notes-storage";

const getStateFromStore = (): { notes: Note[]; filter: NoteFilterType } => {
  const raw = localStorage.getItem(NOTES_STORE_KEY);

  if (!raw) return { notes: [], filter: "all" };

  try {
    return JSON.parse(raw);
  } catch {
    return { notes: [], filter: "all" };
  }
};

export type NoteFilterType = "all" | "active" | "completed";
export const noteFilters = ["all", "active", "completed"];

export type Note = {
  id: string;
  text: string;
  done: boolean;
};

export type NotesStore = {
  notes: Note[];
  totalCount: number;
  isLoading: boolean;
  error: Error | null;
  filter: NoteFilterType;
  getNotes: () => void;
  addNote: (text: string) => void;
  deleteNote: (id: string) => void;
  editNoteText: (id: string, text: string) => void;
  toggleNoteDone: (id: string) => void;
  setFilter: (filter: NoteFilterType) => void;
};

const simulateApiControls = async () => {
  const { mockLatency, mockError } = useControlsPanelStore.getState();

  // mock api delay
  if (mockLatency) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // mock api error
  if (mockError) {
    throw new HttpError();
  }
};

type DoActionMethodParams = {
  set: (
    partial:
      | NotesStore
      | Partial<NotesStore>
      | ((state: NotesStore) => NotesStore | Partial<NotesStore>),
    replace?: false
  ) => void;
  work: () => void;
  api?: () => Promise<void>;
  onSucess?: () => void;
  onError?: () => void;
  rollback?: () => void;
  onFinally?: () => void;
};

const doAction = async ({
  set,
  work,
  api,
  onSucess,
  onError,
  rollback,
  onFinally
}: DoActionMethodParams) => {
  set({ error: null });
  try {
    work();
    await api?.();
    onSucess?.();
  } catch (err) {
    console.error(err);
    set({ error: err as Error });
    onError?.();
    rollback?.();
  } finally {
    onFinally?.();
  }
};

let notesSnap: Note[] | null = null;

const enQueueErrorToast = (text: string) => {
  useToastersStore.getState().enQueueToast("error", text);
};

const enQueueSucessToast = (text: string) => {
  useToastersStore.getState().enQueueToast("sucess", text);
};

export const useNotesStore = create<NotesStore>()(
  subscribeWithSelector((set, get) => ({
    notes: [],
    totalCount: 0,
    isLoading: false,
    error: null,
    filter: "all",

    getNotes: () => {
      set({ isLoading: true, error: null });

      void doAction({
        set,
        work: () => {
          set((state) => ({ ...state, ...getStateFromStore() }));
        },
        api: () => simulateApiControls(),
        onError: () => {
          enQueueErrorToast("Something went wrong fetching the notes!");
        },
        onFinally: () => {
          set({ isLoading: false });
        }
      });
    },

    addNote: (text) => {
      const newNoteId = generateUUID();
      void doAction({
        set,
        work: () => {
          set((state) => ({
            notes: [...state.notes, { id: newNoteId, done: false, text }]
          }));
        },
        api: () => simulateApiControls(),
        onSucess: () => {
          enQueueSucessToast("Note added successfully!");
        },
        onError: () => {
          enQueueErrorToast("Something went wrong! Note not added!");
        },
        rollback: () => {
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== newNoteId)
          }));
        }
      });
    },

    deleteNote: (id) => {
      const { notes } = get();

      if (!notesSnap) {
        notesSnap = notes;
      }

      void doAction({
        set,
        work: () => {
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== id)
          }));
        },
        api: () => simulateApiControls(),
        onSucess: () => {
          enQueueSucessToast("Note deleted successfully!");
          notesSnap = null;
        },
        onError: () => {
          enQueueErrorToast("Something went wrong! Note not deleted!");
        },
        rollback: () => {
          if (notesSnap) {
            set({
              notes: notesSnap
            });
            notesSnap = null;
          }
        }
      });
    },

    editNoteText: (id, text) => {
      const { notes } = get();
      const index = notes.findIndex((t) => t.id === id);
      const currentNote = notes[index];

      const editNote = (text: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, text } : note
          )
        }));
      };

      void doAction({
        set,
        work: () => {
          editNote(text);
        },
        api: () => simulateApiControls(),
        onSucess: () => {
          enQueueSucessToast("Note edited successfully!");
        },
        onError: () => {
          enQueueErrorToast("Something went wrong! Note not edited!");
        },
        rollback: () => {
          editNote(currentNote.text);
        }
      });
    },

    toggleNoteDone: (id) => {
      const editNote = () => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, done: !note.done } : note
          )
        }));
      };

      void doAction({
        set,
        work: () => {
          editNote();
        },
        api: () => simulateApiControls(),
        onSucess: () => {
          enQueueSucessToast("Note status was changed successfully!");
        },
        onError: () => {
          enQueueErrorToast(
            "Something went wrong! Note status wasn't changed!"
          );
        },
        rollback: () => {
          editNote();
        }
      });
    },
    setFilter: (filter) => {
      set({
        filter
      });
    }
  }))
);

useNotesStore.subscribe(
  (state) => state.notes,
  (notes) => {
    useNotesStore.setState({ totalCount: notes.length });
  }
);

export const selectFilteredNotes = (state: NotesStore) => {
  const { notes, filter } = state;
  if (filter === "active") return notes.filter((n) => !n.done);
  if (filter === "completed") return notes.filter((n) => n.done);
  return notes;
};
