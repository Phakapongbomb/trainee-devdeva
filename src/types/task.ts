export interface Task {
    id: string;
    title: string;
    project: string;
    type: string;
    priority: 'High' | 'Medium' | 'Low';
    date: string;
    status: 'To Do' | 'In Progress' | 'Done';
    progress: number;
    avatars: string[];
}

export interface Column {
    id: 'todo' | 'in-progress' | 'done';
    title: string;
    status: Task['status'];
    theme: 'slate' | 'blue' | 'green';
}
