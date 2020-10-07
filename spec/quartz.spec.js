const has = require('./../src/has');
const is = require('./../src/is');

describe('General situations using Quartz', () => {
  describe('`is` functions showing console.error', () => {
    beforeAll(() => {
      spyOn(console, 'error');
    });

    it('moreOrEqual', () => {
      is.moreOrEqual(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Only pass an Object, an Array or an String at the first parameter.'
      );
    });

    it('lessOrEqual', () => {
      is.lessOrEqual(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Only pass an Object, an Array or an String at the first parameter.'
      );
    });

    it('exactSize', () => {
      is.exactSize(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'Only pass an Object, an Array or an String at the first parameter.'
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

  describe('`has` functions showing console.error', () => {
    beforeAll(() => {
      spyOn(console, 'error');
    });

    it('someValues', () => {
      has.someValues(123, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The first parameter must be an Array.'
      );

      has.someValues([123], 3);
      expect(console.error).toHaveBeenCalledWith(
        'The second parameter must be an Array.'
      );
    });

    it('singleValue', () => {
      has.singleValue([123], [3, 2, 3]);
      expect(console.error).toHaveBeenCalledWith(
        'The first parameter can only be: String, Number or Boolean.'
      );

      has.singleValue(3, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The second parameter must be an Array.'
      );
    });

    it('everyValue', () => {
      has.everyValue([123], [3, 2, 3]);
      expect(console.error).toHaveBeenCalledWith(
        'The first parameter can only be: String, Number or Boolean.'
      );

      has.everyValue(3, 3);
      expect(console.error).toHaveBeenCalledWith(
        'The second parameter must be an Array.'
      );
    });
  });
});
