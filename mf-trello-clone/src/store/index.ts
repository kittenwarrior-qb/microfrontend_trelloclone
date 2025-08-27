import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import boardsReducer, * as boardActions from "./slice/boardSlice";
import listsReducer, * as listActions from "./slice/listSlice";
import cardsReducer, * as cardActions from "./slice/cardSlice";

import type { BoardState } from "./slice/boardSlice";
import type { ListState } from "./slice/listSlice";
import type { CardState } from "./slice/cardSlice";

import boardSaga from "./saga/boardSaga";
import listSaga from "./saga/listSaga";
import cardSaga from "./saga/cardSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  
});

sagaMiddleware.run(boardSaga);
sagaMiddleware.run(listSaga);
sagaMiddleware.run(cardSaga);

export type AppDispatch = typeof store.dispatch;

export const actions = {
  ...boardActions,
  ...listActions,
  ...cardActions,
};


export type RootState = {
  boards: BoardState;
  lists: ListState;
  cards: CardState;
};