/**
 * Returns whether an object can be frozen.
 */
function isFreezable(value: any): boolean {
    return value !== undefined && value !== null && (typeof value === 'object' || typeof value === 'function');
}

/**
 * Deeply freezes an object and its properties recursively.
 * @param value The value to freeze
 */
export function deepFreeze<T extends { [key: string]: any }>(value: T): T {
    if (!isFreezable(value)) {
        return value;
    }

    Object.freeze(value);

    Object.getOwnPropertyNames(value).forEach((property) => {
        deepFreeze(value[property]);
    });

    return value;
}
