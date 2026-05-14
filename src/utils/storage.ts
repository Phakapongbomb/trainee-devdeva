/**
 * Loads the state from localStorage.
 * Returns undefined if no state is found or if there's an error.
 */
export const loadState = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

/**
 * Saves the current state to localStorage.
 */
export const saveState = (key: string, state: unknown) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
