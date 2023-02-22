import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { UNDEFINED } from '@almaclaine/constants';

export class DuplicateNodeError extends Error {
  readonly _tag = 'DuplicateNodeError' as const;

  private constructor() {
    super('password fails to meet min length requirement: ${minLength}');
  }

  public static of(): DuplicateNodeError {
    return new DuplicateNodeError();
  }
}

type NodeProps<T> = {
  value: T;
  nextNode?: O.Option<T>;
  prevNode?: O.Option<T>;
};

class Node<T> {
  readonly _tag = 'Node' as const;

  nextNode: O.Option<T>;
  prevNode: O.Option<T>;
  readonly value: T;
  constructor({ value, nextNode = O.none, prevNode = O.none }: NodeProps<T>) {
    this.nextNode = nextNode;
    this.prevNode = prevNode;
    this.value = value;
  }

  static of<T>(props: NodeProps<T>) {
    return new Node(props);
  }
}

class DouleLinkedList<T> {
  readonly _tag = 'DouleLinkedList' as const;
  private tail: O.Option<Node<T>> = O.none;
  private head: O.Option<Node<T>> = O.none;
  private nodeSet = new Set<Node<T>>();
  private valueSet = new Set<T>();

  addNodeFront(node: Node<T>): E.Either<DuplicateNodeError, Node<T>> {
    const headOption = pipe(
      this.head,
      O.match(
        () => O.some(node),
        (node) => O.some(node)
      )
    );

    // const tailOption = pipe(
    //   this.tail,
    //   O.match(
    //     () => O.some(node),
    //     () => pipe(headOption, O.map(node => node.nextNode))
    //   )
    // );

    return pipe(
      node,
      // O.match(
      //   () => Node.of()
      // )
      (node) => this.addNode(node),
      (node) => {}
    );
  }

  containsNode(node: Node<T>): boolean {
    return this.nodeSet.has(node);
  }

  containsValue(value: T): boolean {
    return this.valueSet.has(value);
  }

  peekHead(): O.Option<Node<T>> {
    return this.head;
  }

  private addNode(node: Node<T>): E.Either<DuplicateNodeError, Node<T>> {
    return pipe(
      node,
      E.of,
      E.filterOrElse(
        (node) => this.containsNode(node),
        () => DuplicateNodeError.of()
      ),
      E.map((node) => {
        this.valueSet.add(node.value);
        this.nodeSet.add(node);
        return node;
      })
    );
  }

  get length(): number {
    return this.nodeSet.size;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}

const list = new DouleLinkedList<number>();
console.log(list.peekHead() === O.none);
const node = Node.of({ value: 2 });
list.addNodeFront(node);
console.log(list.peekHead());
