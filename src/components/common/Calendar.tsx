import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Props for the Calendar component.
 */
export interface CalendarProps {
    /** The currently selected Date object */
    selectedDate: Date | null;
    /** Callback function triggered when a date is selected */
    onChange: (date: Date | null) => void;
    /** Label text displayed above the date picker input */
    label?: string;
    /** Placeholder text shown when no date is selected */
    placeholder?: string;
}

/**
 * Props for the internal CustomDateInput button.
 */
interface CustomInputProps {
    /** Formatted date string to display */
    value?: string;
    /** Function to open the date picker popper */
    onClick?: () => void;
    /** Placeholder text */
    placeholder?: string;
    /** Current visibility state of the popper for styling purposes */
    isOpen?: boolean;
}

/**
 * A custom, styled button that acts as the trigger for the React-DatePicker.
 * Fully accessible with ARIA attributes and keyboard support.
 */
const CustomDateInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, placeholder, isOpen }, ref) => (
        <button
            type="button"
            className={`w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-left transition-all outline-none hover:bg-gray-100/50 min-h-[50px] ${isOpen ? 'border-blue-600 ring-4 ring-blue-600/10' : ''
                }`}
            onClick={onClick}
            ref={ref}
            aria-label={`Select date${value ? `, currently selected: ${value}` : ''}`}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
        >
            <span className={value ? 'text-sm text-gray-900 font-medium' : 'text-sm text-gray-400'}>
                {value || placeholder}
            </span>
            <div className="pl-3 border-l border-gray-100 ml-auto">
                <CalendarIcon className={`w-5 h-5 text-gray-400 transition-colors ${isOpen ? 'text-blue-600' : ''}`} />
            </div>
        </button>
    )
);

/**
 * A reusable Date Picker component based on react-datepicker.
 * Standardizes date selection UI and accessibility across the application.
 * 
 * @example
 * ```tsx
 * <Calendar 
 *   label="Due Date" 
 *   selectedDate={dueDate} 
 *   onChange={setDueDate} 
 * />
 * ```
 */
const Calendar: React.FC<CalendarProps> = ({ selectedDate, onChange, label = "Due Date", placeholder = "Select date" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative z-20 w-full" onKeyDown={handleKeyDown}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                    onChange(date);
                    setIsOpen(false);
                }}
                onCalendarOpen={() => setIsOpen(true)}
                onCalendarClose={() => setIsOpen(false)}
                customInput={<CustomDateInput placeholder={placeholder} isOpen={isOpen} />}
                dateFormat="dd/MM/yyyy"
                wrapperClassName="w-full"
                showPopperArrow={false}
                popperPlacement="bottom-start"
                portalId="root"
                popperProps={{
                    strategy: 'fixed'
                }}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="flex items-center justify-between px-2 py-2">
                        <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-gray-900 text-base">
                            {format(date, 'MMMM yyyy')}
                        </span>
                        <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
                calendarClassName="!border-gray-200 !rounded-xl !shadow-xl !p-2 !font-sans !bg-white"
                dayClassName={() =>
                    "!rounded-full !w-9 !h-9 !inline-flex !items-center !justify-center !m-0.5 !transition-colors !cursor-pointer"
                }
            />
        </div>
    );
};

export default Calendar;