import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ListType {
  id: string;
  board_id: string;
  name: string;
}

export interface ListState {
  items: ListType[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    // FETCH
    fetchLists(state, action: PayloadAction<{ boardId: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchListsSuccess(state, action: PayloadAction<ListType[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchListsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ADD
    addList(state, action: PayloadAction<{ boardId: string; name: string }>) {
      state.loading = true;
      state.error = null;
    },
    addListSuccess(state, action: PayloadAction<ListType>) {
      state.items.push(action.payload);
      state.loading = false;
    },
    addListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE
    updateList(state, action: PayloadAction<ListType>) {
      state.loading = true;
    },
    updateListSuccess(state, action: PayloadAction<ListType>) {
      const idx = state.items.findIndex((l) => l.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.loading = false;

    },

    // DELETE
    deleteList(state, action: PayloadAction<{ listId: string }>) {
      state.loading = true;
      state.error = null;
    },
    deleteListSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((l) => l.id !== action.payload);
      state.loading = false;
    },
    deleteListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLists,
  fetchListsSuccess,
  fetchListsFailure,

  addList,
  addListSuccess,
  addListFailure,

  updateList,
  updateListSuccess,

  deleteList,
  deleteListSuccess,
  deleteListFailure,
} = listSlice.actions;

export default listSlice.reducer;
