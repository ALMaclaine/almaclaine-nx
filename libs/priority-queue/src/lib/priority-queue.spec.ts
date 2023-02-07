import { PriorityQueue } from './priority-queue';
import { expect } from 'vitest';

const comparator = (a: number, b: number) => a - b;

describe('priorityQueue', () => {
  it('PriorityQueue starts out empty', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    expect(pq.peekFirst()).toEqual(undefined);
    expect(pq.peekFirst()).toEqual(undefined);
  });

  it('add works correctly basic', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    expect(pq.peekFirst()).toEqual(undefined);
    expect(pq.peekFirst()).toEqual(undefined);

    const out = pq.add(-1);
    expect(pq.peekFirst()).toEqual(out);
    expect(pq.peekFirstValue()).toEqual(-1);
    expect(pq.peekLastValue()).toEqual(-1);

    pq.add(1);
    expect(pq.peekFirstValue()).toEqual(-1);
    expect(pq.peekLastValue()).toEqual(1);

    pq.add(0);
    expect(pq.peekFirst()?.nextNode?.value).toEqual(0);
    expect(pq.peekLast()?.prevNode?.value).toEqual(0);
  });

  it('removeFirst/removeLast works correctly basic', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    expect(pq.peekFirst()).toEqual(undefined);
    expect(pq.peekFirst()).toEqual(undefined);

    const out = pq.add(-1);
    expect(pq.peekFirst()).toEqual(out);
    expect(pq.peekFirstValue()).toEqual(-1);
    expect(pq.peekLastValue()).toEqual(-1);

    pq.add(1);
    expect(pq.peekFirstValue()).toEqual(-1);
    expect(pq.peekLastValue()).toEqual(1);

    pq.add(0);
    expect(pq.peekFirst()?.nextNode?.value).toEqual(0);
    expect(pq.peekLast()?.prevNode?.value).toEqual(0);

    expect(pq.removeFirstValue()).toEqual(out.value);
    expect(pq.peekLast()?.value).toEqual(pq.removeLastValue());
  });

  it('add works correctly expanded', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    const out = pq.addMany(toAdd);
    expect(out[0]).toEqual(pq.peekFirst());
    expect(pq.toArray()).toMatchObject(toAdd.sort());
  });

  it('addMany works correctly expanded', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    pq.addMany(toAdd);
    expect(pq.toArray()).toMatchObject(toAdd.sort());
  });

  it('removeNode works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    pq.add(1);
    pq.add(2);
    expect(pq.peekFirst()).toEqual(pq.removeNode(pq.peekFirst()));
    expect(pq.peekFirst()?.value).toEqual(2);
  });

  it('nodeIterator works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));

    const sorted = toAdd.sort();
    let i = 0;
    for (const node of pq.nodeIterator()) {
      expect(node.value).toEqual(sorted[i++]);
    }
  });

  it('valueIteratorReverse works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));

    const sorted = toAdd.sort().reverse();
    let i = 0;
    for (const node of pq.nodeIteratorReverse()) {
      expect(node.value).toEqual(sorted[i++]);
    }
  });

  it('valueIteratorReverse works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));

    const sorted = toAdd.sort().reverse();
    let i = 0;
    for (const value of pq.valueIteratorReverse()) {
      expect(value).toEqual(sorted[i++]);
    }
  });

  it('iterator works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));

    const sorted = toAdd.sort();
    let i = 0;
    for (const value of pq) {
      expect(value).toEqual(sorted[i++]);
    }
  });

  it('map works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [1, 2, 3];
    pq.addMany(toAdd);
    expect(pq.map((val) => 2 * val)).toMatchObject([2, 4, 6]);
  });

  it('forEach works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [1, 2, 3];
    pq.addMany(toAdd);
    const test: number[] = [];
    pq.forEach((val) => test.push(2 * val));
    expect(test).toMatchObject([2, 4, 6]);
  });

  it('length works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));
    expect(pq.length).toEqual(toAdd.length);
  });

  it('clear works', () => {
    const pq = new PriorityQueue<number>({
      comparator,
    });
    const toAdd = [9, 2, -1, 6, 2, 8, 1];
    toAdd.forEach((val) => pq.add(val));
    pq.clear();
    expect(pq.peekFirst()).toEqual(undefined);
    expect(pq.peekFirst()).toEqual(undefined);
    expect(pq.length).toEqual(0);
  });
});
