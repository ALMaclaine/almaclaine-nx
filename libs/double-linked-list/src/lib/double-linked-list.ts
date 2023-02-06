type NodeProps<T> = {
  value: T;
  nextNode?: Node<T>;
  prevNode?: Node<T>;
};

class Node<T> {
  nextNode?: Node<T>;
  prevNode?: Node<T>;
  private readonly _value: T;

  constructor({ value, nextNode, prevNode }: NodeProps<T>) {
    this.nextNode = nextNode;
    this.prevNode = prevNode;
    this._value = value;
  }

  get value(): T {
    return this._value;
  }
}

class DoubleLinkedList<T> {
  private tail?: Node<T>;
  private head?: Node<T>;
  private nodeSet = new Set<Node<T>>();
  private valueSet = new Set<T>();

  addFront(value: T): void {
    const newNode = new Node<T>({ value });
    this.addNodeFront(newNode);
  }

  addFrontMany(values: T[]): void {
    values.forEach((val) => this.addFront(val));
  }

  addBack(value: T): void {
    const newNode = new Node<T>({ value });
    this.addNodeBack(newNode);
  }

  addIndex(value: T, index: number): void {
    const newNode = new Node<T>({ value });
    this.addNodeIndex(newNode, index);
  }

  addBackMany(values: T[]): void {
    values.forEach((val) => this.addBack(val));
  }

  private addNode(node: Node<T>) {
    this.valueSet.add(node.value);
    if (this.containsNode(node)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.nodeSet.add(node);
    }
  }

  addNodeIndex(node: Node<T>, index: number) {
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

  private addNodeEmpty(node: Node<T>): void {
    this.head = node;
    this.tail = this.head;
  }

  peekFirst(): Node<T> | undefined {
    return this?.head;
  }

  peekLast(): Node<T> | undefined {
    return this?.tail;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
  }

  containsNode(node: Node<T>) {
    return this.nodeSet.has(node);
  }

  containsValue(value: T) {
    return this.valueSet.has(value);
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

  get length() {
    return this.nodeSet.size;
  }

  [Symbol.iterator]() {
    let tmpNode = this.head;

    return {
      next: () => {
        const out = { value: tmpNode?.value, done: !tmpNode };
        tmpNode = tmpNode?.nextNode;
        return out;
      },
    };
  }
}

export { DoubleLinkedList, Node };
