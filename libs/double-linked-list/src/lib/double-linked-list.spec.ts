import { DoubleLinkedList, Node } from './double-linked-list';
import { expect } from 'vitest';

describe('DoubleLinkedList', () => {
  it('list should start out with head/tail undefined', () => {
    const dll = new DoubleLinkedList();
    expect(dll.peekFirst()).toEqual(undefined);
    expect(dll.peekLast()).toEqual(undefined);
  });

  it('addFront 1 node should be head and tail', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()).toEqual(dll.peekFirst());
  });

  it('addFront 2 node should be connected', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    dll.addFront(3);
    expect(dll.peekFirst()).toMatchObject({ value: 3 });
    expect(dll.peekLast()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());
  });

  it('addFront 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    dll.addFront(3);
    expect(dll.peekFirst()).toMatchObject({ value: 3 });
    expect(dll.peekLast()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());

    dll.addFront(4);
    expect(dll.peekFirst()).toMatchObject({ value: 4 });
  });

  it('addFrontMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFrontMany([2, 3, 4]);
    expect(dll.peekLast()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()).toMatchObject({ value: 4 });
  });

  it('addBack 1 node should be head and tail', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addBack(2);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()).toEqual(dll.peekFirst());
  });

  it('addBack 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addBack(2);
    dll.addBack(3);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 3 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());
  });

  it('addBack 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addBack(2);
    dll.addBack(3);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 3 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());

    dll.addBack(4);
    expect(dll.peekLast()).toMatchObject({ value: 4 });
  });

  it('addNodeFront 2 node should be connected', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeFront(node2);
    expect(dll.peekFirst()).toMatchObject({ value: 3 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekFirst()?.nextNode).toEqual(node1);

    expect(dll.peekLast()).toMatchObject({ value: 2 });
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());
    expect(dll.peekLast()?.prevNode).toEqual(node2);

    expect(dll.peekFirst()?.prevNode).toEqual(undefined);
    expect(dll.peekLast()?.nextNode).toEqual(undefined);
  });

  it('addNodeFront 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeFront(node2);
    expect(dll.peekFirst()).toMatchObject({ value: 3 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekFirst()?.nextNode).toEqual(node1);

    expect(dll.peekLast()).toMatchObject({ value: 2 });
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());
    expect(dll.peekLast()?.prevNode).toEqual(node2);

    expect(dll.peekFirst()?.prevNode).toEqual(undefined);
    expect(dll.peekLast()?.nextNode).toEqual(undefined);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeFront(node3);
    expect(dll.peekFirst()).toMatchObject({ value: 4 });
    expect(dll.peekFirst()?.nextNode).toEqual(node2);
  });

  it('addNodeFrontMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    const node2 = new Node<number>({ value: 3 });
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeFrontMany([node1, node2, node3]);

    expect(dll.peekFirst()).toMatchObject({ value: 4 });
    expect(dll.peekLast()).toMatchObject({ value: 2 });
  });

  it('addNodeBack works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeBack(node1);
    expect(dll.peekFirst()).toEqual(node1);
    expect(dll.peekLast()).toEqual(node1);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeBack(node2);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekFirst()?.nextNode).toEqual(dll.peekLast());
    expect(dll.peekFirst()?.nextNode).toEqual(node2);

    expect(dll.peekLast()).toMatchObject({ value: 3 });
    expect(dll.peekLast()?.prevNode).toEqual(dll.peekFirst());
    expect(dll.peekLast()?.prevNode).toEqual(node1);

    expect(dll.peekFirst()?.prevNode).toEqual(undefined);
    expect(dll.peekLast()?.nextNode).toEqual(undefined);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBack(node3);
    expect(dll.peekLast()).toMatchObject({ value: 4 });
    expect(dll.peekLast()?.prevNode).toEqual(node2);
  });

  it('addNodeBackMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    const node2 = new Node<number>({ value: 3 });
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBackMany([node1, node2, node3]);

    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 4 });
  });

  it('cannot add same node multiple times', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    expect(() => dll.addNodeFront(node1)).toThrow();
    expect(() => dll.addNodeBack(node1)).toThrow();
  });

  it('add node before node', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeBeforeNode(node2, node1);
    expect(dll.peekFirst()).toMatchObject({ value: 3 });
    expect(dll.peekLast()).toMatchObject({ value: 2 });

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBeforeNode(node3, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node3);
    expect(dll.peekLast()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeBeforeNode(node4, node1);
    expect(dll.peekFirst()?.nextNode?.nextNode).toEqual(node4);
    expect(dll.peekLast()?.prevNode).toEqual(node4);
  });

  it('add node after node', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeAfterNode(node2, node1);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 3 });

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeAfterNode(node3, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node3);
    expect(dll.peekLast()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeAfterNode(node4, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node4);
    expect(dll.peekLast()?.prevNode?.prevNode).toEqual(node4);

    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 3 });
  });

  it('clear works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeAfterNode(node2, node1);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeAfterNode(node3, node1);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeAfterNode(node4, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node4);
    expect(dll.peekLast()?.prevNode?.prevNode).toEqual(node4);

    dll.clear();
    expect(dll.peekFirst()).toEqual(undefined);
    expect(dll.peekLast()).toEqual(undefined);
  });

  it('clone works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeAfterNode(node2, node1);
    expect(dll.peekFirst()).toMatchObject({ value: 2 });
    expect(dll.peekLast()).toMatchObject({ value: 3 });
    expect(dll.peekFirst() === dll.peekFirst()).toEqual(true);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeAfterNode(node3, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node3);
    expect(dll.peekLast()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeAfterNode(node4, node1);
    expect(dll.peekFirst()?.nextNode).toEqual(node4);
    expect(dll.peekLast()?.prevNode?.prevNode).toEqual(node4);

    const dll2 = dll.clone();

    expect(dll2.peekFirst()).toMatchObject({ value: 2 });
    expect(dll2.peekLast()).toMatchObject({ value: 3 });

    expect(dll2.peekFirst() === dll.peekFirst()).toEqual(false);
    expect(dll2.peekLast() === dll.peekLast()).toEqual(false);
  });

  it('contains node works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    expect(dll.containsNode(node1)).toBeTruthy();
  });

  it('contains value works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    expect(dll.containsValue(2)).toBeTruthy();

    const value = { a: 2 };
    const dll2 = new DoubleLinkedList<typeof value>();
    const node2 = new Node<typeof value>({ value });
    dll2.addNodeFront(node2);
    expect(dll2.containsValue(value)).toBeTruthy();
  });

  it('iterator works', () => {
    const dll = new DoubleLinkedList<number>();
    const values = [2, 3, 4, 5];
    const node1 = new Node<number>({ value: values[0] });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: values[1] });
    dll.addNodeAfterNode(node2, node1);
    const node3 = new Node<number>({ value: values[2] });
    dll.addNodeAfterNode(node3, node1);
    const node4 = new Node<number>({ value: values[3] });
    dll.addNodeAfterNode(node4, node1);

    let i = 0;
    const nodes = [node1, node4, node3, node2];
    for (const node of dll) {
      expect(node).toEqual(nodes[i++].value);
    }
  });

  it('length works', () => {
    const dll = new DoubleLinkedList<number>();
    const values = [2, 3, 4, 5];
    const node1 = new Node<number>({ value: values[0] });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: values[1] });
    dll.addNodeAfterNode(node2, node1);
    const node3 = new Node<number>({ value: values[2] });
    dll.addNodeAfterNode(node3, node1);
    const node4 = new Node<number>({ value: values[3] });
    dll.addNodeAfterNode(node4, node1);

    expect(dll.length).toEqual(4);
  });

  it('add node index works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    expect(dll.peekFirst()).toEqual(node1);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    expect(dll.peekLast()).toEqual(node2);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);
    expect(dll.peekFirst()?.nextNode).toEqual(node3);
    expect(dll.peekLast()?.prevNode).toEqual(node3);
  });

  it('add index works', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addIndex(2, -1);
    expect(dll.peekFirst()?.value).toEqual(2);

    dll.addIndex(3, 10);
    expect(dll.peekLast()?.value).toEqual(3);

    dll.addIndex(4, 1);
    expect(dll.peekFirst()?.nextNode?.value).toEqual(4);
    expect(dll.peekLast()?.prevNode?.value).toEqual(4);
  });

  it('indexOfNode works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    expect(dll.indexOfNode(node1)).toEqual(0);

    const node2 = new Node<number>({ value: 3 });
    expect(dll.indexOfNode(node2)).toEqual(-1);

    dll.addNodeIndex(node2, 10);
    expect(dll.indexOfNode(node2)).toEqual(1);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);
    expect(dll.indexOfNode(node3)).toEqual(1);
  });

  it('indexOfValue works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    expect(dll.indexOfValue(2)).toEqual(0);

    const node2 = new Node<number>({ value: 3 });
    expect(dll.indexOfValue(3)).toEqual(-1);

    dll.addNodeIndex(node2, 10);
    expect(dll.indexOfValue(3)).toEqual(1);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);
    expect(dll.indexOfValue(4)).toEqual(1);
  });
});
