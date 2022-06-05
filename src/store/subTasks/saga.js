import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchSubTasks, deleteSubtask } from '../../api/subTasks';
import {
  fetchSubTasksStart,
  fetchSubTasksSuccess,
  fetchSubTasksFailure,
  fetchSubTasksRequest,
  deleteSubTaskRequest,
  deleteTag,
} from './actions';

function* loadSubTasks({ payload }) {
  try {
    yield put(fetchSubTasksStart());
    const subTasks = yield call(fetchSubTasks, payload);
    yield put(fetchSubTasksSuccess(subTasks));
  } catch (error) {
    yield put(fetchSubTasksFailure(error));
  }
}

function* deleteSubTask({ payload }) {
  yield call(deleteSubtask, payload);
  yield put(deleteTag(payload));
}

export function* subTasksSaga() {
  yield all([
    takeEvery(fetchSubTasksRequest.type, loadSubTasks),
    takeEvery(deleteSubTaskRequest.type, deleteSubTask),
  ]);
}
