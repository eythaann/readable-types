export interface SerializableByFn {
  toJSON(): serializable;
}

export type SerializableBySelf<T = anyObject> = { [K in keyof T as T[K] extends anyFunction ? never : K]: serializable };
