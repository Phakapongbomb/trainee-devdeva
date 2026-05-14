import React from 'react';
import { Search } from 'lucide-react';

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
    /** Whether to show a search icon inside the input on the left */
    showSearchIcon?: boolean;
}

/**
 * A reusable, styled text input component with support for labels, 
 * validation states, icons, and standard HTML input properties.
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Search" 
 *   showSearchIcon 
 *   placeholder="Search..." 
 * />
 * ```
 */
const Input: React.FC<InputProps> = ({
    label,
    required,
    error,
    showSearchIcon = false,
    className = "",
    ...props
}) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-blue-600">*</span>}
                </label>
            )}
            <div className="relative">
                {showSearchIcon && (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                )}
                <input
                    className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none transition-all outline-none min-h-[50px] ${showSearchIcon ? 'pl-10' : 'px-4'
                        } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
                        } ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
