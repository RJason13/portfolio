import { parseBooleanStr } from './converter';

type ValueParser = (str: string) => any;

const parseValue = <T>(key: string, parser: ValueParser, defaultValue?: T): T | null => {
    const cleanedDefaultValue = typeof defaultValue !== 'undefined' ? defaultValue : null;

    const storedValue = getLocalItem(key);
    if (storedValue === null) return cleanedDefaultValue;

    const parsedValue = parser(storedValue);
    return parsedValue !== null ? parsedValue : cleanedDefaultValue;
};

export const getLocalItem = (key: string): string | null => {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
};

export const setLocalItem = (key: string, value: string | null) => {
    if (value === null) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, value);
    }
};

export const getLocalJsonItem = <T>(key: string, defaultValue?: T) => {
    return parseValue(key, JSON.parse, defaultValue);
};

export function getLocalBooleanItem(key: string, defaultValue: boolean): boolean;
export function getLocalBooleanItem(key: string, defaultValue?: boolean): boolean | null;
export function getLocalBooleanItem(key: string, defaultValue?: any): any {
    return parseValue(key, parseBooleanStr, defaultValue);
}

export const setLocalBooleanItem = (key: string, value: boolean | null) => {
    setLocalItem(key, value !== null ? value.toString() : value);
};
