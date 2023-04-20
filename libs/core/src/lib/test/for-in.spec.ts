import { forIn } from '../for-in';

describe('object/forIn', function () {
  it('should loop through all properties', function () {
    const obj = {
      foo: 123,
      bar: true,
      lorem: 'ipsum',
    };

    const keys: string[] = [];
    const vals: unknown[] = [];

    forIn(obj, function (val, key, o) {
      expect(o).toMatchObject(obj);
      keys.push(key);
      vals.push(val);
    });

    expect(keys).toEqual(['foo', 'bar', 'lorem']);
    expect(vals).toEqual([123, true, 'ipsum']);
  });

  it('should enumerate special properties when defined', function () {
    const obj = {
      constructor: 'foo',
      toString: 'bar',
      hasOwnProperty: true,
    };

    const keys: string[] = [];
    forIn(obj, (value, key) => {
      keys.push(key);
    });

    expect(keys.length).toBe(3);
    expect(keys).toContain('constructor');
    expect(keys).toContain('toString');
    expect(keys).toContain('hasOwnProperty');
  });

  it('should allow custom thisObject', function () {
    const obj = {
      a: 123,
      b: true,
      c: 'ipsum',
    };

    let count = 0;

    forIn(
      obj,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (this: any, val, key, o) {
        expect(o).toBe(obj);
        expect(this).toBe(obj);
        count++;
      },
      obj
    );

    expect(count).toEqual(3);
  });

  it('should allow exiting the iteration early. see #94', function () {
    const obj = {
      a: 123,
      b: true,
      c: 'ipsum',
      d: 456,
    };

    let count = 0;

    forIn(obj, function () {
      count++;
      if (count === 2) {
        return false;
      }

      return;
    });

    expect(count).toBe(2);
  });
});
