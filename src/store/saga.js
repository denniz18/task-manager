import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { fetchTasks, createTask } from '../api/tasks';
import { fetchSubTasks, deleteSubtask } from '../api/subTasks';
import {
  fetchTasksStart,
  setTasks,
  addTask,
  deleteTask,
  fetchTasksRequest,
  addTaskRequest,
} from './tasks/actions';
import {
  fetchSubTasksStart,
  setSubTasks,
  resetSubTasks,
  setDeleteSubTask,
  fetchSubTasksRequest,
  setDeleteSubTaskRequest,
} from './subtasks/actions';

function* loadTasks() {
  try {
    yield put(fetchTasksStart());
    const tasks = yield call(fetchTasks);
    yield put(setTasks(tasks));
  } catch (error) {
    console.log(error);
  }
}

function* createNewTask() {
  try {
    const task = yield call(createTask);
    yield put(addTask(task));
  } catch (error) {
    console.log(error);
  }
}

function* loadSubTasks({ payload }) {
  try {
    yield put(resetSubTasks());
    yield put(fetchSubTasksStart());
    const subTasks = yield call(fetchSubTasks, payload);
    yield put(setSubTasks(subTasks));
  } catch (error) {
    console.log(error);
  }
}

function* removeSubTask({ payload }) {
  try {
    yield put(setDeleteSubTask(payload.id));
    const subTasks = yield select((store) => store.subTasks.data);
    if (!subTasks.length) {
      yield put(deleteTask(payload.taskId));
    }
    yield call(deleteSubtask, payload.id);
  } catch (error) {
    console.log(error);
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(fetchTasksRequest.type, loadTasks),
    takeEvery(addTaskRequest.type, createNewTask),
    takeEvery(fetchSubTasksRequest.type, loadSubTasks),
    takeEvery(setDeleteSubTaskRequest.type, removeSubTask),
  ]);
}
