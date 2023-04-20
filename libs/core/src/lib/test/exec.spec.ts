import { exec } from '../exec';
import type { ExecFunction, ExecRecord } from '@almaclaine/types';

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

    const testFunc: ExecFunction = (v1, v2: string, v3: ExecRecord) => {
      expect(v1).toBe(2);
      expect(v2).toBe('a');
      expect(v3).toMatchObject({ a: 2 });
      return true;
    };
    exec(testFunc, { a: 2 }, 'a');

    let val5;

    function testFunc2(this: never) {
      val5 = this['a'];
      return true;
    }

    exec(testFunc2, { a: 2 }, 'a', { a: 3 });
    expect(val5).toBe(3);
  });
});
