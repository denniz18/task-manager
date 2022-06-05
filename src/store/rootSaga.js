import { all } from 'redux-saga/effects';
import { tasksSaga } from './tasks/saga';
import { subTasksSaga } from './subTasks/saga';

export default function* () {
  yield all([tasksSaga(), subTasksSaga()]);
}
