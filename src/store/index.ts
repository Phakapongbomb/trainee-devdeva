import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        filters: filterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
