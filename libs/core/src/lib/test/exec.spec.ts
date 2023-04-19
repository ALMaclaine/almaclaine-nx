import { exec } from '../exec';
import type { ExecFunction } from '@almaclaine/types';

describe('lang/exec()', () => {
  it('exec works', () => {
    let val1;
    exec(
      (param: string) => {
        val1 = param;
      },
      { a: 2 },
      'a',
      undefined
    );
    expect(val1).toBe(2);

    let val2;
    let val3;
    let val4;
    const testFunc: ExecFunction = (v1, v2, v3) => {
      val2 = v1;
      val3 = v2;
      val4 = v3;
      return true;
    };
    exec(testFunc, { a: 2 }, 'a');
    expect(val2).toBe(2);
    expect(val3).toBe('a');
    expect(val4).toMatchObject({ a: 2 });

    let val5;
    function testFunc2(this: never) {
      val5 = this['a'];
      return true;
    }
    exec(testFunc2, { a: 2 }, 'a', { a: 3 });
    expect(val5).toBe(3);
  });
});
