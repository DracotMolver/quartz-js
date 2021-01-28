const ArrayBuilder = require('./../src/arr/index');

describe('An Array function extensions', () => {
  beforeAll(() => {
    ArrayBuilder(Array);
  });

  it('[].between - a new array from the middle of the new array', () => {
    expect([].between()).toEqual([]);
    expect([1].between()).toEqual([1]);
    expect([1, 2].between()).toEqual([1, 2]);
    expect([1, 2, 3].between()).toEqual([2]);
    expect([1, 2, 3, 4].between()).toEqual([2, 3]);
    expect([1, 2, 3, 4, 5].between()).toEqual([2, 3, 4]);
    expect([1, 2, 3, 4, 5, 6].between(2)).toEqual([3, 4, 5]);
    expect([1, 2, 3, 4, 5, 6].between(2, 2)).toEqual([3, 4]);
    expect(() => [1, 2, 3, 4, 5, 6].between(3, 7)).toThrowError();
  });
});
