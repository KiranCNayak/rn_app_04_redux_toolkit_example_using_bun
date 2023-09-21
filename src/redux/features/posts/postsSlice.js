import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (description, title, userId) => ({
        payload: {
          id: nanoid(),
          description,
          title,
          userId,
        },
      }),
    },
  },
});

// SELECTORS
export const selectAllPosts = state => state.posts;

// ACTIONS
export const { addPost } = postsSlice.actions;

// REDUCER
export default postsSlice.reducer;
