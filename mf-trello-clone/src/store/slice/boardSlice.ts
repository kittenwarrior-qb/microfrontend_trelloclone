// store/boardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardType {
  id: string;
  name: string;
  color?: string;
}

export interface ListType {
  id: string;
  name: string;
  board_id: string;
}

export interface CardType {
  id: string;
  title: string;
  list_id: string;
}

export interface BoardState {
  items: BoardType[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  items: [],
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchBoards(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBoardsSuccess(state, action: PayloadAction<BoardType[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchBoardsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    addBoard(state, action: PayloadAction<BoardType>) {
      state.items.push({
        ...action.payload,
      });
      state.loading = true;
    },
    addBoardSuccess(state, action: PayloadAction<BoardType>) {
      state.items.push(action.payload);
      state.loading = false;
    },

    updateBoard(state, action: PayloadAction<BoardType>) {
      state.loading = true;
    },
    updateBoardSuccess(state, action: PayloadAction<BoardType>) {
      const idx = state.items.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.loading = false;
    },

    deleteBoard(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteBoardSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((b) => b.id !== action.payload);
      state.loading = false;
    },
  },
});

export const {
  fetchBoards,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoard,
  addBoardSuccess,
  updateBoard,
  updateBoardSuccess,
  deleteBoard,
  deleteBoardSuccess,
} = boardSlice.actions;

export default boardSlice.reducer;
