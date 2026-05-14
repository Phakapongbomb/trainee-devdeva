import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import filterReducer from './filterSlice';
import { loadState, saveState } from '../utils/storage';

// Define the state shape explicitly to avoid 'any' and circular dependencies
export interface AppState {
    tasks: ReturnType<typeof taskReducer>;
    filters: ReturnType<typeof filterReducer>;
}

/**
 * 1. Load initial state from LocalStorage.
 * Hydrates the store with existing data on startup.
 */
const preloadedState = loadState('appData') as Partial<AppState> | undefined;

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        filters: filterReducer,
    },
    preloadedState,
});

/**
 * 3. Persistence Logic with Robust Saving & Safety Exit.
 */
let saveTimeout: ReturnType<typeof setTimeout> | undefined;

// Function to handle immediate saving
const handleImmediateSave = () => {
    const state = store.getState();
    saveState('appData', {
        tasks: state.tasks,
        // We no longer save filters to prevent UX "stuck" issues (Partial Persistence)
    });
};

store.subscribe(() => {
    if (saveTimeout) clearTimeout(saveTimeout);
    
    // Reduce debounce to 500ms for more responsive saving
    saveTimeout = setTimeout(handleImmediateSave, 500);
});

/**
 * 4. Safety Exit: Force an immediate save when the user closes the tab or refreshes.
 * This ensures no data is lost even if the debounce timer hasn't fired yet.
 */
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleImmediateSave);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
