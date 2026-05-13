import React from 'react';

/**
 * Props for the Input component.
 * Extends standard HTML input attributes.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Label text displayed above the input */
    label?: string;
    /** Whether to show a red asterisk indicating the field is required */
    required?: boolean;
    /** Error message to display below the input. If present, borders will turn red. */
    error?: string;
}

/**
 * A reusable, styled text input component with support for labels, 
 * validation states, and standard HTML input properties.
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   placeholder="Enter your email" 
 *   error={errors.email} 
 *   required 
 * />
 * ```
 */
const Input: React.FC<InputProps> = ({ label, required, error, className = "", ...props }) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-[#ec5b13]">*</span>}
                </label>
            )}
            <input
                className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
                } ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
