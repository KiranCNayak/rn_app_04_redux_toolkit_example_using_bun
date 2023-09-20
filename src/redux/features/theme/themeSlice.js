import {createSlice} from '@reduxjs/toolkit';

import {THEME_VARIANT} from '../../../data/constants';

const initialState = {
  theme: THEME_VARIANT.dark,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    resetTheme: state => {
      state.theme = THEME_VARIANT.dark;
    },
    toggleTheme: state => {
      state.theme =
        state.theme === THEME_VARIANT.dark
          ? THEME_VARIANT.light
          : THEME_VARIANT.dark;
    },
  },
});

export const {resetTheme, toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
