import { ICalParser } from './ical';
import { getIcsFiles } from './test-utils';

describe('ICalParser', () => {
  it('should work', () => {
    const parser = new ICalParser();
    const files = getIcsFiles();
    const out = parser.parseICal(files[0]);
    console.log(out);
    // expect(parser.parseICal(files[0])).toEqual('ical');
  });
});
