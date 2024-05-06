type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : T[P];
};

type DeepRequireReadonly<T> = {
    readonly [P in keyof T]-?: T[P] extends Record<string, unknown> ? DeepRequireReadonly<T[P]> : T[P];
};

type UpperCaseKeys<T> = {
    [P in keyof T as Uppercase<string & P>]: T[P]
};

type ObjectToPropertyDescriptor<T> = {
    [P in keyof T]: PropertyDescriptor
};
