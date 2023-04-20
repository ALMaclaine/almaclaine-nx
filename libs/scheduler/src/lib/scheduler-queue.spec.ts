import { SchedulerQueue } from './scheduler-queue';
import type { Node } from '@almaclaine/priority-queue';
import { expect } from 'vitest';
import { Scheduling } from './scheduling';

const scheduling1 = new Scheduling({
  id: 'id1',
  timeToExecute: Date.now(),
  repeat: 0,
});

const scheduling2 = new Scheduling({
  id: 'id2',
  timeToExecute: Date.now() + 2,
  repeat: 0,
});

const scheduling3 = new Scheduling({
  id: 'id3',
  timeToExecute: Date.now() + 1,
  repeat: 0,
});

describe('SchedulerQueue', () => {
  it('SchedulerQueue starts out empty', () => {
    const sq = new SchedulerQueue();
    expect(sq.peekFirst()).toEqual(undefined);
    expect(sq.peekFirst()).toEqual(undefined);
  });

  it('add works correctly basic', () => {
    const sq = new SchedulerQueue();
    expect(sq.peekFirst()).toEqual(undefined);
    expect(sq.peekFirst()).toEqual(undefined);

    const out: Node<Scheduling> = sq.add(scheduling1);
    expect(sq.peekFirst()).toEqual(out);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling1);

    sq.add(scheduling2);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling2);

    sq.add(scheduling3);
    expect(sq.peekFirst()?.nextNode?.value).toEqual(scheduling3);
    expect(sq.peekLast()?.prevNode?.value).toEqual(scheduling3);
  });

  it('removeFirst/removeLast works', () => {
    const sq = new SchedulerQueue();
    expect(sq.peekFirst()).toEqual(undefined);
    expect(sq.peekFirst()).toEqual(undefined);

    const out = sq.add(scheduling1);
    expect(sq.peekFirst()).toEqual(out);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling1);

    sq.add(scheduling2);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling2);

    sq.add(scheduling3);
    expect(sq.peekFirst()?.nextNode?.value).toEqual(scheduling3);
    expect(sq.peekLast()?.prevNode?.value).toEqual(scheduling3);

    expect(sq.removeFirstValue()).toEqual(out.value);
    expect(sq.peekFirstValue()).not.toEqual(out.value);
    expect(sq.peekLast()?.value).toEqual(sq.removeLastValue());
  });

  it('removeNodeById works', () => {
    const sq = new SchedulerQueue();

    sq.add(scheduling1);
    sq.add(scheduling2);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling2);

    sq.add(scheduling3);
    expect(sq.peekFirst()?.nextNode?.value).toEqual(scheduling3);
    expect(sq.peekLast()?.prevNode?.value).toEqual(scheduling3);

    sq.removeNodeById(scheduling3.id);
    expect(sq.peekFirstValue()).toEqual(scheduling1);
    expect(sq.peekLastValue()).toEqual(scheduling2);
  });

  it('add works correctly expanded', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);
    expect(sq.toArray()).toMatchObject(
      toAdd.sort((val1, val2) => sq.compare(val1, val2))
    );
  });

  it('removeNode works', () => {
    const pq = new SchedulerQueue();
    pq.add(scheduling1);
    pq.add(scheduling2);
    expect(pq.peekFirst()).toEqual(pq.removeNode(pq.peekFirst()));
    expect(pq.peekFirst()?.value).toEqual(scheduling2);
  });

  it('nodeIterator works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2));
    let i = 0;
    for (const node of sq.nodeIterator()) {
      expect(node.value).toEqual(sorted[i++]);
    }
  });

  it('nodeIteratorReverse works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2)).reverse();
    let i = 0;
    for (const node of sq.nodeIteratorReverse()) {
      expect(node.value).toEqual(sorted[i++]);
    }
  });

  it('valueIteratorReverse works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2)).reverse();
    let i = 0;
    for (const value of sq.valueIteratorReverse()) {
      expect(value).toEqual(sorted[i++]);
    }
  });

  it('iterator works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2));
    let i = 0;
    for (const value of sq) {
      expect(value).toEqual(sorted[i++]);
    }
  });

  it('map works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2));
    expect(sq.map((val) => val)).toMatchObject(sorted);
  });

  it('forEach works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);

    const test: Scheduling[] = [];
    sq.forEach((val) => test.push(val));

    const sorted = toAdd.sort((val1, val2) => sq.compare(val1, val2));
    expect(test).toMatchObject(sorted);
  });

  it('length works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);
    expect(sq.length).toEqual(toAdd.length);
  });

  it('clear works', () => {
    const sq = new SchedulerQueue();
    const toAdd = [scheduling1, scheduling2, scheduling3];
    sq.addMany(toAdd);
    sq.clear();
    expect(sq.peekFirst()).toEqual(undefined);
    expect(sq.peekFirst()).toEqual(undefined);
    expect(sq.length).toEqual(0);
  });
});
