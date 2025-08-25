import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { getBoardsFailure, BoardType, CardType, ListType } from "../slice/boardSlice";

const API_URL = "http://localhost:8000/boards";

// === Add Card ===
function* addCardSaga(action: {
  type: string;
  payload: { boardId: string; listId: string; card: CardType };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, listId, card } = action.payload;

    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: board.lists.map((l) =>
        l.id === listId ? { ...l, cards: [...l.cards, card] } : l
      ),
    };

    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Update Card ===
function* updateCardSaga(action: {
  type: string;
  payload: { boardId: string; listId: string; card: CardType };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, listId, card } = action.payload;

    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: board.lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.map((c) => (c.id === card.id ? card : c)) }
          : l
      ),
    };

    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Delete Card ===
function* deleteCardSaga(action: {
  type: string;
  payload: { boardId: string; listId: string; cardId: string };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, listId, cardId } = action.payload;

    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: board.lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
          : l
      ),
    };

    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Root Saga for Cards ===
export default function* cardSaga() {
  yield takeLatest("boards/addCard", addCardSaga);
  yield takeLatest("boards/updateCard", updateCardSaga);
  yield takeLatest("boards/deleteCard", deleteCardSaga);
}
