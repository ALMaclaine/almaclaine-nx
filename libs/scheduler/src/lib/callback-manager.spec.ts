import { CallbackManager } from './callback-manager';
import { noOp } from '@almaclaine/no-op';

describe('CallbackManager', () => {
  it('default function is noOp', () => {
    const cm = new CallbackManager();
    expect(cm.getCallback('id')).toEqual(noOp);
  });

  it('returns correct defaultMethod when specified', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const defaultCallback = () => {};
    const cm = new CallbackManager({ defaultCallback });
    expect(cm.getCallback('id')).toEqual(defaultCallback);
  });

  it('throws when specified and no callback for id', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const cm = new CallbackManager({ throwOnMissingCallback: true });
    expect(() => cm.getCallback('id')).toThrow();
  });

  it('add callback works', () => {
    const cm = new CallbackManager({ throwOnMissingCallback: true });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const func = () => {};
    cm.addCallback('id', func);
    expect(cm.getCallback('id')).toEqual(func);
  });
});
