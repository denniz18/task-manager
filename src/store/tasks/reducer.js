import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isPending: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => ({
      ...state,
      isPending: true,
    }),
    setTasks: (state, action) => ({
      ...state,
      data: action.payload,
      isPending: false,
    }),
    addTask: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    setRemoveSubtask: (state, { payload }) => {
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.id !== payload.taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.filter(
              (subtask) => subtask.id !== payload.id
            ),
          };
        }),
      };
    },
    setRemoveTask: (state, { payload }) => {
      return {
        ...state,
        data: state.data.filter((task) => task.id !== payload),
      };
    },
  },
});

export default tasksSlice.reducer;
