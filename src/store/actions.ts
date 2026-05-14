import { createAction } from '@reduxjs/toolkit';

/**
 * Global action to reset the entire application state.
 * Listen to this action in individual slices using extraReducers.
 */
export const resetApp = createAction('app/reset');
