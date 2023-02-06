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

  get value() {
    return this._value;
  }
}

class DoubleLinkedList<T> {
  private tail?: Node<T>;
  private head?: Node<T>;
  private nodeSet = new Set<Node<T>>();

  addFront(value: T) {
    const newNode = new Node<T>({ value });
    this.addNodeFront(newNode);
  }

  addFrontMany(values: T[]) {
    values.forEach((val) => this.addFront(val));
  }

  addBack(value: T) {
    const newNode = new Node<T>({ value });
    this.addNodeBack(newNode);
  }

  addBackMany(values: T[]) {
    values.forEach((val) => this.addBack(val));
  }

  addNodeFront(node: Node<T>) {
    if (this.nodeSet.has(node)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.nodeSet.add(node);
    }
    this.nodeSet.add(node);
    if (!this.head && !this.tail) {
      this.addNodeEmpty(node);
    } else if (this.head && this.head === this.tail) {
      this.head = node;
      this.head.nextNode = this.tail;
      this.tail.prevNode = this.head;
    } else {
      if (this.head) {
        this.addNodeBeforeNode(node, this.head);
        node.nextNode = this.head;
        this.head.prevNode = node;
        this.head = node;
      } else {
        throw new Error('Should not happen');
      }
    }
  }

  addNodeFrontMany(nodes: Node<T>[]) {
    nodes.forEach((node) => this.addNodeFront(node));
  }

  addNodeBack(node: Node<T>) {
    if (this.nodeSet.has(node)) {
      throw new Error('Cannot add same node multiple times');
    } else {
      this.nodeSet.add(node);
    }

    if (!this.head && !this.tail) {
      this.addNodeEmpty(node);
    } else if (this.head && this.head === this.tail) {
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

  addNodeBackMany(nodes: Node<T>[]) {
    nodes.forEach((node) => this.addNodeBack(node));
  }

  addNodeBeforeNode(nodeToAdd: Node<T>, beforeNode: Node<T>) {
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

  addNodeAfterNode(nodeToAdd: Node<T>, afterNode: Node<T>) {
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

  private addNodeEmpty(node: Node<T>) {
    this.head = node;
    this.tail = this.head;
  }

  peek() {
    return this.peekFirst();
  }

  peekFirst() {
    return this?.head;
  }

  peekLast() {
    return this?.tail;
  }
}

export { DoubleLinkedList, Node };
