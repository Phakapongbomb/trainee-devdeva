import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, required, error, className = "", ...props }) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-[#ec5b13]">*</span>}
                </label>
            )}
            <input
                className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''} ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
