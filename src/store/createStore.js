import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import tasks from './tasks/reducer';
import subTasks from './subTasks/reducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks,
    subTasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

sagaMiddleware.run(rootSaga);
