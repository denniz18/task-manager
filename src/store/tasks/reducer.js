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
    deleteTask: (state, action) => ({
      ...state,
      data: state.data.filter((task) => task.id !== action.payload),
    }),
  },
});

export default tasksSlice.reducer;
