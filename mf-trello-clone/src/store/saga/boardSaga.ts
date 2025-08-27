// saga/boardSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchBoards,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoardSuccess,
  updateBoardSuccess,
  deleteBoardSuccess,
  BoardType,
} from "../slice/boardSlice";

const API_URL = "http://localhost:3001/api";

function* fetchBoardsSaga():Generator<any, void, { data: BoardType[] }> {
  try {
    const res = yield call(() => axios.get<BoardType[]>(`${API_URL}/boards`));
    yield put(fetchBoardsSuccess(res.data));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* addBoardSaga(action: { type: string; payload: BoardType }): Generator<any, void, any> {
  try {
    const res = yield call(() => axios.post(`${API_URL}/boards`, action.payload));
    yield put(addBoardSuccess(res.data)); 
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* updateBoardSaga(action: { type: string; payload: BoardType }): Generator<any, void, any> {
  try {
    const res = yield call(() =>
      axios.put(`${API_URL}/boards/${action.payload.id}`, action.payload)
    );
    yield put(updateBoardSuccess(res.data));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* deleteBoardSaga(action: { type: string; payload: string }) {
  try {
    yield call(() => axios.delete(`${API_URL}/boards/${action.payload}`));
    yield put(deleteBoardSuccess(action.payload));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

export default function* boardSaga() {
  yield takeLatest(fetchBoards.type, fetchBoardsSaga);
  yield takeLatest("boards/addBoard", addBoardSaga);
  yield takeLatest("boards/updateBoard", updateBoardSaga);
  yield takeLatest("boards/deleteBoard", deleteBoardSaga);
}
