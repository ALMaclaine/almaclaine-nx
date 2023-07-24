class Augmentable {
  constructor(augment: unknown = {}) {
    Object.assign(this, augment);
  }
  static of<T extends typeof Augmentable, U>(this: T, augment?: U) {
    return new this(augment) as InstanceType<T> & U;
  }
}

export { Augmentable };
