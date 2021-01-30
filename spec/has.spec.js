const has = require('./../src/has');

xdescribe('A collection of "has" functions', () => {
  it('everyValue - Normal Array no filter and map', () => {
    expect(has.everyValue(1, [1, 5, 6, 3, 8])).toBeFalse();
    expect(has.everyValue(true, [true, true, true])).toBeTrue();

    expect(() => has.everyValue(1, 1)).toThrowError(
      'The second parameter must be an Array.'
    );
  });

  it('someValues - Normal Array no filter and map', () => {
    expect(has.someValues([1, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();
    expect(has.someValues([4, 2, 3], [1, 5, 6, 3, 8])).toBeTrue();

    expect(has.someValues(1, [1, 5, 6, 3, 8])).toBeUndefined();
  });

  it('singleValue - Normal Array no filter and map', () => {
    expect(has.singleValue(4, [1, 5, 6, 3, 8])).toBeFalse();
    expect(has.singleValue(4, [1, 5, 6, 3, 8])).toBeFalse();
    expect(
      has.singleValue('hello', ['hello', 'priviet', 'hola', 'hallo'])
    ).toBeTrue();

    expect(has.singleValue({}, [1, 5, 6, 3, 8])).toThrowError();
    expect(
      has.singleValue([1, 2, 3], [1, 5, 6, 3, 8])
    ).toThrowError();
  });

  it('oneValue - Normal Array with filter and map', () => {
    expect([1, 2, 3].filter(has.oneValue(2))).toEqual([2]);
    expect([1, 2, 3].filter(has.oneValue(6))).toEqual([]);
  });

  it('valueByKey - Array of Objects', () => {
    expect(
      [{ id: 1 }, { id: 2 }, { id: 3 }].filter(
        has.valueByKey('id', 3)
      )
    ).toEqual([{ id: 3 }]);
  });

  it('valuesByKeys - Array of Objects', () => {
    expect(
      [
        { id: 1, name: 'Anna', age: 20, city: 'santiago' },
        { id: 2, name: 'diego', age: 30, city: 'iowa' },
        { id: 3, name: 'drake', age: 20, city: 'puerto' },
        { id: 4, name: 'carl', age: 20, city: 'puerto' }
      ].filter(has.valuesByKeys(['age', 'city'], [20, 'puerto']))
    ).toEqual([
      { id: 3, name: 'drake', age: 20, city: 'puerto' },
      { id: 4, name: 'carl', age: 20, city: 'puerto' }
    ]);
  });

  it('unique -  Array of Objects', () => {
    expect(
      [
        { name: 'john', age: 0 },
        { name: 'dee', age: 20 }
      ].map(has.unique('age'))
    ).toEqual([0, 20]);
  });
});
