// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from '../Store/Redux/Reducers/UserReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
