import { configureStore } from '@reduxjs/toolkit';

import postsReducer from './features/posts/postsSlice';
import themeReducer from './features/theme/themeSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    theme: themeReducer,
    users: usersReducer,
  },
});
