import { useState, useEffect } from 'react';

/**
 * Custom hook to handle the delayed unmounting logic for exit animations.
 * Follows React Architecture Standard Rule 1 (Separation of Concerns).
 */
export const useDelayUnmount = (show: boolean, duration: number) => {
    const [shouldRender, setShouldRender] = useState(show);

    /**
     * Rule 7.1 & 7.4 Optimization:
     * If 'show' becomes true, we want to render immediately without waiting for an effect
     * to trigger another render cycle. This is the recommended pattern for "adjusting 
     * state based on props".
     */
    if (show && !shouldRender) {
        setShouldRender(true);
    }

    useEffect(() => {
        if (!show) {
            // Delay unmounting until the animation finishes
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [show, duration]);

    return shouldRender;
};
