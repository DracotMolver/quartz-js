const {
  addArrayMethods,
  BETWEEN,
  UNION
} = require('./../src/arr/index');

describe('An Array function extensions', () => {
  beforeAll(() => {
    addArrayMethods(BETWEEN | UNION);
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
    expect(
      [1, 2, 3, 4, 5, 6].between(2, 2).map(value => value * 2)
    ).toEqual([6, 8]);
    expect(() => [1, 2, 3, 4, 5, 6].between(3, 7)).toThrowError();
  });

  it('[].union - a new array with uniques values from several given arrays', () => {
    expect([].union()).toEqual([]);
    expect([1].union()).toEqual([1]);
    expect([1, 2].union()).toEqual([1, 2]);
    expect([1, 2, 3].union([2, 5, 6, 2, 3])).toEqual([1, 2, 3, 5, 6]);
    expect(
      [1, 2, 3].union([2, 5, 6, 2, 3], [4, 2, 5, 3, 6, 7])
    ).toEqual([1, 2, 3, 5, 6, 4, 7]);
  });
});
