// store/cardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
  id: string;
  list_id: string;
  title: string;
}

export interface CardState {
  items: CardType[];
  loading: boolean;
  error: string | null;
}

export interface MoveCardPayload {
  cardId: string;
  toListId: string;
}

const initialState: CardState = {
  items: [],
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCards(state, action: PayloadAction<{ listId: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess(state, action: PayloadAction<{ listId: string; cards: CardType[] }>) {
      const { listId, cards } = action.payload;
      state.items = [
        ...state.items.filter(c => c.list_id !== listId),
        ...cards
      ];
      state.loading = false;
    },
    fetchCardsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    addCard(state, action: PayloadAction<{ listId: string; title: string }>) {
      state.loading = true;
      state.error = null;
    },
    addCardSuccess(state, action: PayloadAction<CardType>) {
      state.items.push(action.payload);
      state.loading = false;
    },
    updateCard(state, action: PayloadAction<{ id: string; title: string }>) {
      state.loading = true;
      state.error = null;
    },
    updateCardSuccess(state, action: PayloadAction<CardType>) {
      const idx = state.items.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.loading = false;
    },
    deleteCard(state, action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
    },
    deleteCardSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
      state.loading = false;
    },
    moveCard(state, action: PayloadAction<MoveCardPayload>) {
      state.loading = true;
      state.error = null;
    },
    moveCardSuccess(state, action: PayloadAction<CardType>) {
      const idx = state.items.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.loading = false;
    }
  },
});

export const {
  fetchCards,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCard,
  addCardSuccess,
  updateCard,
  updateCardSuccess,
  deleteCard,
  deleteCardSuccess,
  moveCard,
  moveCardSuccess,
} = cardSlice.actions;

export default cardSlice.reducer;
