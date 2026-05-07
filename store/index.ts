import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { listenerMiddleware } from './middleware/listenerMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type { RootState } from './rootReducer';
export type AppDispatch = typeof store.dispatch;
