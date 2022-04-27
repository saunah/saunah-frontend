declare type Primitive = string | number | boolean | bigint | symbol | undefined | null
declare type Builtin = Primitive | Function | Date | Error | RegExp

export declare type DeepReadonly<T> = T extends Builtin
    ? T
    : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends ReadonlyMap<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends WeakMap<infer K, infer V>
    ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends Set<infer U>
    ? ReadonlySet<DeepReadonly<U>>
    : T extends ReadonlySet<infer U>
    ? ReadonlySet<DeepReadonly<U>>
    : T extends WeakSet<infer U>
    ? WeakSet<DeepReadonly<U>>
    : T extends Promise<infer U>
    ? Promise<DeepReadonly<U>>
    : T extends {}
    ? {
          readonly [K in keyof T]: DeepReadonly<T[K]>
      }
    : Readonly<T>

export function readonly<T>(object: T): DeepReadonly<T> {
    return object as DeepReadonly<T>
}

/**
 * This type can be used if a type should be editable by text-fields.
 * This makes all number properties on the object optional,
 * so it can be properly initialized with null (instead of 0).
 */
export type Editable<T> = T extends {}
    ? {
          readonly [K in keyof T]: T[K] extends number ? number | null : T[K]
      }
    : T
