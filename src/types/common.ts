/**
 * Represents a generic option for selection components (Select, Radio, etc.)
 * @template T The type of the value held by the option.
 */
export interface SelectOption<T = string | number> {
    /** Unique identifier for the option */
    id: string | number;
    /** Human-readable label displayed in the UI */
    label: string;
    /** The actual value associated with the option */
    value: T;
    /** Optional URL for an icon or avatar image */
    image?: string;
    /** Optional secondary text for additional context */
    subLabel?: string;
}
