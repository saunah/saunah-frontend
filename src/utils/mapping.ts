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

/**
 * Maps in an unknown object as an array, applying a mapper function to every element.
 * If the object is known to be an array, use Array.map().
 * @param array the array to map in, should be unknown
 * @param mapper the mapper function to apply to each element
 * @throws if the given object is not an array or if the mapper throws for any element
 * @returns the mapped array
 */
export function mapInArray<Entity>(array: unknown, mapper: (responseItem: unknown) => Entity): Entity[] {
    if (!Array.isArray(array)) throw Error(`Could not map in object ${array}. It was not of expected type array.`)
    return array.map(mapper)
}
