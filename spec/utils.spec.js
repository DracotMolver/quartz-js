const utils = require('./../src/utils');

describe('A collection of "utils" functions', () => {
  it('camelCase', done => {
    expect(utils.camelCase('user_name')).toEqual('userName');
    expect(utils.camelCase('user-name')).toEqual('userName');
    expect(utils.camelCase('user_middle-name')).toEqual(
      'userMiddleName'
    );
    expect(utils.camelCase('UserMiddle-name')).toEqual(
      'userMiddleName'
    );

    done();
  });

  it('obj2Arr', done => {
    const obj = {
      a: { a: 2 },
      b: '3',
      c: true,
      d: [4]
    };

    const arr = [
      { a: { a: 2 } },
      { b: '3' },
      { c: true },
      { d: [4] }
    ];

    expect(utils.obj2Arr(obj)).toEqual(arr);

    done();
  });

  it('compress', done => {
    const value = [
      {
        name: 'AAA',
        age: 23,
        email: 'email@test.cl'
      },
      {
        name: 'SSS',
        age: 60,
        email: 'email@test.cl'
      },
      {
        name: 'DDD',
        age: 13,
        email: 'email@test.cl'
      }
    ];

    const obj = {
      AAA: 'email@test.cl',
      SSS: 'email@test.cl',
      DDD: 'email@test.cl'
    };

    const arr = [
      { AAA: 'email@test.cl' },
      { SSS: 'email@test.cl' },
      { DDD: 'email@test.cl' }
    ];

    expect(utils.compress(value, 'name', 'email').array()).toEqual(
      arr
    );
    expect(utils.compress(value, 'name', 'email').object()).toEqual(
      obj
    );

    done();
  });

  it('clone', done => {
    const arr = utils.clone([1, 2, 3, 4], [2, 10, 5]);
    const obj = utils.clone(
      { name: 'diego', age: 29 },
      { name: 'John', email: 'test@test.cl' }
    );

    expect(obj).toEqual({
      name: 'John',
      age: 29,
      email: 'test@test.cl'
    });

    expect(arr).toEqual([1, 2, 3, 4, 2, 10, 5]);

    done();
  });


  // //   // describe('Testing pipe function', () => {
  // //   //   it('Executes several functions for one value', () => {
  // //   //     const multiply = by => value => value * by;
  // //   //     const add = addValue => value => value + addValue;
  // //   //     const isMoreThan = moreThan => value => value > moreThan;

  // //   //     const result = pipe(
  // //   //       multiply(5),
  // //   //       add(10),
  // //   //       isMoreThan(20)
  // //   //     )(5);

  // //   //     expect(result).toBe(true);
  // //   //   });

  // //   //   it('Executes several functions for more than one values', () => {
  // //   //     const multiply = (valueA, valueB) => valueA * valueB;
  // //   //     const add = addValue => value => value + addValue;
  // //   //     const square = of => value => value ** of;

  // //   //     const result = pipe(
  // //   //       multiply,
  // //   //       add(10),
  // //   //       square(4)
  // //   //     )(5, 10);

  // //   //     expect(result).toEqual(12960000);
  // //   //   });
  // //   // });

  // //   // describe('Testing pipValues function', () => {
  // //   //   it('Executes the same function to several values', () => {
  // //   //     const multiply = by => value => value * by;

  // //   //     const result = pipeValues(multiply(5))(10, 5, 20, 4);

  // //   //     expect(result).toEqual([20, 100, 25, 50]);
  // //   //   });
  // //   // });

  // //   // describe('Testing rmAttrObject function', () => {
  // //   //   it('Removes/Delete a property from an object (key: values)', () => {
  // //   //     const object = {
  // //   //       age: 22,
  // //   //       names: {
  // //   //         firstName: 'John',
  // //   //         lastName: 'Doeh'
  // //   //       },
  // //   //       email: 'diego@gmail.com',
  // //   //       pets: false,
  // //   //       phoneNumber: [
  // //   //         12345678,
  // //   //         98765431
  // //   //       ],
  // //   //       nestedOjb: {
  // //   //         a: {
  // //   //           z: 'zValue'
  // //   //         },
  // //   //         y: {
  // //   //           z: {
  // //   //             h: 'hValue'
  // //   //           },
  // //   //           x: [1, 2, 3]
  // //   //         }
  // //   //       }
  // //   //     };

  // //   //     const cleanedObject = rmAttrObject(object, ['nestedOjb', 'y', 'z']);
  // //   //     expect(cleanedObject).toEqual({
  // //   //       age: 22,
  // //   //       names: {
  // //   //         firstName: 'John',
  // //   //         lastName: 'Doeh'
  // //   //       },
  // //   //       email: 'diego@gmail.com',
  // //   //       pets: false,
  // //   //       phoneNumber: [
  // //   //         12345678,
  // //   //         98765431
  // //   //       ],
  // //   //       nestedOjb: {
  // //   //         a: {
  // //   //           z: 'zValue'
  // //   //         },
  // //   //         y: {
  // //   //           x: [1, 2, 3]
  // //   //         }
  // //   //       }
  // //   //     })
  // //   //   });
  // //   // });

  // //   // describe('Testing nestedObj funcion', () => {
  // //   //   it('Creates a nested object based on a list of keys', () => {
  // //   //     // only the object
  // //   //     expect(nestedObj('a.b.c.d')).toEqual({ a: { b: { c: { d: {} } } } });
  // //   //   });
  // //   //   it('Creates a nested object based on a list of keys and assing a value', () => {
  // //   //     // a nested object with differents types of values
  // //   //     expect(nestedObj('a.b.c', [])).toEqual({ a: { b: { c: [] } } });
  // //   //     expect(nestedObj('a.b.c', 'hola!')).toEqual({ a: { b: { c: 'hola!' } } });
  // //   //     expect(nestedObj('a.b.c', 23)).toEqual({ a: { b: { c: 23 } } });
  // //   //   });
  // //   // });
});
