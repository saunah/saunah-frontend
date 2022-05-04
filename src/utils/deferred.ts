/**
 * Utlitity to return a deferred promise, which can
 * be resolved from outside. Inteded for testing.
 * @returns promise, resolve and reject
 */
export function deferred<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void
    let reject!: (reason?: any) => void
    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    return {
        promise,
        resolve,
        reject,
    }
}
