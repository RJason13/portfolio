import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'state/store';
import { getLocalBooleanItem, setLocalBooleanItem } from 'utils/localStorageUtils';

interface ThemeState {
    darkMode: boolean | null;
}

const darkModeStorageKey = 'darkMode';

const initialState: ThemeState = {
    darkMode: getLocalBooleanItem(darkModeStorageKey)
};

// Slice
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean | null>) => {
            state.darkMode = action.payload;
        }
    }
});

// Reducers
export default themeSlice.reducer;

// Selectors
export const themeSelector = (state: RootState) => state.theme;
export const darkModeSelector = (state: RootState) => state.theme.darkMode;

// Actions
const { setDarkMode } = themeSlice.actions;

// Thunks
export const toggleDarkMode = (payload?: boolean): AppThunk => dispatch => {
    let nextValue: boolean | null;
    if (payload !== undefined) {
        nextValue = payload;
    } else {
        const darkMode = getLocalBooleanItem(darkModeStorageKey);
        nextValue = darkMode === null ? false : !darkMode ? true : null;
    }
    setLocalBooleanItem(darkModeStorageKey, nextValue);

    dispatch(setDarkMode(nextValue));
};
