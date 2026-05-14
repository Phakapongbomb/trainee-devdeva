import { MOCK_USERS, MOCK_PROJECTS, COLUMNS, INITIAL_TASKS } from '../constants/mockData';
import type { Task, Column } from '../types/task';
import type { User } from '../types/user';

/**
 * Hydration helper to provide initial data from mock sources.
 * Keeps slices clean and focused on state management logic.
 */
export const getInitialTasks = (): Task[] => INITIAL_TASKS;
export const getInitialUsers = (): User[] => MOCK_USERS;
export const getInitialProjects = (): string[] => MOCK_PROJECTS;
export const getInitialColumns = (): Column[] => COLUMNS;
