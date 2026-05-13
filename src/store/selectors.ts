import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './index';

/**
 * Basic selectors to get raw slices of state
 */
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectFilters = (state: RootState) => state.filters;

/**
 * Memoized selector that returns filtered tasks based on search query, 
 * priority, and status filters.
 * 
 * It re-computes only when either the tasks list or the filter state changes.
 */
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilters],
    (tasks, filters) => {
        const { searchQuery, priorityFilter, statusFilter } = filters;

        return tasks.filter(task => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.project.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesPriority =
                priorityFilter === 'All Priorities' || task.priority === priorityFilter;

            const matchesStatus =
                statusFilter === 'Status: All' || task.status === statusFilter;

            return matchesSearch && matchesPriority && matchesStatus;
        });
    }
);

/**
 * Returns the filter state directly.
 */
export const selectFilterState = (state: RootState) => state.filters;
