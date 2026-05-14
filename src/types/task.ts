import type { User } from './user';

export interface Task {
    id: string;
    title: string;
    project: string;
    type: string;
    priority: string;
    date: string;
    status: string;
    progress: number;
    avatars: string[];
    description?: string;
    assignees: User[];
}

export interface Column {
    id: string;
    title: string;
    status: string;
    theme: 'slate' | 'blue' | 'green' | 'amber' | 'purple' | 'pink' | 'red';
}
export interface Priority {
    id: string;
    label: string;
    value: string;
}
