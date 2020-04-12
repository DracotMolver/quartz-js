const has = require('./../src/has');
const is = require('./../src/is');

describe('General situations using Quartz', () => {
  it('is fobidden to overwrite `is`, `has` and `tools`', () => {
    expect(() => (is.ip = 'overwrite')).toThrow();
    expect(() => (is = 'overwrite')).toThrow();
  });

  describe('`is` functions showing consolo.error', () => {
    beforeAll(() => {
      spyOn(console, 'error');
    });

    it('moreOrEqual', () => {
      is.moreOrEqual(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Pass only Object, Array or String in the first paramenter.'
      );
    });

    it('lessOrEqual', () => {
      is.lessOrEqual(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Pass only Object, Array or String in the first paramenter.'
      );
    });

    it('exactSize', () => {
      is.exactSize(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Pass only Object, Array or String in the first paramenter.'
      );
    });

    it('run', () => {
      is.run(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.run(['17.123.123-1'], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.run(11111112, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );
    });

    it('alpha', () => {
      is.alpha(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.alpha([], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );
    });

    it('email', () => {
      is.email(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.email([], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );
    });

    it('ip', () => {
      is.email(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.email([], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );
    });

    it('url', () => {
      is.url(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );

      is.url([], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The given parameter must be an String.'
      );
    });
  });

  describe('`has` functions showgin console.error', () => {
    beforeAll(() => {
      spyOn(console, 'error');
    });

    it('someValues', () => {
      has.someValues(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The first paramameter must be an Array.'
      );

      has.someValues([123], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The second paramameter must be an Array.'
      );
    });
  });
});
