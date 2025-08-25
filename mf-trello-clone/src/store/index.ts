import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import boardsReducer, {
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
} from "./slice/boardSlice";

import boardSaga from "./saga/boardSaga";
import listSaga from "./saga/listSaga";
import cardSaga from "./saga/cardSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(boardSaga);
sagaMiddleware.run(listSaga);
sagaMiddleware.run(cardSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
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
};
