const has = require('./../src/has');

describe('A collection of "has" functions', () => {
  it('someValues', done => {
    expect(has.someValues([1, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();
    expect(has.someValues([4, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();

    done();
  });

  it('someValue', done => {
    expect(() => has.someValue([1, 2, 3], [1, 5, 6, 3, 8])).toThrow();
    expect(() => has.someValue(3, 'hello')).toThrow();
    expect(has.someValue(4, [1, 5, 6, 3, 8])).toBeFalse();
    expect(has.someValue(6, [1, 5, 6, 3, 8])).toBeTrue();
    expect(
      has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo'])
    ).toBeTrue();

    done();
  });

  it('oneValue', done => {
    expect([1, 2, 3].filter(has.oneValue(2))).toEqual([2]);
    expect([1, 2, 3].filter(has.oneValue(6))).toEqual([]);

    done();
  });

  it('oneValue', done => {
    expect([1, 2, 3].filter(has.oneValue(2))).toEqual([2]);
    expect([1, 2, 3].filter(has.oneValue(6))).toEqual([]);

    done();
  });
});
