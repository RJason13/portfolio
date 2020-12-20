import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './theme';
import headerReducer from './header';

const rootReducer = combineReducers({
    theme: themeReducer,
    header: headerReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
