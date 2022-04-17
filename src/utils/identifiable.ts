export type Identifiable = Readonly<{ id: string | number }>
export type MaybeIdentifiable = Readonly<{ id: string | number | null }>

function insertSingle<T extends Identifiable>(baseArray: T[], insertItem: T) {
    const index = baseArray.findIndex(item => item.id === insertItem.id)
    index === -1 ? baseArray.push(insertItem) : baseArray.splice(index, 1, insertItem)
}

/**
 * Inserts the items into the array, replacing all items with the same id.
 * @param array the array to insert the items into
 * @param insertItems the items to insert/replace.
 * @returns a new array with the new items inserted
 */
export function insert<T extends Identifiable>(array: T[], ...insertItems: T[]): T[] {
    const workingArray = [...array]
    insertItems.forEach(item => insertSingle(workingArray, item))
    return workingArray
}

/**
 * Removes all elements with the specified id from the array.
 * @param array the array to remove the items from
 * @param id the id which should be removed
 * @returns a new array with the elements removed
 */
export function removeId<T extends Identifiable>(array: T[], id: string): T[] {
    const workingArray = [...array]
    let noMatches = false
    while (!noMatches) {
        const index = workingArray.findIndex(item => item.id === id)
        if (index !== -1) workingArray.splice(index, 1)
        else noMatches = true
    }
    return workingArray
}

/**
 * Returns the first element in the array, which matches the specified id
 * @param array the array to find the element in
 * @param id the id to find
 * @returns the first element with a matching id or null if none is found
 */
export function findId<T extends Identifiable>(array: T[], id: string): T | null {
    const filtered = array.filter(item => item.id === id)
    if (filtered.length > 0) return filtered[0]
    else return null
}

/**
 * Checks if an array contains an element with the specified id
 * @param array the array to check
 * @param id the id to find
 * @returns `true` if the array contains an element with the specified id
 */
export function containsId<T extends Identifiable>(array: T[], id: string): boolean {
    return findId(array, id) != null
}
