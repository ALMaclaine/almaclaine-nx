import { stripHtmlTags } from '../strip-html-tags';

describe('string/stripHtmlTags()', function () {
  it('should remove html tags', function () {
    const str =
      '<div><div><span>lorem</span> ipsum <b>dolor</b></div><div> sit </div></div>amet';
    expect(stripHtmlTags(str)).toEqual('lorem ipsum dolor sit amet');
  });
});
