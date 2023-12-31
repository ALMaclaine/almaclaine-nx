declare class Augmentable {
    constructor(augment?: unknown);
    static of<T extends typeof Augmentable, U>(this: T, augment?: U): InstanceType<T> & U;
}
export { Augmentable };
