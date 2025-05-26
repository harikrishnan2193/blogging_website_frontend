import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogReducer from './blogSlice'
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    // search: searchReducer,
  },
})

export default store;
