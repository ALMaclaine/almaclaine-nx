import { DoubleLinkedList, Node } from './double-linked-list';
import { expect } from 'vitest';

describe('DoubleLinkedList', () => {
  it('list should start out with head/tail undefined', () => {
    const dll = new DoubleLinkedList();
    expect(dll.peekHead()).toEqual(undefined);
    expect(dll.peekTail()).toEqual(undefined);
  });

  it('addFront 1 node should be head and tail', () => {
    const dll = new DoubleLinkedList<number>();
    const out = dll.addFront(2);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekHead()).toEqual(dll.peekHead());
    expect(out).toEqual(dll.peekHead());
  });

  it('peekHeadValue/peekTailValue works', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    expect(dll.peekHeadValue()).toEqual(2);
    expect(dll.peekTailValue()).toEqual(2);
  });

  it('addFront 2 node should be connected', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    dll.addFront(3);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekTail()).toMatchObject({ value: 2 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());
  });

  it('addFront 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addFront(2);
    dll.addFront(3);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekTail()).toMatchObject({ value: 2 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());

    dll.addFront(4);
    expect(dll.peekHead()).toMatchObject({ value: 4 });
  });

  it('addFrontMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const out = dll.addFrontMany([2, 3, 4]);
    expect(dll.peekTail()).toMatchObject({ value: 2 });
    expect(dll.peekHead()).toMatchObject({ value: 4 });
    expect(out[0]).toEqual(dll.peekTail());
    expect(out[out.length - 1]).toEqual(dll.peekHead());
  });

  it('addBackMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const out = dll.addBackMany([2, 3, 4]);
    expect(dll.peekTail()).toMatchObject({ value: 4 });
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(out[0]).toEqual(dll.peekHead());
    expect(out[out.length - 1]).toEqual(dll.peekTail());
  });

  it('addBack 1 node should be head and tail', () => {
    const dll = new DoubleLinkedList<number>();
    const out = dll.addBack(2);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekHead()).toEqual(dll.peekHead());
    expect(out).toEqual(dll.peekHead());
  });

  it('addBack 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addBack(2);
    dll.addBack(3);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 3 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());
  });

  it('addBack 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    dll.addBack(2);
    dll.addBack(3);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 3 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());

    dll.addBack(4);
    expect(dll.peekTail()).toMatchObject({ value: 4 });
  });

  it('addNodeFront 2 node should be connected', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeFront(node2);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekHead()?.nextNode).toEqual(node1);

    expect(dll.peekTail()).toMatchObject({ value: 2 });
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());
    expect(dll.peekTail()?.prevNode).toEqual(node2);

    expect(dll.peekHead()?.prevNode).toEqual(undefined);
    expect(dll.peekTail()?.nextNode).toEqual(undefined);
  });

  it('addNodeFront 3 node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeFront(node2);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekHead()?.nextNode).toEqual(node1);

    expect(dll.peekTail()).toMatchObject({ value: 2 });
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());
    expect(dll.peekTail()?.prevNode).toEqual(node2);

    expect(dll.peekHead()?.prevNode).toEqual(undefined);
    expect(dll.peekTail()?.nextNode).toEqual(undefined);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeFront(node3);
    expect(dll.peekHead()).toMatchObject({ value: 4 });
    expect(dll.peekHead()?.nextNode).toEqual(node2);
  });

  it('addNodeFrontMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    const node2 = new Node<number>({ value: 3 });
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeFrontMany([node1, node2, node3]);

    expect(dll.peekHead()).toMatchObject({ value: 4 });
    expect(dll.peekTail()).toMatchObject({ value: 2 });
  });

  it('addNodeBack works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeBack(node1);
    expect(dll.peekHead()).toEqual(node1);
    expect(dll.peekTail()).toEqual(node1);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeBack(node2);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekHead()?.nextNode).toEqual(dll.peekTail());
    expect(dll.peekHead()?.nextNode).toEqual(node2);

    expect(dll.peekTail()).toMatchObject({ value: 3 });
    expect(dll.peekTail()?.prevNode).toEqual(dll.peekHead());
    expect(dll.peekTail()?.prevNode).toEqual(node1);

    expect(dll.peekHead()?.prevNode).toEqual(undefined);
    expect(dll.peekTail()?.nextNode).toEqual(undefined);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBack(node3);
    expect(dll.peekTail()).toMatchObject({ value: 4 });
    expect(dll.peekTail()?.prevNode).toEqual(node2);
  });

  it('addNodeBackMany node should be correct', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    const node2 = new Node<number>({ value: 3 });
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBackMany([node1, node2, node3]);

    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 4 });
  });

  it('cannot add same node multiple times', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    expect(() => dll.addNodeFront(node1)).toThrow();
    expect(() => dll.addNodeBack(node1)).toThrow();
  });

  it('addNodeBeforeNode', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeBeforeNode(node2, node1);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekTail()).toMatchObject({ value: 2 });

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeBeforeNode(node3, node1);
    expect(dll.peekHead()?.nextNode).toEqual(node3);
    expect(dll.peekTail()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeBeforeNode(node4, node1);
    expect(dll.peekHead()?.nextNode?.nextNode).toEqual(node4);
    expect(dll.peekTail()?.prevNode).toEqual(node4);
  });

  it('addBeforeNode', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const out = dll.addBeforeNode(3, node1);
    expect(dll.peekHead()).toMatchObject({ value: 3 });
    expect(dll.peekHead()).toEqual(out);
    expect(dll.peekTail()).toMatchObject({ value: 2 });

    dll.addBeforeNode(4, node1);
    expect(dll.peekHead()?.nextNode).toMatchObject({ value: 4 });
    expect(dll.peekTail()?.prevNode).toMatchObject({ value: 4 });
  });

  it('addNodeAfterNode', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeAfterNode(node2, node1);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 3 });

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeAfterNode(node3, node1);
    expect(dll.peekHead()?.nextNode).toEqual(node3);
    expect(dll.peekTail()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeAfterNode(node4, node1);
    expect(dll.peekHead()?.nextNode).toEqual(node4);
    expect(dll.peekTail()?.prevNode?.prevNode).toEqual(node4);

    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 3 });
  });

  it('addAfterNode', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    expect(() => dll.addNodeBeforeNode(node1, node1)).toThrow();
    dll.addNodeFront(node1);
    const out = dll.addAfterNode(3, node1);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekHead()?.nextNode).toEqual(out);
    expect(dll.peekTail()).toMatchObject({ value: 3 });

    dll.addAfterNode(4, node1);
    expect(dll.peekHead()?.nextNode).toMatchObject({ value: 4 });
    expect(dll.peekTail()?.prevNode).toMatchObject({ value: 4 });

    dll.addAfterNode(5, node1);
    expect(dll.peekHead()?.nextNode).toMatchObject({ value: 5 });
    expect(dll.peekTail()?.prevNode).toMatchObject({ value: 4 });
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
    expect(dll.peekHead()?.nextNode).toEqual(node4);
    expect(dll.peekTail()?.prevNode?.prevNode).toEqual(node4);

    expect(dll.containsNode(node1)).toBeTruthy();
    expect(dll.containsValue(2)).toBeTruthy();

    dll.clear();
    expect(dll.peekHead()).toEqual(undefined);
    expect(dll.peekTail()).toEqual(undefined);
    expect(dll.containsNode(node1)).toBeFalsy();
    expect(dll.containsValue(2)).toBeFalsy();
  });

  it('clone works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeFront(node1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeAfterNode(node2, node1);
    expect(dll.peekHead()).toMatchObject({ value: 2 });
    expect(dll.peekTail()).toMatchObject({ value: 3 });
    expect(dll.peekHead() === dll.peekHead()).toEqual(true);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeAfterNode(node3, node1);
    expect(dll.peekHead()?.nextNode).toEqual(node3);
    expect(dll.peekTail()?.prevNode).toEqual(node3);

    const node4 = new Node<number>({ value: 5 });
    dll.addNodeAfterNode(node4, node1);
    expect(dll.peekHead()?.nextNode).toEqual(node4);
    expect(dll.peekTail()?.prevNode?.prevNode).toEqual(node4);

    const dll2 = dll.clone();

    expect(dll2.peekHead()).toMatchObject({ value: 2 });
    expect(dll2.peekTail()).toMatchObject({ value: 3 });

    expect(dll2.peekHead() === dll.peekHead()).toEqual(false);
    expect(dll2.peekTail() === dll.peekTail()).toEqual(false);
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

  it('valueIterator works', () => {
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
    for (const value of dll.valueIterator()) {
      expect(value).toEqual(nodes[i++].value);
    }
  });

  it('nodeIterator works', () => {
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
    for (const value of dll.nodeIterator()) {
      expect(value).toEqual(nodes[i++]);
    }
  });

  it('valueIteratorReverse works', () => {
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
    const nodes = [node1, node4, node3, node2].reverse();
    for (const value of dll.valueIteratorReverse()) {
      expect(value).toEqual(nodes[i++].value);
    }
  });

  it('nodeIteratorReverse works', () => {
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
    const nodes = [node1, node4, node3, node2].reverse();
    for (const value of dll.nodeIteratorReverse()) {
      expect(value).toEqual(nodes[i++]);
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
    expect(dll.peekHead()).toEqual(node1);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    expect(dll.peekTail()).toEqual(node2);

    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);
    expect(dll.peekHead()?.nextNode).toEqual(node3);
    expect(dll.peekTail()?.prevNode).toEqual(node3);
  });

  it('add index works', () => {
    const dll = new DoubleLinkedList<number>();
    const out = dll.addIndex(2, -1);
    expect(dll.peekHead()?.value).toEqual(2);
    expect(dll.peekHead()).toEqual(out);

    dll.addIndex(3, 10);
    expect(dll.peekTail()?.value).toEqual(3);

    dll.addIndex(4, 1);
    expect(dll.peekHead()?.nextNode?.value).toEqual(4);
    expect(dll.peekTail()?.prevNode?.value).toEqual(4);
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

  it('lastIndexOfValue works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    expect(dll.lastIndexOfValue(2)).toEqual(0);

    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    expect(dll.lastIndexOfValue(3)).toEqual(1);

    const node3 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node3, 1);
    expect(dll.lastIndexOfValue(2)).toEqual(1);

    const node4 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node4, 1);
    expect(dll.lastIndexOfValue(2)).toEqual(2);
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

  it('removeNode works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    expect(dll.peekHead()?.nextNode).toEqual(node3);
    expect(dll.peekTail()?.prevNode).toEqual(node3);
    dll.removeNode(node3);
    expect(dll.peekHead()).toEqual(node1);
    expect(dll.peekTail()).toEqual(node2);
  });

  it('removeHead works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    expect(dll.peekHead()).toEqual(node1);
    expect(dll.removeHead()).toEqual(node1);
    expect(dll.peekHead()).toEqual(node3);
  });

  it('removeTail works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    expect(dll.peekTail()).toEqual(node2);
    expect(dll.removeTail()).toEqual(node2);
    expect(dll.peekTail()).toEqual(node3);
  });

  it('removeAtIndex works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    expect(dll.peekTail()).toEqual(node2);
    expect(dll.removeAtIndex(2)).toEqual(node2);
    expect(dll.peekTail()).toEqual(node3);
  });

  it('map works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    const mapOut = dll.map((val) => 2 * val);
    expect(mapOut).toMatchObject([4, 8, 6]);
  });

  it('forEach works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node2, 10);
    const node3 = new Node<number>({ value: 4 });
    dll.addNodeIndex(node3, 1);

    let sum = 0;
    const totaler = (val: number) => (sum += val);
    dll.forEach(totaler);
    expect(sum).toEqual(9);
  });

  it('removeFirstOccurrence works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node2, 100);
    const node3 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node3, 100);

    expect(dll.removeFirstOccurrence(2)).toEqual(node1);
    expect(dll.peekHead()).toEqual(node2);
  });

  it('removeLastOccurrence works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node2, 100);
    const node3 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node3, 100);

    expect(dll.removeLastOccurrence(2)).toEqual(node3);
    expect(dll.peekTail()).toEqual(node2);
  });

  it('removeAllOccurrences works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node2, 100);
    const node3 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node3, 100);

    const node4 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node4, 100);

    dll.removeAllOccurrences(2);
    expect(dll.peekTail()).toEqual(node4);
  });

  it('toArray works', () => {
    const dll = new DoubleLinkedList<number>();
    const node1 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node1, -1);
    const node2 = new Node<number>({ value: 2 });
    dll.addNodeIndex(node2, 100);
    const node3 = new Node<number>({ value: 3 });
    dll.addNodeIndex(node3, 100);

    dll.toArray();
    expect(dll.toArray()).toMatchObject([2, 2, 3]);
  });
});
