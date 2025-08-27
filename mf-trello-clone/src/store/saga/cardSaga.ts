// saga/cardSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchCards,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardSuccess,
  updateCardSuccess,
  deleteCardSuccess,
  moveCard,
  moveCardSuccess,
  MoveCardPayload,
  CardType,
} from "../slice/cardSlice";

const API_URL = "http://localhost:3001/api"; 

function* fetchCardsSaga(action: { type: string; payload: { listId: string } }) {
  try {
    const { listId } = action.payload;
    const res: AxiosResponse<CardType[]> = yield call(() =>
      axios.get(`${API_URL}/lists/${listId}/cards`)
    );
    yield put(fetchCardsSuccess({ listId, cards: res.data }));
  } catch (err: any) {
    yield put(fetchCardsFailure(err.message));
  }
}

function* addCardSaga(action: {
  type: string;
  payload: { listId: string; card: CardType };
}) {
  try {
    const { listId, card } = action.payload;
    const res: AxiosResponse<CardType> = yield call(() =>
      axios.post(`${API_URL}/lists/${listId}/cards`, card)
    );
    yield put(addCardSuccess(res.data));
  } catch (err: any) {
    yield put(fetchCardsFailure(err.message));
  }
}

function* updateCardSaga(action: { type: string; payload: CardType }) {
  try {
    const card = action.payload;
    const res: AxiosResponse<CardType> = yield call(() =>
      axios.put(`${API_URL}/cards/${card.id}`, card)
    );
    yield put(updateCardSuccess(res.data));
  } catch (err: any) {
    yield put(fetchCardsFailure(err.message));
  }
}

function* deleteCardSaga(action: { type: string; payload: string }) {
  try {
    const cardId = action.payload;
    yield call(() => axios.delete(`${API_URL}/cards/${cardId}`));
    yield put(deleteCardSuccess(cardId));
  } catch (err: any) {
    yield put(fetchCardsFailure(err.message));
  }
}
function* moveCardSaga(action: { type: string; payload: MoveCardPayload }) {
  try {
    const { cardId, toListId } = action.payload;
    const res: AxiosResponse<CardType> = yield call(() =>
      axios.patch(`${API_URL}/cards/${cardId}`, { list_id: toListId })
    );
    yield put(moveCardSuccess(res.data));
  } catch (err: any) {
    yield put(fetchCardsFailure(err.message));
  }
}
export default function* cardSaga() {
  yield takeEvery(fetchCards.type, fetchCardsSaga);
  yield takeEvery(moveCard.type, moveCardSaga);
  yield takeEvery("cards/addCard", addCardSaga);
  yield takeEvery("cards/updateCard", updateCardSaga);
  yield takeEvery("cards/deleteCard", deleteCardSaga);
}
