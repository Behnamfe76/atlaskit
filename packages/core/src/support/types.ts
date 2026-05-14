export type Constructor<T = object> = abstract new (...args: never[]) => T;

export type PlainObject = Record<string, unknown>;
