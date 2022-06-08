import { createSlice, current } from '@reduxjs/toolkit';

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
      const taskIndex = current(state).data.findIndex(
        (task) => task.id === payload.taskId
      );
      const updateSubtasks = current(state).data[taskIndex].subtasks.filter(
        (subtask) => subtask.id !== payload.id
      );
      state.data[taskIndex].subtasks = updateSubtasks;
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
