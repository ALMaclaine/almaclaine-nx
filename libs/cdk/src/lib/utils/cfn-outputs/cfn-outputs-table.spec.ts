import { generateCfnTableArn, generateCfnTableName } from './cfn-outputs-table';

describe('cfn-outputs-table', () => {
  describe('generateCfnTableName function', () => {
    it('should generate name with "Table" suffix', () => {
      expect(generateCfnTableName('hello')).toBe('helloTableName');
      expect(generateCfnTableName('foo')).toBe('fooTableName');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnTableName('')).toBe('TableName');
    });
  });

  describe('generateCfnTableArn function', () => {
    it('should generate ARN with "TableName" suffix', () => {
      expect(generateCfnTableArn('hello')).toBe('helloTableArn');
      expect(generateCfnTableArn('foo')).toBe('fooTableArn');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnTableArn('')).toBe('TableArn');
    });
  });
});
