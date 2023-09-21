import { createSlice, nanoid } from '@reduxjs/toolkit';
import { DEFAULT_DROPDOWN_STRING } from '../../../data/constants';

const initialState = {
  users: [
    {
      // Don't remove this first item, it is referenced in several files
      id: 0,
      name: `${DEFAULT_DROPDOWN_STRING}`,
    },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: {
      reducer: (state, action) => {
        state.users.push(action.payload);
      },
      prepare: name => ({
        payload: {
          id: nanoid(),
          name,
        },
      }),
    },
  },
});

// SELECTORS
export const selectAllUsers = state => state.users;
export const selectUserById = (state, payload) =>
  state.users.users.filter(user => user.id === payload.id);

// ACTIONS
export const { addUser } = usersSlice.actions;

// REDUCER
export default usersSlice.reducer;
