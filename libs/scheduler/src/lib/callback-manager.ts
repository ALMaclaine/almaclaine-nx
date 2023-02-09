import type { SchedulingCallback } from './types';
import { noOp } from '@almaclaine/no-op';

type CallbackManagerProps = {
  throwOnMissingCallback?: boolean;
  defaultCallback?: SchedulingCallback;
};

class CallbackManager {
  private readonly callbackMap = new Map<string, SchedulingCallback>();
  private readonly throwOnMissingCallback: boolean;
  private readonly defaultCallback: SchedulingCallback;
  constructor(props?: CallbackManagerProps) {
    this.throwOnMissingCallback = props?.throwOnMissingCallback ?? false;
    this.defaultCallback = props?.defaultCallback ?? noOp;
  }

  addCallback(id: string, schedulingCallback: SchedulingCallback): void {
    this.callbackMap.set(id, schedulingCallback);
  }

  getCallback(id: string): SchedulingCallback {
    const val = this.callbackMap.get(id);
    if (val) {
      return val;
    } else {
      if (this.throwOnMissingCallback) {
        throw new Error(`Callback is missing for id: ${id}`);
      } else {
        return this.defaultCallback;
      }
    }
  }
}

export { CallbackManager };
