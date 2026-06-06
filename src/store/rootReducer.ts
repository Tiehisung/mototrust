import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slices/auth.slice";
import { api } from "../services/api";
import tempDataReducer from './slices/index'
import settingsSlice from './slices/settings.slice'
import recentSearchesReducer from './slices/recentSearch.slice'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    recentSearches: recentSearchesReducer,
    tempData: tempDataReducer,
    settings: settingsSlice
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'api', 'player', 'news', 'tempData', "recentSearches", 'settings'], // ⭐  Only persist API cache
    blacklist: ['someTempReducer'], // Don't persist temporary data
};

export const persistedReducer =
    persistReducer(persistConfig, rootReducer);