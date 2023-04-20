type NodeProps<T> = {
  value: T;
  nextNode?: Node<T>;
  prevNode?: Node<T>;
};

class Node<T> {
  nextNode?: Node<T>;
  prevNode?: Node<T>;
  readonly value: T;

  constructor({ value, nextNode, prevNode }: NodeProps<T>) {
    this.nextNode = nextNode;
    this.prevNode = prevNode;
    this.value = value;
  }
}

class DoubleLinkedList<T> {
  private tail?: Node<T>;
  private head?: Node<T>;
  private nodeSet = new Set<Node<T>>();
  private valueSet = new Set<T>();

  //
  // Add Methods
  //

  addFront(value: T): Node<T> {
    const newNode = new Node<T>({ value });
    this.addNodeFront(newNode);
    return newNode;
  }

  addFrontMany(values: T[]): Node<T>[] {
    return values.map((val) => this.addFront(val));
  }

  addBack(value: T): Node<T> {
    const newNode = new Node<T>({ value });
    this.addNodeBack(newNode);
    return newNode;
  }

  addBackMany(values: T[]): Node<T>[] {
    return values.map((val) => this.addBack(val));
  }

  addIndex(value: T, index: number): Node<T> {
    const newNode = new Node<T>({ value });
    this.addNodeIndex(newNode, index);
    return newNode;
  }

  private addNode(node: Node<T>): void {
    if (this.containsNode(node)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.valueSet.add(node.value);
      this.nodeSet.add(node);
    }
  }

  addNodeIndex(node: Node<T>, index: number): void {
    if (index <= 0) {
      this.addNodeFront(node);
    } else if (index >= this.length) {
      this.addNodeBack(node);
    } else {
      let tmpNode = this.head;
      let i = 0;
      while (tmpNode) {
        if (i++ === index - 1) {
          this.addNodeAfterNode(node, tmpNode);
          return;
        }

        tmpNode = tmpNode.nextNode;
      }
    }
  }

  addNodeFront(node: Node<T>): void {
    this.addNode(node);
    if (!this.head && !this.tail) {
      this.addNodeEmpty(node);
    } else if (this.head && this.head === this.tail) {
      this.head = node;
      this.head.nextNode = this.tail;
      this.tail.prevNode = this.head;
    } else {
      if (this.head) {
        node.nextNode = this.head;
        this.head.prevNode = node;
        this.head = node;
      } else {
        throw new Error('Should not happen');
      }
    }
  }

  addNodeFrontMany(nodes: Node<T>[]): void {
    nodes.forEach((node) => this.addNodeFront(node));
  }

  addNodeBack(node: Node<T>): void {
    this.addNode(node);
    if (!this.head && !this.tail) {
      this.addNodeEmpty(node);
    } else if (this.tail && this.head === this.tail) {
      this.tail = node;
      this.head.nextNode = this.tail;
      this.tail.prevNode = this.head;
    } else {
      if (this.tail) {
        node.prevNode = this.tail;
        this.tail.nextNode = node;
        this.tail = node;
      } else {
        throw new Error('Should not happen');
      }
    }
  }

  addNodeBackMany(nodes: Node<T>[]): void {
    nodes.forEach((node) => this.addNodeBack(node));
  }

  addNodeBeforeNode(nodeToAdd: Node<T>, beforeNode: Node<T>): void {
    if (!this.nodeSet.has(beforeNode)) {
      throw new Error('Before node is not part of list');
    }

    if (this.nodeSet.has(nodeToAdd)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.nodeSet.add(nodeToAdd);
    }

    nodeToAdd.nextNode = beforeNode;
    nodeToAdd.prevNode = beforeNode.prevNode;
    if (beforeNode.prevNode?.nextNode) {
      beforeNode.prevNode.nextNode = nodeToAdd;
    }

    beforeNode.prevNode = nodeToAdd;

    if (beforeNode === this.head) {
      this.head = nodeToAdd;
    }
  }

  addBeforeNode(value: T, beforeNode: Node<T>): Node<T> {
    const node = new Node({ value: value });
    this.addNodeBeforeNode(node, beforeNode);
    return node;
  }

  addNodeAfterNode(nodeToAdd: Node<T>, afterNode: Node<T>): void {
    if (!this.nodeSet.has(afterNode)) {
      throw new Error('Before node is not part of list');
    }

    if (this.nodeSet.has(nodeToAdd)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.nodeSet.add(nodeToAdd);
    }

    nodeToAdd.prevNode = afterNode;
    nodeToAdd.nextNode = afterNode.nextNode;
    if (afterNode.nextNode?.prevNode) {
      afterNode.nextNode.prevNode = nodeToAdd;
    }

    afterNode.nextNode = nodeToAdd;

    if (afterNode === this.tail) {
      this.tail = nodeToAdd;
    }
  }

  addAfterNode(value: T, afterNode: Node<T>): Node<T> {
    const node = new Node({ value: value });
    this.addNodeAfterNode(node, afterNode);
    return node;
  }

  private addNodeEmpty(node: Node<T>): void {
    this.head = node;
    this.tail = this.head;
  }

  //
  // Peek methods
  //

  peekHead(): Node<T> | undefined {
    return this?.head;
  }

  peekHeadValue(): T | undefined {
    return this?.head?.value;
  }

  peekTail(): Node<T> | undefined {
    return this?.tail;
  }

  peekTailValue(): T | undefined {
    return this?.tail?.value;
  }

  removeNode(node?: Node<T>): Node<T> | undefined {
    if (node === undefined) {
      return;
    }

    if (!this.containsNode(node)) {
      throw new Error('List does not contain node');
    }

    if (node) {
      if (node.prevNode) {
        node.prevNode.nextNode = node.nextNode;
      }

      if (node.nextNode) {
        node.nextNode.prevNode = node.prevNode;
      }

      if (node === this.head) {
        this.head = node.nextNode;
      }

      if (node === this.tail) {
        this.tail = node.prevNode;
      }
    }

    return node;
  }

  //
  // remove methods
  //

  removeAtIndex(index: number): Node<T> | void {
    let tmpNode = this.head;
    let i = 0;
    while (tmpNode) {
      if (i++ === index) {
        return this.removeNode(tmpNode);
      }

      tmpNode = tmpNode.nextNode;
    }
  }

  removeFirstOccurrence(value: T): Node<T> | void {
    let tmpNode = this.head;
    while (tmpNode) {
      if (tmpNode.value === value) {
        this.removeNode(tmpNode);
        return tmpNode;
      }

      tmpNode = tmpNode.nextNode;
    }
  }

  removeLastOccurrence(value: T): Node<T> | void {
    let tmpNode = this.tail;
    while (tmpNode) {
      if (tmpNode.value === value) {
        this.removeNode(tmpNode);
        return tmpNode;
      }

      tmpNode = tmpNode.prevNode;
    }
  }

  removeAllOccurrences(value: T): Node<T>[] {
    const out: Node<T>[] = [];
    let tmpNode = this.head;
    while (tmpNode) {
      if (tmpNode.value === value) {
        this.removeNode(tmpNode);
        out.push(tmpNode);
      }

      tmpNode = tmpNode.nextNode;
    }
    return out;
  }

  removeHead(): Node<T> | undefined {
    return this.removeNode(this.head);
  }

  removeTail(): Node<T> | undefined {
    return this.removeNode(this.tail);
  }

  //
  // contain methods
  //
  containsNode(node: Node<T>): boolean {
    return this.nodeSet.has(node);
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
  indexOfNode(node: Node<T>): number {
    let tmpNode = this.head;
    let i = 0;
    while (tmpNode) {
      if (tmpNode === node) {
        return i;
      }

      i++;
      tmpNode = tmpNode.nextNode;
    }
    return -1;
  }

  lastIndexOfValue(value: T): number {
    let tmpNode = this.tail;
    let i = this.length - 1;
    while (tmpNode) {
      if (tmpNode.value === value) {
        return i;
      }

      i--;
      tmpNode = tmpNode.prevNode;
    }
    return -1;
  }

  indexOfValue(value: T): number {
    let tmpNode = this.head;
    let i = 0;
    while (tmpNode) {
      if (tmpNode.value === value) {
        return i;
      }

      i++;
      tmpNode = tmpNode.nextNode;
    }
    return -1;
  }

  //
  // utility methods
  //

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.nodeSet.clear();
    this.valueSet.clear();
  }

  clone(): DoubleLinkedList<T> {
    const dll = new DoubleLinkedList<T>();
    let node = this.head;
    while (node !== undefined) {
      dll.addBack(node.value);
      node = node.nextNode;
    }
    return dll;
  }

  get length(): number {
    return this.nodeSet.size;
  }

  toArray(): T[] {
    return this.map((val) => val);
  }

  *valueIterator(): IterableIterator<T> {
    let tmpNode = this.head;
    while (tmpNode) {
      yield tmpNode?.value;
      tmpNode = tmpNode?.nextNode;
    }
  }

  *nodeIterator(): IterableIterator<Node<T>> {
    let tmpNode = this.head;
    while (tmpNode) {
      yield tmpNode;
      tmpNode = tmpNode?.nextNode;
    }
  }

  *valueIteratorReverse(): IterableIterator<T> {
    let tmpNode = this.tail;
    while (tmpNode) {
      yield tmpNode?.value;
      tmpNode = tmpNode?.prevNode;
    }
  }

  *nodeIteratorReverse(): IterableIterator<Node<T>> {
    let tmpNode = this.tail;
    while (tmpNode) {
      yield tmpNode;
      tmpNode = tmpNode?.prevNode;
    }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.valueIterator();
  }
}

export { DoubleLinkedList, Node };
export type { NodeProps };
