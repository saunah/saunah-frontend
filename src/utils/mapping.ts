/**
 * Returns null as type number.
 * This can be used to create an empty object which contains a number.
 * @returns null
 */
export function emptyNumber(): number {
    return null as unknown as number
}

/**
 * Returns null as type boolean.
 * This can be used to create an empty object which contains a boolean.
 * @returns null
 */
export function emptyBoolean(): boolean {
    return null as unknown as boolean
}

/**
 * Returns null as type string.
 * This can be used to create an empty object which contains a string.
 * @returns null
 */
export function emptyString(): string {
    return null as unknown as string
}

/**
 * Maps in an optional value. This is a convenience function for
 * optional ? mapper(optional) : null.
 * @param optional The optional value to map in
 * @param mapper The mapper which maps the optional value, if present
 * @returns The mapped value or null
 */
export function mapInOptional<Response, Entity>(
    optional: Response | null | undefined,
    mapper: (responseItem: Response) => Entity
): Entity | null {
    return optional != null ? mapper(optional) : null
}
