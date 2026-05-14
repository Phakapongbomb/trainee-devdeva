import type { Task } from '../../types/task';
import type { FilterState } from '../filterSlice';
import { FILTER_ALL_PRIORITIES, FILTER_ALL_STATUSES } from '../../constants/filters';

/**
 * Pure utility function to filter tasks based on multiple criteria.
 * Extracted from selectors to improve maintainability and testability.
 */
export const filterTasks = (tasks: Task[], filters: FilterState): Task[] => {
    const { navSearch, searchQuery, priorityFilter, statusFilter } = filters;

    // Pre-calculate lower-case search strings once
    const navLower = navSearch.toLowerCase();
    const queryLower = searchQuery.toLowerCase();

    return tasks.filter(task => {
        const matchesNav = !navSearch ||
            task.title.toLowerCase().includes(navLower) ||
            task.priority.toLowerCase().includes(navLower) ||
            task.status.toLowerCase().includes(navLower);

        const matchesLocalSearch = !searchQuery ||
            task.title.toLowerCase().includes(queryLower) ||
            task.project.toLowerCase().includes(queryLower);

        const matchesPriority = priorityFilter === FILTER_ALL_PRIORITIES || task.priority === priorityFilter;
        const matchesStatus = statusFilter === FILTER_ALL_STATUSES || task.status === statusFilter;

        return matchesNav && matchesLocalSearch && matchesPriority && matchesStatus;
    });
};
