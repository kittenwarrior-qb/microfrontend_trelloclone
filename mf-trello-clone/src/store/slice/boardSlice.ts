import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
  id: string;
  title: string;
}
export interface ListType {
  id: string;
  name: string;
  cards: CardType[];
}
export interface BoardType {
  id: string;
  name: string;
  color?: string;
  lists: ListType[];
}

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
    getBoards(state) {
      state.loading = true;
      state.error = null;
    },
    getBoardsSuccess(state, action: PayloadAction<BoardType[]>) {
      state.boards = action.payload;
      state.loading = false;
    },
    getBoardsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addBoard(state, action: PayloadAction<BoardType>) {
      state.boards.push(action.payload);
    },
    updateBoard(state, action: PayloadAction<BoardType>) {
      const idx = state.boards.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) state.boards[idx] = action.payload;
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
    },

    // Lists
    addList(state, action: PayloadAction<{ boardId: string; list: ListType }>) {
      const { boardId, list } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) board.lists.push(list);
    },
    updateList(
      state,
      action: PayloadAction<{ boardId: string; list: ListType }>
    ) {
      const { boardId, list } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const idx = board.lists.findIndex((l) => l.id === list.id);
        if (idx !== -1) board.lists[idx] = list;
      }
    },
    deleteList(
      state,
      action: PayloadAction<{ boardId: string; listId: string }>
    ) {
      const { boardId, listId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) board.lists = board.lists.filter((l) => l.id !== listId);
    },

    // Cards
    addCard(
      state,
      action: PayloadAction<{ boardId: string; listId: string; card: CardType }>
    ) {
      const { boardId, listId, card } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.id === listId);
        if (list) list.cards.push(card);
      }
    },
    updateCard(
      state,
      action: PayloadAction<{ boardId: string; listId: string; card: CardType }>
    ) {
      const { boardId, listId, card } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.id === listId);
        if (list) {
          const idx = list.cards.findIndex((c) => c.id === card.id);
          if (idx !== -1) list.cards[idx] = card;
        }
      }
    },
    deleteCard(
      state,
      action: PayloadAction<{ boardId: string; listId: string; cardId: string }>
    ) {
      const { boardId, listId, cardId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.id === listId);
        if (list) list.cards = list.cards.filter((c) => c.id !== cardId);
      }
    },
  },
});

export const {
  getBoards,
  getBoardsSuccess,
  getBoardsFailure,
  addBoard,
  updateBoard,
  deleteBoard,
  addList,
  updateList,
  deleteList,
  addCard,
  updateCard,
  deleteCard,
} = boardsSlice.actions;

export default boardsSlice.reducer;
