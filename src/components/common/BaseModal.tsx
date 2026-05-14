import React from 'react';
import { X } from 'lucide-react';
import FadeIn from './FadeIn';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string; // e.g., 'max-w-md', 'max-w-lg', 'max-w-2xl'
    className?: string;
}

/**
 * A reusable base modal component that provides backdrop, animations, and close functionality.
 * Designed to be a "blank canvas" for any custom content.
 */
const BaseModal: React.FC<BaseModalProps> = ({
    isOpen,
    onClose,
    children,
    maxWidth = 'max-w-sm',
    className = ''
}) => {
    const shouldRender = useDelayUnmount(isOpen, 200);

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <FadeIn show={isOpen} duration={200}>
                <div
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    onClick={onClose}
                />
            </FadeIn>

            {/* Modal Content */}
            <FadeIn show={isOpen} duration={200} slideUp={true} className={`relative z-10 w-full ${maxWidth}`}>
                <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden relative ${className}`}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-20 text-slate-400 hover:text-slate-600 transition-colors bg-white/80 backdrop-blur-sm rounded-lg p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content Container */}
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};

export default BaseModal;
