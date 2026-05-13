import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

/**
 * Represents an option within the Select component.
 * @template T The type of the value held by the option.
 */
export interface SelectOption<T = string | number> {
    /** Unique identifier for the option */
    id: string | number;
    /** Human-readable label displayed in the list */
    label: string;
    /** The actual value that will be returned on change */
    value: T;
    /** Optional URL for an image/avatar */
    image?: string;
    /** Optional secondary text displayed below the label */
    subLabel?: string;
}

/**
 * Base properties shared by all Select modes.
 */
interface SelectPropsBase<T> {
    /** Label text displayed above the select button */
    label?: string;
    /** Array of options to choose from */
    options: SelectOption<T>[];
    /** Placeholder text when no value is selected */
    placeholder?: string;
    /** Whether to show a red asterisk for required fields */
    required?: boolean;
    /** If true, renders avatars next to selected values and in options */
    showAvatars?: boolean;
    /** Error message to display below the component */
    error?: string;
}

/**
 * Props for the Select component when 'multiple' is false or omitted.
 */
interface SingleSelectProps<T> extends SelectPropsBase<T> {
    /** Single selection mode */
    multiple?: false;
    /** The currently selected value */
    value: T | undefined | null;
    /** Callback triggered when a new option is selected */
    onChange: (value: T) => void;
}

/**
 * Props for the Select component when 'multiple' is true.
 */
interface MultipleSelectProps<T> extends SelectPropsBase<T> {
    /** Multi-selection mode */
    multiple: true;
    /** Array of currently selected values */
    value: T[];
    /** Callback triggered when the selection changes */
    onChange: (value: T[]) => void;
}

/**
 * Combined type for Select props using Discriminated Unions to ensure 
 * type safety between single and multiple selection modes.
 */
type SelectProps<T> = SingleSelectProps<T> | MultipleSelectProps<T>;

/**
 * Internal component to highlight matching text during search.
 */
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <span>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <mark key={i} className="bg-[#ec5b13]/20 text-[#ec5b13] px-0.5 rounded-sm font-bold border-b border-[#ec5b13]/30">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

/**
 * A highly accessible, searchable, and customizable select component.
 * Supports single and multiple selection, keyboard navigation, focus trap,
 * and avatar displays.
 * 
 * @template T The type of the value (e.g., string, number, or custom union)
 * 
 * @example
 * ```tsx
 * // Single select
 * <Select<string>
 *   label="Project"
 *   options={[{ id: 1, label: 'Web', value: 'web' }]}
 *   value={currentProject}
 *   onChange={setProject}
 * />
 * 
 * // Multi select with avatars
 * <Select<string>
 *   label="Assignees"
 *   multiple
 *   showAvatars
 *   options={userOptions}
 *   value={selectedUserIds}
 *   onChange={setSelectedUserIds}
 * />
 * ```
 */
function Select<T = string | number>(props: SelectProps<T>) {
    const {
        label,
        options,
        value,
        onChange,
        multiple = false,
        placeholder = "Select option",
        required = false,
        showAvatars = false,
        error
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter(opt =>
            opt.label.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            (opt.subLabel && opt.subLabel.toLowerCase().includes(debouncedQuery.toLowerCase()))
        );
    }, [options, debouncedQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 200);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Handle side effects of opening/closing (Focus management)
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 0);
        }
    }, [isOpen]);

    const handleToggle = () => {
        const nextIsOpen = !isOpen;
        setIsOpen(nextIsOpen);
        
        if (nextIsOpen) {
            setFocusedIndex(0);
            setSearchQuery('');
        } else {
            setFocusedIndex(-1);
        }
    };

    const handleSelect = (optionValue: T) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValue = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            (onChange as (val: T[]) => void)(newValue);
        } else {
            (onChange as (val: T) => void)(optionValue);
            setIsOpen(false);
            setFocusedIndex(-1);
        }
    };

    const isSelected = (optionValue: T) => {
        if (multiple) {
            return Array.isArray(value) && value.includes(optionValue);
        }
        return value === optionValue;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
                    handleSelect(filteredOptions[focusedIndex].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                containerRef.current?.querySelector('button')?.focus();
                break;
            case 'Tab':
                // Focus trap logic
                if (e.shiftKey) {
                    if (document.activeElement === searchInputRef.current) {
                        e.preventDefault();
                        const lastOption = listboxRef.current?.lastElementChild as HTMLElement;
                        lastOption?.focus();
                    }
                } else {
                    const lastOption = listboxRef.current?.lastElementChild;
                    if (document.activeElement === lastOption) {
                        e.preventDefault();
                        searchInputRef.current?.focus();
                    }
                }
                break;
        }
    };

    // Auto-scroll focused option into view
    useEffect(() => {
        if (focusedIndex >= 0 && listboxRef.current) {
            const focusedElement = listboxRef.current.children[focusedIndex] as HTMLElement;
            if (focusedElement) {
                focusedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusedIndex]);

    const selectedValues = useMemo((): T[] => {
        if (multiple) return Array.isArray(value) ? value : [];
        return value !== undefined && value !== null ? [value as T] : [];
    }, [value, multiple]);

    const renderSelection = () => {
        if (selectedValues.length === 0) return <span className="text-gray-400 text-sm">{placeholder}</span>;

        if (multiple && showAvatars) {
            return (
                <div className="flex items-center -space-x-2 mr-2">
                    {selectedValues.slice(0, 3).map((val, idx) => {
                        const opt = options.find(o => o.value === val);
                        return opt?.image ? (
                            <img key={opt.id} src={opt.image} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                        ) : (
                            <div key={idx} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {opt?.label.charAt(0)}
                            </div>
                        );
                    })}
                    {selectedValues.length > 3 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                            +{selectedValues.length - 3}
                        </div>
                    )}
                </div>
            );
        }

        if (multiple) {
            return <span className="text-sm text-gray-900 truncate">{selectedValues.length} selected</span>;
        }

        const option = options.find(opt => opt.value === value);
        return (
            <div className="flex items-center gap-2 overflow-hidden">
                {option?.image && (
                    <img src={option.image} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                )}
                <span className="truncate text-sm text-gray-900 font-medium">{option?.label}</span>
            </div>
        );
    };

    return (
        <div
            className="space-y-1.5 w-full"
            ref={containerRef}
            onKeyDown={handleKeyDown}
        >
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-[#ec5b13]">*</span>}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-required={required}
                    className={`w-full flex items-center justify-between rounded-xl border bg-gray-50/50 px-4 py-3 text-left transition-all outline-none hover:bg-gray-100/50 min-h-[50px] ${error
                            ? 'border-red-500 ring-4 ring-red-500/10'
                            : isOpen
                                ? 'border-[#ec5b13] ring-4 ring-[#ec5b13]/10'
                                : 'border-gray-200'
                        }`}
                >
                    <div className="flex items-center overflow-hidden">
                        {renderSelection()}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ec5b13]' : ''}`} />
                </button>

                {error && <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>}

                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in duration-100 flex flex-col">
                        <div className="p-2 border-bottom border-gray-50 bg-gray-50/30">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setFocusedIndex(0);
                                    }}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#ec5b13] focus:ring-2 focus:ring-[#ec5b13]/10 transition-all"
                                    aria-label="Search options"
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1 overflow-auto p-1 space-y-0.5"
                            role="listbox"
                            aria-multiselectable={multiple}
                            ref={listboxRef}
                        >
                            {filteredOptions.length === 0 ? (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm italic">No results found</div>
                            ) : (
                                filteredOptions.map((option, index) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected(option.value)}
                                        onClick={() => handleSelect(option.value)}
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors outline-none ${isSelected(option.value)
                                            ? 'bg-[#ec5b13]/5 text-[#ec5b13]'
                                            : index === focusedIndex
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {option.image && (
                                                <img src={option.image} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100 shadow-sm" />
                                            )}
                                            <div className="flex flex-col text-left overflow-hidden">
                                                <span className={`truncate ${isSelected(option.value) ? 'font-bold' : 'font-medium'}`}>
                                                    <HighlightText text={option.label} highlight={debouncedQuery} />
                                                </span>
                                                {option.subLabel && (
                                                    <span className="text-[10px] text-gray-500 truncate">
                                                        <HighlightText text={option.subLabel} highlight={debouncedQuery} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {isSelected(option.value) && (
                                            <div className="w-4 h-4 rounded-full bg-[#ec5b13] flex items-center justify-center">
                                                <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
