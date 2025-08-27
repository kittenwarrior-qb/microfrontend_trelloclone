// saga/listSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchBoardsFailure } from "../slice/boardSlice";
import {
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
  fetchListsSuccess,
  ListType,
} from "../slice/listSlice";

const API_URL = "http://localhost:3001/api";

function* fetchListsSaga(action: { type: string; payload: string }): Generator<any, void, any> {
  try {
    const boardId = action.payload;
    const res = yield call(() => axios.get(`${API_URL}/boards/${boardId}/lists`));
    yield put(fetchListsSuccess(res.data)); 
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* addListSaga(action: { type: string; payload: { boardId: string; list: ListType } }): Generator<any, void, any> {
  try {
    const { boardId, list } = action.payload;
    const res = yield call(() => axios.post(`${API_URL}/boards/${boardId}/lists`, list));
    yield put(addListSuccess(res.data));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* updateListSaga(action: { type: string; payload: ListType }): Generator<any, void, any> {
  try {
    const res = yield call(() => axios.put(`${API_URL}/lists/${action.payload.id}`, action.payload));
    yield put(updateListSuccess(res.data));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

function* deleteListSaga(action: { type: string; payload: string }) {
  try {
    yield call(() => axios.delete(`${API_URL}/lists/${action.payload}`));
    yield put(deleteListSuccess(action.payload));
  } catch (err: any) {
    yield put(fetchBoardsFailure(err.message));
  }
}

export default function* listSaga() {
  yield takeLatest("lists/fetchLists", fetchListsSaga);
  yield takeLatest("lists/addList", addListSaga);
  yield takeLatest("lists/updateList", updateListSaga);
  yield takeLatest("lists/deleteList", deleteListSaga);
}
