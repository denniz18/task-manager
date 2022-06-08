import { createAction } from '@reduxjs/toolkit';
import { tasksSlice } from './reducer';

export const addTaskRequest = createAction('tasks/addTaskRequest');
export const fetchTasksRequest = createAction('tasks/fetchTasksRequest');
export const deleteSubtaskRequest = createAction('tasks/deleteSubtaskRequest');

export const {
  fetchTasksStart,
  setTasks,
  addTask,
  setRemoveSubtask,
  setRemoveTask,
} = tasksSlice.actions;
