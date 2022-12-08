export type ValueOf<T> = T[keyof T]

export type PromiseResult<T extends Promise<unknown>> = T extends Promise<infer R> ? R : never

export type PromiseFnResult<T extends () => Promise<unknown>> = PromiseResult<ReturnType<T>>
