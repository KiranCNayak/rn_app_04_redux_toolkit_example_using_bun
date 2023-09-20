import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

// SELECTORS
export const selectAllPosts = state => state.posts;

// ACTIONS
export const { addPost } = postsSlice.actions;

// REDUCER
export default postsSlice.reducer;
