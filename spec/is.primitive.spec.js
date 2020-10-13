const is = require('./../src/is');

describe('A collection of "is" primitive compare functions', () => {
  it('isFunction', () => {
    expect(is.function(() => {})).toBeTrue();
    expect(is.function(function name() {})).toBeTrue();
    expect(is.function(this)).toBeFalse();
  });
});
