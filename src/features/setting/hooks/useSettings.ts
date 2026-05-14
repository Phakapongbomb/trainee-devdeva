import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, selectColumns, selectUsers, selectPriorities } from '../../../store/selectors';
import { setProjects, setColumns, setPriorities, setUsers } from '../../../store/metadataSlice';
import { resetApp } from '../../../store/actions';
import { renameStatus, renamePriority, removeStatusFromTasks, removePriorityFromTasks } from '../../../store/taskSlice';
import { MOCK_PROJECTS, COLUMNS, MOCK_USERS, PRIORITIES } from '../../../constants/mockData';
import type { Column, Priority } from '../../../types/task';
import type { User } from '../../../types/user';

export const useSettings = () => {
    const dispatch = useDispatch();
    const reduxProjects = useSelector(selectProjects);
    const reduxColumns = useSelector(selectColumns);
    const reduxPriorities = useSelector(selectPriorities);
    const reduxUsers = useSelector(selectUsers);

    // Local state for editing before saving
    const [projects, setLocalProjects] = useState<string[]>(reduxProjects);
    const [columns, setLocalColumns] = useState<Column[]>(reduxColumns);
    const [priorities, setLocalPriorities] = useState<Priority[]>(reduxPriorities);
    const [users, setLocalUsers] = useState<User[]>(reduxUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const [modal, setModal] = useState<{
        type: 'save' | 'reset' | null;
    }>({ type: null });

    const isChanged = useMemo(() => {
        if (projects.length !== reduxProjects.length) return true;
        if (priorities.length !== reduxPriorities.length) return true;
        if (users.length !== reduxUsers.length) return true;
        return projects.some((p, i) => p !== reduxProjects[i]) ||
            JSON.stringify(priorities) !== JSON.stringify(reduxPriorities) ||
            JSON.stringify(columns) !== JSON.stringify(reduxColumns) ||
            JSON.stringify(users) !== JSON.stringify(reduxUsers);
    }, [projects, reduxProjects, columns, reduxColumns, priorities, reduxPriorities, users, reduxUsers]);

    const isNotDefault = useMemo(() => {
        return JSON.stringify(reduxProjects) !== JSON.stringify(MOCK_PROJECTS) ||
            JSON.stringify(reduxColumns) !== JSON.stringify(COLUMNS) ||
            JSON.stringify(reduxUsers) !== JSON.stringify(MOCK_USERS) ||
            JSON.stringify(reduxPriorities) !== JSON.stringify(PRIORITIES);
    }, [reduxProjects, reduxColumns, reduxUsers, reduxPriorities]);

    const handleSave = () => {
        // Sync Project Changes (Rename/Delete logic if needed in taskSlice)
        // Note: Project renames are handled via renameProject if we track them.
        // For simplicity, we focus on status and priority sync which are more critical.

        // Sync Status Changes
        reduxColumns.forEach((oldCol) => {
            const stillExists = columns.some(c => c.id === oldCol.id);
            if (!stillExists) {
                dispatch(removeStatusFromTasks(oldCol.status));
            } else {
                const newCol = columns.find(c => c.id === oldCol.id);
                if (newCol && newCol.status !== oldCol.status) {
                    dispatch(renameStatus({ oldStatus: oldCol.status, newStatus: newCol.status }));
                }
            }
        });

        // Sync Priority Changes
        reduxPriorities.forEach((oldP) => {
            const stillExists = priorities.some(p => p.id === oldP.id);
            if (!stillExists) {
                dispatch(removePriorityFromTasks(oldP.value));
            } else {
                const newP = priorities.find(p => p.id === oldP.id);
                if (newP && newP.value !== oldP.value) {
                    dispatch(renamePriority({ oldPriority: oldP.value, newPriority: newP.value }));
                }
            }
        });

        dispatch(setProjects(projects));
        dispatch(setColumns(columns));
        dispatch(setPriorities(priorities));
        dispatch(setUsers(users));
        setModal({ type: null });
    };

    const confirmReset = () => {
        dispatch(resetApp());
        setLocalProjects(MOCK_PROJECTS);
        setLocalColumns(COLUMNS);
        setLocalPriorities(PRIORITIES);
        setLocalUsers(MOCK_USERS);
        setModal({ type: null });
    };

    return {
        reduxUsers,
        projects,
        setLocalProjects,
        columns,
        setLocalColumns,
        priorities,
        setLocalPriorities,
        users,
        setLocalUsers,
        searchQuery,
        setSearchQuery,
        modal,
        setModal,
        isChanged,
        isNotDefault,
        handleSave,
        confirmReset,
        handleAddUser: (newUser: User) => {
            setLocalUsers([...users, newUser]);
        },
        handleUpdateUser: (updatedUser: User) => {
            setLocalUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
    };
};
