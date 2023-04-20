import { escapeHtml } from '../escape-html';

describe('string/escapeRegex', function () {
  it('should convert special chars into entities', function () {
    expect(escapeHtml('<em>\'lorem\'</em> & "ipsum"')).toEqual(
      '&lt;em&gt;&#39;lorem&#39;&lt;/em&gt; &amp; &quot;ipsum&quot;'
    );
  });
});
