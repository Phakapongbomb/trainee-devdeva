import { format, parse, isValid, parseISO } from 'date-fns';

/**
 * Safely parses a date string or Date object into a Date object.
 * Handles:
 * 1. Date objects
 * 2. ISO strings
 * 3. 'dd/MM/yyyy' strings
 * 4. Flexible date strings (e.g., 'Oct 20')
 */
export const parseSafeDate = (date: string | Date | null | undefined): Date | null => {
    if (!date) return null;
    
    // 1. If it's already a Date object, just check if it's valid
    if (date instanceof Date) {
        return isValid(date) ? date : null;
    }

    // 2. Try ISO format (e.g., 2024-05-13T00:00:00Z)
    const isoDate = parseISO(date);
    if (isValid(isoDate)) return isoDate;

    // 3. Try 'dd/MM/yyyy' format (our standard)
    const ddmmyyyyDate = parse(date, 'dd/MM/yyyy', new Date());
    if (isValid(ddmmyyyyDate)) return ddmmyyyyDate;

    // 4. Fallback for other formats (like 'Oct 20, 2024')
    const nativeDate = new Date(date);
    if (isValid(nativeDate)) return nativeDate;

    return null;
};

/**
 * Formats a date to "dd/MM/yyyy"
 * Returns an empty string or placeholder if date is invalid
 */
export const formatDateDisplay = (date: Date | string | null | undefined): string => {
    if (!date) return '';
    
    const parsedDate = typeof date === 'string' ? parseSafeDate(date) : date;
    
    if (!parsedDate || !isValid(parsedDate)) {
        return '';
    }
    
    return format(parsedDate, 'dd/MM/yyyy');
};
