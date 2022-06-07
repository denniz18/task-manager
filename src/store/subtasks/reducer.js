import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isPending: false,
};

export const subTasksSlice = createSlice({
  name: 'subTasks',
  initialState,
  reducers: {
    fetchSubTasksStart: (state) => ({
      ...state,
      isPending: true,
    }),
    setSubTasks: (state, action) => ({
      ...state,
      data: action.payload,
      isPending: false,
    }),
    resetSubTasks: () => ({
      data: [],
      isPending: false,
    }),
    setDeleteSubTask: (state, action) => ({
      ...state,
      data: state.data.filter((subTask) => subTask.id !== action.payload),
    }),
  },
});

export default subTasksSlice.reducer;
