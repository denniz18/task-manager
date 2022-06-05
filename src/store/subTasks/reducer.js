import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataSubTasks: [],
  loading: false,
  error: null,
};

export const subTasksSlice = createSlice({
  name: 'subTasks',
  initialState,
  reducers: {
    fetchSubTasksStart: (state) => ({
      ...state,
      loading: true,
    }),
    fetchSubTasksFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    fetchSubTasksSuccess: (state, action) => ({
      ...state,
      dataSubTasks: [...state.dataSubTasks, ...action.payload],
      loading: false,
    }),
    deleteTag: (state, { payload }) => ({
      ...state,
      dataSubTasks: [
        ...state.dataSubTasks.filter((subTask) => subTask.id !== payload),
      ],
    }),
  },
});

export default subTasksSlice.reducer;
