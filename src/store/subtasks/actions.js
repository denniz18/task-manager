import { createAction } from '@reduxjs/toolkit';
import { subTasksSlice } from './reducer';

export const fetchSubTasksRequest = createAction(
  'subTasks/fetchSubTasksRequest'
);
export const setDeleteSubTaskRequest = createAction(
  'subTasks/setDeleteSubTasksRequest'
);

export const {
  fetchSubTasksStart,
  setSubTasks,
  resetSubTasks,
  setDeleteSubTask,
} = subTasksSlice.actions;
