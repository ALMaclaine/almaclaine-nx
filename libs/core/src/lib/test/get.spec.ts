import { get } from '../get';
import { UNDEFINED } from '@almaclaine/constants';

describe('object/get()', () => {
  it('should get nested property', () => {
    const foo = {
      bar: {
        lorem: {
          ipsum: 'dolor',
        },
      },
    };
    expect(get(foo, 'bar.lorem.ipsum')).toBe('dolor');
  });

  it('should get nested property when encountering non-primitive', () => {
    const foo = {
      bar: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        lorem: () => {},
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    foo.bar.lorem.ipsum = 'dolor';

    expect(get(foo, 'bar.lorem.ipsum')).toBe('dolor');
  });

  it('should get nested property when encountering primitive', () => {
    const foo = {
      bar: {
        lorem: 'ipsum',
      },
    };

    expect(get(foo, 'bar.lorem')).toBe(foo.bar.lorem);
  });

  it('should return undefined if non existent', () => {
    const foo = {
      bar: {
        lorem: 'ipsum',
      },
    };
    expect(get(foo, 'bar.dolor')).toBe(UNDEFINED);
  });

  it('should return undefined when encountering null', () => {
    const foo = {
      bar: null,
    };

    expect(get(foo, 'bar.baz')).toBe(UNDEFINED);
  });

  it('should work for false', () => {
    const foo = {
      bar: false,
    };

    expect(get(foo, 'bar')).toBe('false');
  });
});
