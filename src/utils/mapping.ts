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
    if (!Array.isArray(array)) throw new Error(`Could not map in object ${array}. It was not of expected type array.`)
    return array.map(mapper)
}
