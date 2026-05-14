import type { Task, Column, Priority } from '../types/task';
import type { User } from '../types/user';

export const MOCK_USERS: User[] = [
    { id: '1', fullName: 'Alexander Thompson', nickname: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Member' },
    { id: '2', fullName: 'Brittany Watkins', nickname: 'Brit', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Member' },
    { id: '3', fullName: 'Christopher Miller', nickname: 'Chris', avatar: 'https://i.pravatar.cc/150?u=3', role: 'Member' },
    { id: '4', fullName: 'Danielle Cooper', nickname: 'Dani', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Member' },
    { id: '5', fullName: 'Ethan Sullivan', nickname: 'Ethan', avatar: 'https://i.pravatar.cc/150?u=5', role: 'Member' },
    { id: '6', fullName: 'Fiona Gallagher', nickname: 'Fi', avatar: 'https://i.pravatar.cc/150?u=6', role: 'Member' },
    { id: '7', fullName: 'George Harrison', nickname: 'Geo', avatar: 'https://i.pravatar.cc/150?u=7', role: 'Member' },
    { id: '8', fullName: 'Hannah Abbott', nickname: 'Han', avatar: 'https://i.pravatar.cc/150?u=8', role: 'Member' },
    { id: '9', fullName: 'Isaac Newton', nickname: 'Isaac', avatar: 'https://i.pravatar.cc/150?u=9', role: 'Member' },
    { id: '10', fullName: 'Jessica Jones', nickname: 'Jess', avatar: 'https://i.pravatar.cc/150?u=10', role: 'Member' },
    { id: '11', fullName: 'Kevin Parker', nickname: 'Kevin', avatar: 'https://i.pravatar.cc/150?u=11', role: 'Member' },
    { id: '12', fullName: 'Laura Palmer', nickname: 'Laura', avatar: 'https://i.pravatar.cc/150?u=12', role: 'Member' },
    { id: '13', fullName: 'Michael Scott', nickname: 'Mike', avatar: 'https://i.pravatar.cc/150?u=13', role: 'Member' },
    { id: '14', fullName: 'Natalie Portman', nickname: 'Nat', avatar: 'https://i.pravatar.cc/150?u=14', role: 'Member' },
    { id: '15', fullName: 'Oscar Martinez', nickname: 'Oscar', avatar: 'https://i.pravatar.cc/150?u=15', role: 'Member' },
    { id: '16', fullName: 'Pam Beesly', nickname: 'Pam', avatar: 'https://i.pravatar.cc/150?u=16', role: 'Member' },
    { id: '17', fullName: 'Quinn Fabray', nickname: 'Quinn', avatar: 'https://i.pravatar.cc/150?u=17', role: 'Member' },
    { id: '18', fullName: 'Ryan Howard', nickname: 'Ryan', avatar: 'https://i.pravatar.cc/150?u=18', role: 'Member' },
    { id: '19', fullName: 'Sarah Connor', nickname: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=19', role: 'Member' },
    { id: '20', fullName: 'Tony Stark', nickname: 'Tony', avatar: 'https://i.pravatar.cc/150?u=20', role: 'Member' },
    { id: '21', fullName: 'Ursula Buffay', nickname: 'Urs', avatar: 'https://i.pravatar.cc/150?u=21', role: 'Member' },
    { id: '22', fullName: 'Victor Stone', nickname: 'Vic', avatar: 'https://i.pravatar.cc/150?u=22', role: 'Member' },
    { id: '23', fullName: 'Wanda Maximoff', nickname: 'Wanda', avatar: 'https://i.pravatar.cc/150?u=23', role: 'Member' },
    { id: '24', fullName: 'Xavier Woods', nickname: 'X', avatar: 'https://i.pravatar.cc/150?u=24', role: 'Member' },
    { id: '25', fullName: 'Yara Greyjoy', nickname: 'Yara', avatar: 'https://i.pravatar.cc/150?u=25', role: 'Member' },
    { id: '26', fullName: 'Zack Morris', nickname: 'Zack', avatar: 'https://i.pravatar.cc/150?u=26', role: 'Member' },
    { id: '27', fullName: 'Amy Pond', nickname: 'Amy', avatar: 'https://i.pravatar.cc/150?u=27', role: 'Member' },
    { id: '28', fullName: 'Ben Solo', nickname: 'Ben', avatar: 'https://i.pravatar.cc/150?u=28', role: 'Member' },
    { id: '29', fullName: 'Clara Oswald', nickname: 'Clara', avatar: 'https://i.pravatar.cc/150?u=29', role: 'Member' },
    { id: '30', fullName: 'David Rose', nickname: 'David', avatar: 'https://i.pravatar.cc/150?u=30', role: 'Member' },
];

export const MOCK_PROJECTS = [
    'Web App Redesign',
    'Mobile Banking App',
    'AI Integration',
    'Marketing Campaign',
    'Cloud Migration',
    'Security Audit',
    'Customer Portal',
    'E-commerce Launch',
    'Data Analytics',
    'Internal Tooling'
];

export const PRIORITIES: Priority[] = [
    { id: 'high', label: 'High', value: 'High' },
    { id: 'medium', label: 'Medium', value: 'Medium' },
    { id: 'low', label: 'Low', value: 'Low' },
];

export const INITIAL_TASKS: Task[] = Array.from({ length: 30 }, (_, i) => {
    const id = (i + 1).toString();
    const priorityValues = PRIORITIES.map(p => p.value);
    const types = ['Feature', 'Bug', 'Design', 'Refactor'];

    let status: Task['status'] = 'To Do';
    if (i >= 15 && i < 23) status = 'In Progress';
    if (i >= 23) status = 'Done';

    // Assign 1-3 users from MOCK_USERS
    const userCount = (i % 3) + 1;
    const taskUsers = Array.from({ length: userCount }, (_, j) => MOCK_USERS[(i + j) % MOCK_USERS.length]);
    const avatars = taskUsers.map(user => user.avatar);

    return {
        id,
        title: `Task ${id}: ${[
            'Implement Dark Mode', 'Fix Login Bug', 'Refactor Auth Flow',
            'Design New Landing', 'API Integration', 'Update Documentation',
            'Mobile Optimization', 'Performance Audit', 'Security Patch',
            'Add Unit Tests'
        ][i % 10]}`,
        project: MOCK_PROJECTS[i % MOCK_PROJECTS.length],
        type: types[i % types.length],
        priority: priorityValues[i % priorityValues.length],
        date: `${20 + (i % 10)}/10/2026`,
        status,
        progress: status === 'Done' ? 100 : (status === 'In Progress' ? 45 : 0),
        avatars,
        assignees: taskUsers,
        role: "Member",
        description: `<p>Detailed description for Task ${id}. This task focuses on improving the user experience through ${types[i % types.length].toLowerCase()} work.</p><ul><li>Step 1: Analysis</li><li>Step 2: Implementation</li></ul>`
    };
});

export const COLUMNS: Column[] = [
    { id: 'todo', title: 'To Do', status: 'To Do', theme: 'slate' },
    { id: 'in-progress', title: 'In Progress', status: 'In Progress', theme: 'blue' },
    { id: 'done', title: 'Done', status: 'Done', theme: 'green' }
];
