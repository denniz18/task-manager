import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { fetchSubTasks, deleteSubtask } from '../../api/subTasks';
import {
  fetchSubTasksStart,
  fetchSubTasksSuccess,
  fetchSubTasksFailure,
  fetchSubTasksRequest,
  deleteSubTaskRequest,
  removeSubTask,
} from './actions';
import { deleteTask } from '../tasks/actions';

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
  yield put(removeSubTask(payload.id));
  yield call(deleteSubtask, payload.id);
  const subTasks = yield select((state) =>
    state.subTasks.dataSubTasks.filter(
      (subTask) => subTask.taskId === payload.taskId
    )
  );
  if (!subTasks.length) {
    yield put(deleteTask(payload.taskId));
  }
}

export function* subTasksSaga() {
  yield all([
    takeEvery(fetchSubTasksRequest.type, loadSubTasks),
    takeEvery(deleteSubTaskRequest.type, deleteSubTask),
  ]);
}
