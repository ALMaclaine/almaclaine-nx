import type { Node } from '@almaclaine/double-linked-list';
import { DoubleLinkedList } from '@almaclaine/double-linked-list';

type PriorityQueueComparator<T> = (a: T, b: T) => number;

type PriorityQueueProps<T> = {
  comparator: PriorityQueueComparator<T>;
};

class PriorityQueue<T> {
  private readonly _comparator: PriorityQueueComparator<T>;
  private readonly dll: DoubleLinkedList<T> = new DoubleLinkedList<T>();
  constructor({ comparator }: PriorityQueueProps<T>) {
    this._comparator = comparator;
  }

  getComparator(): PriorityQueueComparator<T> {
    return this._comparator;
  }

  compare(val1: T, val2: T): number {
    return this._comparator(val1, val2);
  }

  add(value: T): Node<T> {
    const head = this.dll.peekHead();
    const tail = this.dll.peekTail();
    if (!(head || tail)) {
      return this.dll.addFront(value);
    } else if (head && this.compare(value, head.value) <= 0) {
      return this.dll.addFront(value);
    } else if (tail && this.compare(value, tail.value) >= 0) {
      return this.dll.addBack(value);
    } else {
      for (const node of this.dll.nodeIterator()) {
        if (this.compare(value, node.value) <= 0) {
          return this.dll.addBeforeNode(value, node);
        }
      }
    }

    throw new Error('Should not occur');
  }

  addMany(value: T[]): Node<T>[] {
    return value.map((val) => this.add(val));
  }

  clear(): void {
    this.dll.clear();
  }

  peekLast(): Node<T> | undefined {
    return this.dll.peekTail();
  }

  peekLastValue(): T | undefined {
    return this.dll.peekTailValue();
  }

  peekFirst(): Node<T> | undefined {
    return this.dll.peekHead();
  }

  peekFirstValue(): T | undefined {
    return this.dll.peekHeadValue();
  }

  removeFirstValue(): T | undefined {
    return this.dll.removeHead()?.value;
  }

  removeLastValue(): T | undefined {
    return this.dll.removeTail()?.value;
  }

  removeNode(node?: Node<T>): Node<T> | undefined {
    return this.dll.removeNode(node);
  }

  get length(): number {
    return this.dll.length;
  }

  map<U>(proc: (value: T) => U): U[] {
    return this.dll.map(proc);
  }

  forEach(proc: (value: T) => void): void {
    this.dll.forEach(proc);
  }

  toArray(): T[] {
    return this.dll.toArray();
  }

  valueIterator(): IterableIterator<T> {
    return this.dll.valueIterator();
  }

  nodeIterator(): IterableIterator<Node<T>> {
    return this.dll.nodeIterator();
  }

  valueIteratorReverse(): IterableIterator<T> {
    return this.dll.valueIteratorReverse();
  }

  nodeIteratorReverse(): IterableIterator<Node<T>> {
    return this.dll.nodeIteratorReverse();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.valueIterator();
  }
}

export { PriorityQueue };
export type { PriorityQueueProps, PriorityQueueComparator, Node };
