const {
  has
} = require('../src');

describe('A collection of "has" functions', () => {
  it('someValues', done => {
    expect(has.someValues([1, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();
    expect(has.someValues([4, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();
    done();
  });
});
