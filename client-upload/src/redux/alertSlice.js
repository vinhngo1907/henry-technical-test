import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  success: ''
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = '';
      state.success = '';
    },
    setSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = '';
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = '';
    },
    clearAlert: () => initialState
  }
});

export const { setLoading, setSuccess, setError, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;