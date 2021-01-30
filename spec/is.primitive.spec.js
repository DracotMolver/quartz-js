const is = require('./../src/is');

describe('A collection of "is" primitive compare functions', () => {
  it('is.function', () => {
    expect(is.function(() => {})).toBeTrue();
    expect(is.function(function name() {})).toBeTrue();
    expect(is.function(this)).toBeFalse();
  });

  it('is.promise', () => {
    const promise = new Promise(() => {});

    const promiseThen = Promise.resolve({
      then: function () {
        return 'should be apromise';
      }
    });

    expect(is.promise(promise)).toBeTrue();
    expect(is.promise(promiseThen)).toBeTrue();
  });
});
