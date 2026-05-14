import React from 'react';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';

interface FadeInProps {
    children: React.ReactNode;
    /** Whether the component should be shown. Defaults to true. */
    show?: boolean;
    /** Animation duration in milliseconds. Defaults to 500. */
    duration?: number;
    /** Animation delay in milliseconds. Defaults to 0. */
    delay?: number;
    /** Additional CSS classes for the container. */
    className?: string;
    /** If true, also slides in from the bottom slightly. */
    slideUp?: boolean;
}

/**
 * A reusable wrapper component that provides both fade-in (entrance) 
 * and fade-out (exit) animations.
 */
const FadeIn: React.FC<FadeInProps> = ({ 
    children, 
    show = true,
    duration = 500, 
    delay = 0, 
    className = "",
    slideUp = false
}) => {
    const shouldRender = useDelayUnmount(show, duration);

    // Rule 2: Early return for cleaner JSX
    if (!shouldRender) return null;

    /**
     * Determine animation classes based on state.
     * Note: slideUp effect already includes fade-in/out keyframes in our CSS.
     */
    const animationClass = show 
        ? (slideUp ? 'slide-in-from-bottom-2' : 'fade-in') 
        : (slideUp ? 'animate-out slide-out-to-bottom-2' : 'animate-out fade-out');

    return (
        <div 
            className={`animate-in fill-mode-both ${animationClass} ${className}`}
            style={{ 
                animationDuration: `${duration}ms`,
                animationDelay: `${show ? delay : 0}ms`
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
