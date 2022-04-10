export type PipeFn<T> = (val: T) => T;

export const applyEnrichersFns = <T>(...fns: PipeFn<T>[]) => (initial: T) => fns.reduce((v, f) => f(v), initial)
