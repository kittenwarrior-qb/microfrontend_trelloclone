import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { getBoardsFailure, BoardType, ListType } from "../slice/boardSlice";

const API_URL = "http://localhost:8000/boards";

// === Add List ===
function* addListSaga(action: {
  type: string;
  payload: { boardId: string; list: ListType };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, list } = action.payload;

    // Lấy board hiện tại
    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: [...board.lists, list],
    };

    // Cập nhật board với list mới
    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Update List ===
function* updateListSaga(action: {
  type: string;
  payload: { boardId: string; list: ListType };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, list } = action.payload;

    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: board.lists.map((l) => (l.id === list.id ? list : l)),
    };

    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Delete List ===
function* deleteListSaga(action: {
  type: string;
  payload: { boardId: string; listId: string };
}): Generator<any, void, AxiosResponse<BoardType>> {
  try {
    const { boardId, listId } = action.payload;

    const boardRes: AxiosResponse<BoardType> = yield call(() =>
      axios.get<BoardType>(`${API_URL}/${boardId}`)
    );
    const board: BoardType = boardRes.data;

    const updatedBoard: BoardType = {
      ...board,
      lists: board.lists.filter((l) => l.id !== listId),
    };

    yield call(() => axios.put(`${API_URL}/${boardId}`, updatedBoard));
  } catch (error: any) {
    yield put(getBoardsFailure(error.message));
  }
}

// === Root Saga for Lists ===
export default function* listSaga() {
  yield takeLatest("boards/addList", addListSaga);
  yield takeLatest("boards/updateList", updateListSaga);
  yield takeLatest("boards/deleteList", deleteListSaga);
}
