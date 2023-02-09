import type { PriorityQueueComparator, Node } from '@almaclaine/priority-queue';
import { PriorityQueue } from '@almaclaine/priority-queue';
import type { Scheduling } from './scheduling';

class SchedulerQueue {
  private readonly idNodeMap = new Map<string, Node<Scheduling>>();
  private readonly pq = new PriorityQueue<Scheduling>({
    comparator: (val1: Scheduling, val2: Scheduling) =>
      val1.timeToExecute - val2.timeToExecute,
  });

  getComparator(): PriorityQueueComparator<Scheduling> {
    return this.pq.getComparator();
  }

  compare(val1: Scheduling, val2: Scheduling): number {
    return this.pq.compare(val1, val2);
  }

  clear(): void {
    this.pq.clear();
    this.idNodeMap.clear();
  }

  add(scheduling: Scheduling): Node<Scheduling> {
    const { id } = scheduling;
    const node = this.pq.add(scheduling);
    this.idNodeMap.set(id, node);
    return node;
  }

  addMany(schedule: Scheduling[]): Node<Scheduling>[] {
    return schedule.map((sch) => this.add(sch));
  }

  peekLast(): Node<Scheduling> | undefined {
    return this.pq.peekLast();
  }

  peekLastValue(): Scheduling | undefined {
    return this.pq.peekLastValue();
  }

  peekFirst(): Node<Scheduling> | undefined {
    return this.pq.peekFirst();
  }

  removeFirstValue(): Scheduling | undefined {
    const sch = this.pq.removeFirstValue();
    if (sch) {
      this.idNodeMap.delete(sch.id);
    }
    return sch;
  }

  removeLastValue(): Scheduling | undefined {
    const sch = this.pq.removeLastValue();
    if (sch) {
      this.idNodeMap.delete(sch.id);
    }
    return sch;
  }

  removeNode(node?: Node<Scheduling>): Node<Scheduling> | undefined {
    const sch = this.pq.removeNode(node);
    if (sch) {
      this.idNodeMap.delete(sch.value.id);
    }
    return sch;
  }

  removeNodeById(uuid: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const node = this.idNodeMap.get(uuid);
    if (node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.pq.removeNode(node);
    }
  }

  peekFirstValue(): Scheduling | undefined {
    return this.pq.peekFirstValue();
  }

  get length(): number {
    return this.pq.length;
  }

  map<U>(proc: (value: Scheduling) => U): U[] {
    return this.pq.map(proc);
  }

  forEach(proc: (value: Scheduling) => void): void {
    this.pq.forEach(proc);
  }

  toArray(): Scheduling[] {
    return this.pq.toArray();
  }

  valueIterator(): IterableIterator<Scheduling> {
    return this.pq.valueIterator();
  }

  nodeIterator(): IterableIterator<Node<Scheduling>> {
    return this.pq.nodeIterator();
  }

  valueIteratorReverse(): IterableIterator<Scheduling> {
    return this.pq.valueIteratorReverse();
  }

  nodeIteratorReverse(): IterableIterator<Node<Scheduling>> {
    return this.pq.nodeIteratorReverse();
  }

  [Symbol.iterator](): IterableIterator<Scheduling> {
    return this.valueIterator();
  }
}

export { SchedulerQueue };
