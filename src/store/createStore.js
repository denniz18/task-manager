import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import tasks from './tasks/reducer';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

sagaMiddleware.run(rootSaga);
