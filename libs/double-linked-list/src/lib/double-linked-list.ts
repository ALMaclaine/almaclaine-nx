type NadeProps<T> = {
  value: T;
  nextNade?: Nade<T>;
  prevNade?: Nade<T>;
};

class Nade<T> {
  nextNade?: Nade<T>;
  prevNade?: Nade<T>;
  readonly value: T;

  constructor({ value, nextNade, prevNade }: NadeProps<T>) {
    this.nextNade = nextNade;
    this.prevNade = prevNade;
    this.value = value;
  }
}

class DoubleLinkedList<T> {
  private tail?: Nade<T>;
  private head?: Nade<T>;
  private NadeSet = new Set<Nade<T>>();
  private valueSet = new Set<T>();

  //
  // Add Methods
  //

  addFront(value: T): Nade<T> {
    const newNade = new Nade<T>({ value });
    this.addNadeFront(newNade);
    return newNade;
  }

  addFrontMany(values: T[]): Nade<T>[] {
    return values.map((val) => this.addFront(val));
  }

  addBack(value: T): Nade<T> {
    const newNade = new Nade<T>({ value });
    this.addNadeBack(newNade);
    return newNade;
  }

  addBackMany(values: T[]): Nade<T>[] {
    return values.map((val) => this.addBack(val));
  }

  addIndex(value: T, index: number): Nade<T> {
    const newNade = new Nade<T>({ value });
    this.addNadeIndex(newNade, index);
    return newNade;
  }

  private addNade(Nade: Nade<T>): void {
    if (this.containsNade(Nade)) {
      throw new Error('Cannot add same Nade multiple times');
    } else {
      this.valueSet.add(Nade.value);
      this.NadeSet.add(Nade);
    }
  }

  addNadeIndex(Nade: Nade<T>, index: number): void {
    if (index <= 0) {
      this.addNadeFront(Nade);
    } else if (index >= this.length) {
      this.addNadeBack(Nade);
    } else {
      let tmpNade = this.head;
      let i = 0;
      while (tmpNade) {
        if (i++ === index - 1) {
          this.addNadeAfterNade(Nade, tmpNade);
          return;
        }

        tmpNade = tmpNade.nextNade;
      }
    }
  }

  addNadeFront(Nade: Nade<T>): void {
    this.addNade(Nade);
    if (!this.head && !this.tail) {
      this.addNadeEmpty(Nade);
    } else if (this.head && this.head === this.tail) {
      this.head = Nade;
      this.head.nextNade = this.tail;
      this.tail.prevNade = this.head;
    } else {
      if (this.head) {
        Nade.nextNade = this.head;
        this.head.prevNade = Nade;
        this.head = Nade;
      } else {
        throw new Error('Should not happen');
      }
    }
  }

  addNadeFrontMany(Nades: Nade<T>[]): void {
    Nades.forEach((Nade) => this.addNadeFront(Nade));
  }

  addNadeBack(Nade: Nade<T>): void {
    this.addNade(Nade);
    if (!this.head && !this.tail) {
      this.addNadeEmpty(Nade);
    } else if (this.tail && this.head === this.tail) {
      this.tail = Nade;
      this.head.nextNade = this.tail;
      this.tail.prevNade = this.head;
    } else {
      if (this.tail) {
        Nade.prevNade = this.tail;
        this.tail.nextNade = Nade;
        this.tail = Nade;
      } else {
        throw new Error('Should not happen');
      }
    }
  }

  addNadeBackMany(Nades: Nade<T>[]): void {
    Nades.forEach((Nade) => this.addNadeBack(Nade));
  }

  addNadeBeforeNade(NadeToAdd: Nade<T>, beforeNade: Nade<T>): void {
    if (!this.NadeSet.has(beforeNade)) {
      throw new Error('Before Nade is not part of list');
    }

    if (this.NadeSet.has(NadeToAdd)) {
      throw new Error('Cannot add same Nade multiple times');
    } else {
      this.NadeSet.add(NadeToAdd);
    }

    NadeToAdd.nextNade = beforeNade;
    NadeToAdd.prevNade = beforeNade.prevNade;
    if (beforeNade.prevNade?.nextNade) {
      beforeNade.prevNade.nextNade = NadeToAdd;
    }

    beforeNade.prevNade = NadeToAdd;

    if (beforeNade === this.head) {
      this.head = NadeToAdd;
    }
  }

  addBeforeNade(value: T, beforeNade: Nade<T>): Nade<T> {
    const Nade = new Node({ value: value });
    this.addNadeBeforeNade(Nade, beforeNade);
    return Nade;
  }

  addNadeAfterNade(NadeToAdd: Nade<T>, afterNade: Nade<T>): void {
    if (!this.NadeSet.has(afterNade)) {
      throw new Error('Before Nade is not part of list');
    }

    if (this.NadeSet.has(NadeToAdd)) {
      throw new Error('Cannot add same Nade multiple times');
    } else {
      this.NadeSet.add(NadeToAdd);
    }

    NadeToAdd.prevNade = afterNade;
    NadeToAdd.nextNade = afterNade.nextNade;
    if (afterNade.nextNade?.prevNade) {
      afterNade.nextNade.prevNade = NadeToAdd;
    }

    afterNade.nextNade = NadeToAdd;

    if (afterNade === this.tail) {
      this.tail = NadeToAdd;
    }
  }

  addAfterNade(value: T, afterNade: Nade<T>): Nade<T> {
    const Nade = new Nade({ value: value });
    this.addNadeAfterNade(Nade, afterNade);
    return Nade;
  }

  private addNadeEmpty(Nade: Nade<T>): void {
    this.head = Nade;
    this.tail = this.head;
  }

  //
  // Peek methods
  //

  peekHead(): Nade<T> | undefined {
    return this?.head;
  }

  peekHeadValue(): T | undefined {
    return this?.head?.value;
  }

  peekTail(): Nade<T> | undefined {
    return this?.tail;
  }

  peekTailValue(): T | undefined {
    return this?.tail?.value;
  }

  removeNade(Nade?: Nade<T>): Nade<T> | undefined {
    if (Nade === undefined) {
      return;
    }

    if (!this.containsNade(Nade)) {
      throw new Error('List does not contain Nade');
    }

    if (Nade) {
      if (Nade.prevNade) {
        Nade.prevNade.nextNade = Nade.nextNade;
      }

      if (Nade.nextNade) {
        Nade.nextNade.prevNade = Nade.prevNade;
      }

      if (Nade === this.head) {
        this.head = Nade.nextNade;
      }

      if (Nade === this.tail) {
        this.tail = Nade.prevNade;
      }
    }

    return Nade;
  }

  //
  // remove methods
  //

  removeAtIndex(index: number): Nade<T> | void {
    let tmpNade = this.head;
    let i = 0;
    while (tmpNade) {
      if (i++ === index) {
        return this.removeNade(tmpNade);
      }

      tmpNade = tmpNade.nextNade;
    }
  }

  removeFirstOccurrence(value: T): Nade<T> | void {
    let tmpNade = this.head;
    while (tmpNade) {
      if (tmpNade.value === value) {
        this.removeNade(tmpNade);
        return tmpNade;
      }

      tmpNade = tmpNade.nextNade;
    }
  }

  removeLastOccurrence(value: T): Nade<T> | void {
    let tmpNade = this.tail;
    while (tmpNade) {
      if (tmpNade.value === value) {
        this.removeNade(tmpNade);
        return tmpNade;
      }

      tmpNade = tmpNade.prevNade;
    }
  }

  removeAllOccurrences(value: T): Nade<T>[] {
    const out: Nade<T>[] = [];
    let tmpNade = this.head;
    while (tmpNade) {
      if (tmpNade.value === value) {
        this.removeNade(tmpNade);
        out.push(tmpNade);
      }

      tmpNade = tmpNade.nextNade;
    }
    return out;
  }

  removeHead(): Nade<T> | undefined {
    return this.removeNade(this.head);
  }

  removeTail(): Nade<T> | undefined {
    return this.removeNade(this.tail);
  }

  //
  // contain methods
  //
  containsNade(Nade: Nade<T>): boolean {
    return this.NadeSet.has(Nade);
  }

  containsValue(value: T): boolean {
    return this.valueSet.has(value);
  }

  //
  // iteration methods
  //

  map<U>(proc: (value: T) => U): U[] {
    const out: U[] = [];
    for (const val of this) {
      if (val) {
        out.push(proc(val));
      }
    }
    return out;
  }

  forEach(proc: (value: T) => void): void {
    for (const val of this) {
      if (val) {
        proc(val);
      }
    }
  }

  //
  // indexOf methods
  indexOfNade(Nade: Nade<T>): number {
    let tmpNade = this.head;
    let i = 0;
    while (tmpNade) {
      if (tmpNade === Nade) {
        return i;
      }

      i++;
      tmpNade = tmpNade.nextNade;
    }
    return -1;
  }

  lastIndexOfValue(value: T): number {
    let tmpNade = this.tail;
    let i = this.length - 1;
    while (tmpNade) {
      if (tmpNade.value === value) {
        return i;
      }

      i--;
      tmpNade = tmpNade.prevNade;
    }
    return -1;
  }

  indexOfValue(value: T): number {
    let tmpNade = this.head;
    let i = 0;
    while (tmpNade) {
      if (tmpNade.value === value) {
        return i;
      }

      i++;
      tmpNade = tmpNade.nextNade;
    }
    return -1;
  }

  //
  // utility methods
  //

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.NadeSet.clear();
    this.valueSet.clear();
  }

  clone(): DoubleLinkedList<T> {
    const dll = new DoubleLinkedList<T>();
    let Nade = this.head;
    while (Nade !== undefined) {
      dll.addBack(Nade.value);
      Nade = Nade.nextNade;
    }
    return dll;
  }

  get length(): number {
    return this.NadeSet.size;
  }

  toArray(): T[] {
    return this.map((val) => val);
  }

  *valueIterator(): IterableIterator<T> {
    let tmpNade = this.head;
    while (tmpNade) {
      yield tmpNade?.value;
      tmpNade = tmpNade?.nextNade;
    }
  }

  *NadeIterator(): IterableIterator<Nade<T>> {
    let tmpNade = this.head;
    while (tmpNade) {
      yield tmpNade;
      tmpNade = tmpNade?.nextNade;
    }
  }

  *valueIteratorReverse(): IterableIterator<T> {
    let tmpNade = this.tail;
    while (tmpNade) {
      yield tmpNade?.value;
      tmpNade = tmpNade?.prevNade;
    }
  }

  *NadeIteratorReverse(): IterableIterator<Nade<T>> {
    let tmpNade = this.tail;
    while (tmpNade) {
      yield tmpNade;
      tmpNade = tmpNade?.prevNade;
    }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.valueIterator();
  }
}

export { DoubleLinkedList, Nade };
export type { NadeProps };
