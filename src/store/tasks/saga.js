import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchTasks, createTask } from '../../api/tasks';
import {
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTasksStart,
  addTaskRequest,
  fetchTasksRequest,
  addTask,
} from './actions';

function* loadTasks() {
  try {
    yield put(fetchTasksStart());
    const response = yield call(fetchTasks);
    yield put(fetchTasksSuccess(response));
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

function* createNewTask() {
  const task = yield call(createTask);
  yield put(addTask(task));
}

export function* tasksSaga() {
  yield all([
    takeEvery(fetchTasksRequest.type, loadTasks),
    takeEvery(addTaskRequest.type, createNewTask),
  ]);
}
