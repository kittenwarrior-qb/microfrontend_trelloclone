import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AxiosResponse } from "axios";
import { getBoards, getBoardsSuccess, getBoardsFailure, BoardType } from "../slice/boardSlice";

const API_URL = "http://localhost:8000/boards";

function* fetchBoardsSaga(): Generator<any, void, AxiosResponse<BoardType[]>> {
  try {
    const response = yield call(() => axios.get<BoardType[]>(API_URL));
    yield put(getBoardsSuccess(response.data));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

function* addBoardSaga(action: { type: string; payload: BoardType }) {
  try {
    yield call(() => axios.post(API_URL, action.payload));
    yield call(fetchBoardsSaga);
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

function* updateBoardSaga(action: { type: string; payload: BoardType }) {
  try {
    yield call(() => axios.put(`${API_URL}/${action.payload.id}`, action.payload));
    yield call(fetchBoardsSaga);
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

function* deleteBoardSaga(action: { type: string; payload: string }) {
  try {
    yield call(() => axios.delete(`${API_URL}/${action.payload}`));
    yield call(fetchBoardsSaga);
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

export default function* boardSaga() {
  yield takeLatest(getBoards.type, fetchBoardsSaga);
  yield takeLatest("boards/addBoard", addBoardSaga);
  yield takeLatest("boards/updateBoard", updateBoardSaga);
  yield takeLatest("boards/deleteBoard", deleteBoardSaga);
}
