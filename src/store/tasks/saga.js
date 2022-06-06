import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchTasks, createTask } from '../../api/tasks';
import { fetchSubTasks } from '../../api/subTasks';
import {
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTasksStart,
  addTaskRequest,
  fetchTasksRequest,
  addTask,
} from './actions';

function taskGrouping(tasks, subTasks) {
  if (!tasks.length) return null;

  return tasks.reduce(
    (result, task) => {
      task.subTasks = subTasks.filter(
        (subTask) => subTask[0].taskId === task.id
      );

      return tasks;
    },
    [tasks]
  );
}

function* loadTasks() {
  try {
    yield put(fetchTasksStart());
    const tasks = yield call(fetchTasks);
    const subTasks = yield all(
      tasks.map((task) => call(fetchSubTasks, task.id))
    );

    const tasksGroup = taskGrouping(tasks, subTasks);

    yield put(fetchTasksSuccess(tasksGroup));
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

function* createNewTask() {
  const task = yield call(createTask);
  const subTasks = yield call(fetchSubTasks, task.id);
  task.subTasks = [subTasks];
  yield put(addTask(task));
}

export function* tasksSaga() {
  yield all([
    takeEvery(fetchTasksRequest.type, loadTasks),
    takeEvery(addTaskRequest.type, createNewTask),
  ]);
}
