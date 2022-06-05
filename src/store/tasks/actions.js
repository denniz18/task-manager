import { createAction } from '@reduxjs/toolkit';
import { tasksSlice } from './reducer';

export const addTaskRequest = createAction('tasks/addTaskRequest');
export const fetchTasksRequest = createAction('tasks/fetchTasksRequest');

export const {
  fetchTasksStart,
  fetchTasksFailure,
  fetchTasksSuccess,
  addTask,
  fetchSubTask,
} = tasksSlice.actions;
