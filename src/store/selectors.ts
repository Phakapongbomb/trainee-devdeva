import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './index';
import { filterTasks } from './utils/taskFilters';

/**
 * Basic selectors to get raw slices of state
 */
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectFilters = (state: RootState) => state.filters;

/**
 * Memoized selector that returns filtered tasks based on search query, 
 * priority, and status filters.
 */
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilters],
    (tasks, filters) => filterTasks(tasks, filters)
);

/**
 * Metadata Selectors
 */
export const selectUsers = (state: RootState) => state.metadata.users;
export const selectProjects = (state: RootState) => state.metadata.projects;
export const selectColumns = (state: RootState) => state.metadata.columns;
export const selectFilterState = (state: RootState) => state.filters;
