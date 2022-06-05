import { createAction } from '@reduxjs/toolkit';
import { subTasksSlice } from './reducer';

export const fetchSubTasksRequest = createAction(
  'subTasks/fetchSubTasksRequest'
);

export const deleteSubTaskRequest = createAction(
  'subTasks/deleteSubTaskRequest'
);

export const {
  fetchSubTasksStart,
  fetchSubTasksFailure,
  fetchSubTasksSuccess,
  deleteTag,
} = subTasksSlice.actions;
