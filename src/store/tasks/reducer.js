import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataTasks: [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => ({
      ...state,
      loading: true,
    }),
    fetchTasksFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    fetchTasksSuccess: (state, action) => ({
      ...state,
      dataTasks: [...state.dataTasks, ...action.payload],
      loading: false,
    }),
    addTask: (state, action) => ({
      ...state,
      dataTasks: [...state.dataTasks, action.payload],
    }),
  },
});

export default tasksSlice.reducer;
