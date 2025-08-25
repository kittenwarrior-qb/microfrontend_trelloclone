import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import boardsReducer, {
  getBoards,
  getBoardsSuccess,
  getBoardsFailure,
  addBoard,
  updateBoard,
  deleteBoard,
} from "./slice/boardSlice";
import boardSaga from "./saga/boardSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(boardSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  getBoards,
  getBoardsSuccess,
  getBoardsFailure,
  addBoard,
  updateBoard,
  deleteBoard,
};
