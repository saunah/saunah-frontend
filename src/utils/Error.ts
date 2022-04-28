/**
 * A custom error class if a property is missing on an object
 * when trying to map to another object.
 */
export class MissingPropertyError extends Error {
    constructor(sourceObject: string, targetObject: string, missingProperty: string) {
        super(`Property '${missingProperty}' was nullish on ${sourceObject} but has to be defined on ${targetObject}.`)
    }
}
