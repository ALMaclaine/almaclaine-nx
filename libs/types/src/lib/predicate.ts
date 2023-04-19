type Predicate<T> = (val: T) => boolean;
type ArrayPredicate<T> = (val: T[]) => boolean;
export { Predicate, ArrayPredicate };
