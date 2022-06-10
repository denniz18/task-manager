import {
  all,
  call,
  put,
  takeEvery,
  takeLeading,
  select,
} from 'redux-saga/effects';
import { fetchTasks, createTask } from '../api/tasks';
import { fetchSubTasks, deleteSubtask } from '../api/subTasks';
import {
  fetchTasksStart,
  setTasks,
  addTask,
  setRemoveSubtask,
  setRemoveTask,
  fetchTasksRequest,
  addTaskRequest,
  deleteSubtaskRequest,
} from './tasks/actions';

function* loadTasks() {
  try {
    yield put(fetchTasksStart());
    const tasks = yield call(fetchTasks);
    const subtasks = yield all(
      tasks.map((task) => call(fetchSubTasks, task.id))
    );

    const updatedTasks = tasks.map((task, index) => ({
      ...task,
      subtasks: subtasks[index],
    }));

    yield put(setTasks(updatedTasks));
  } catch (error) {
    console.error(error);
  }
}

function* createNewTask() {
  try {
    const task = yield call(createTask);
    const subtasks = yield call(fetchSubTasks, task.id);
    task.subtasks = subtasks;
    yield put(addTask(task));
  } catch (error) {
    console.error(error);
  }
}

function* removeSubTask({ payload }) {
  try {
    yield put(setRemoveSubtask(payload));
    const tasks = yield select((store) => store.tasks.data);
    const task = tasks.find((task) => task.id === payload.taskId);
    if (!task.subtasks.length) {
      yield put(setRemoveTask(payload.taskId));
    }
    yield call(deleteSubtask, payload.id);
  } catch (error) {
    console.error(error);
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(fetchTasksRequest.type, loadTasks),
    takeLeading(addTaskRequest.type, createNewTask),
    takeEvery(deleteSubtaskRequest.type, removeSubTask),
  ]);
}
