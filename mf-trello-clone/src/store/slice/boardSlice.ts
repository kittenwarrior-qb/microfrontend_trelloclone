import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardType { id: string; title: string; }
export interface ListType { id: string; name: string; cards: CardType[]; }
export interface BoardType { id: string; name: string; lists: ListType[]; }

interface BoardsState {
  boards: BoardType[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    getBoards(state) { state.loading = true; state.error = null; },
    getBoardsSuccess(state, action: PayloadAction<BoardType[]>) {
      state.boards = action.payload;
      state.loading = false;
    },
    getBoardsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addBoard(state, action: PayloadAction<BoardType>) { state.boards.push(action.payload); },
    updateBoard(state, action: PayloadAction<BoardType>) {
      const idx = state.boards.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) state.boards[idx] = action.payload;
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter(b => b.id !== action.payload);
    },
  },
});

export const { getBoards, getBoardsSuccess, getBoardsFailure, addBoard, updateBoard, deleteBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
