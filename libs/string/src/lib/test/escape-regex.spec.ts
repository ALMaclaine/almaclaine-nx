import { escapeRegex } from '../escape-regex';

describe('string/escapeRegex', function () {
  it('should escape special chars', function () {
    expect(escapeRegex('lorem.ipsum')).toEqual('lorem\\.ipsum');
    expect(escapeRegex("\\.+*?^$[](){}/'#")).toEqual(
      "\\\\\\.\\+\\*\\?\\^\\$\\[\\]\\(\\)\\{\\}\\/\\'\\#"
    );
  });
});
