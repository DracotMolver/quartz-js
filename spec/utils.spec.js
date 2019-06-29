const {
  OBJECT,
  ARRAY,
  util,
} = require('../src');


describe('A suit of stand alone utils', () => {
  it('lowerCamelCase', () => {
    expect(util.lowerCamelCase('user_name')).toEqual('userName');
    expect(util.lowerCamelCase('user-name')).toEqual('userName');
    expect(util.lowerCamelCase('user_middle-name')).toEqual('userMiddleName');
  });

  it('obj2Arr', () => {
    const obj = {
      a: { a: 2 },
      b: '3',
      c: true,
      d: [4],
    };

    const arr = [
      { a: { a: 2 } },
      { b: '3' },
      { c: true },
      { d: [4] },
    ]

    expect(util.obj2Arr(obj)).toEqual(arr);
  });

  it('compress', () => {
    const value = [{
      name: 'AAA',
      age: 23,
      email: 'email@test.cl'
    }, {
      name: 'SSS',
      age: 60,
      email: 'email@test.cl'
    }, {
      name: 'DDD',
      age: 13,
      email: 'email@test.cl'
    }];

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

    expect(util.compress(value, 'name', 'email')).toEqual(arr);
    expect(util.compress(value, 'name', 'email', OBJECT)).toEqual(obj);
  });

  it('clone an Array or an Object', () => {
    const arr = [1, 2, 3, 4];
    const obj = {
      name: 'diego',
      age: 29
    };

    expect(util.clone(OBJECT, obj, { name: 'John', email: 'test@test.cl' }))
      .toEqual({
        name: 'John',
        age: 29,
        email: 'test@test.cl'
      });

    expect(util.clone(ARRAY, arr, [2, 10, 5]))
      .toEqual([1, 2, 3, 4, 2, 10, 5]);
  });

  //     it('One or more keys are in a Object', () => {
  //       const object = {
  //         name: 'John Doe',
  //         age: 20,
  //         married: false,
  //         other: {
  //           email: 'joahn@doe.cl'
  //         }
  //       };

  //       // Testing one value
  //       let value = isIn(object, 'name');
  //       expect(value).toBe(true);

  //       // Testing two values
  //       value = isIn(object, 'married', 'email');
  //       expect(value).toBe(true);
  //     });

  //     it('Has exactly the specified amount of elements', () => {
  //       const object = {
  //         name: 'John Doe',
  //         age: 20,
  //         married: false,
  //         other: {
  //           email: 'joahn@doe.cl'
  //         }
  //       };

  //       let size = isExactSize(object, 4);
  //       expect(size).toBe(true);
  //       size = isExactSize(object, 5);
  //       expect(size).toBe(false);
  //       size = isExactSize(object, 3);
  //       expect(size).toBe(false);
  //     });

  //     it('It is greater and equal than the given value', () => {
  //       const object = {
  //         name: 'John Doe',
  //         age: 20,
  //         married: false,
  //         other: {
  //           email: 'joahn@doe.cl'
  //         }
  //       };

  //       let size = isMoreAndEqual(object, 4);
  //       expect(size).toBe(true);
  //       size = isMoreAndEqual(object, 5);
  //       expect(size).toBe(false);
  //       size = isMoreAndEqual(object, 3);
  //       expect(size).toBe(true);
  //     });
  //   });

  //   // describe('Testing pipe function', () => {
  //   //   it('Executes several functions for one value', () => {
  //   //     const multiply = by => value => value * by;
  //   //     const add = addValue => value => value + addValue;
  //   //     const isMoreThan = moreThan => value => value > moreThan;

  //   //     const result = pipe(
  //   //       multiply(5),
  //   //       add(10),
  //   //       isMoreThan(20)
  //   //     )(5);

  //   //     expect(result).toBe(true);
  //   //   });

  //   //   it('Executes several functions for more than one values', () => {
  //   //     const multiply = (valueA, valueB) => valueA * valueB;
  //   //     const add = addValue => value => value + addValue;
  //   //     const square = of => value => value ** of;

  //   //     const result = pipe(
  //   //       multiply,
  //   //       add(10),
  //   //       square(4)
  //   //     )(5, 10);

  //   //     expect(result).toEqual(12960000);
  //   //   });
  //   // });

  //   // describe('Testing pipValues function', () => {
  //   //   it('Executes the same function to several values', () => {
  //   //     const multiply = by => value => value * by;

  //   //     const result = pipeValues(multiply(5))(10, 5, 20, 4);

  //   //     expect(result).toEqual([20, 100, 25, 50]);
  //   //   });
  //   // });

  //   // describe('Testing rmAttrObject function', () => {
  //   //   it('Removes/Delete a property from an object (key: values)', () => {
  //   //     const object = {
  //   //       age: 22,
  //   //       names: {
  //   //         firstName: 'John',
  //   //         lastName: 'Doeh'
  //   //       },
  //   //       email: 'diego@gmail.com',
  //   //       pets: false,
  //   //       phoneNumber: [
  //   //         12345678,
  //   //         98765431
  //   //       ],
  //   //       nestedOjb: {
  //   //         a: {
  //   //           z: 'zValue'
  //   //         },
  //   //         y: {
  //   //           z: {
  //   //             h: 'hValue'
  //   //           },
  //   //           x: [1, 2, 3]
  //   //         }
  //   //       }
  //   //     };

  //   //     const cleanedObject = rmAttrObject(object, ['nestedOjb', 'y', 'z']);
  //   //     expect(cleanedObject).toEqual({
  //   //       age: 22,
  //   //       names: {
  //   //         firstName: 'John',
  //   //         lastName: 'Doeh'
  //   //       },
  //   //       email: 'diego@gmail.com',
  //   //       pets: false,
  //   //       phoneNumber: [
  //   //         12345678,
  //   //         98765431
  //   //       ],
  //   //       nestedOjb: {
  //   //         a: {
  //   //           z: 'zValue'
  //   //         },
  //   //         y: {
  //   //           x: [1, 2, 3]
  //   //         }
  //   //       }
  //   //     })
  //   //   });
  //   // });

  //   // describe('Testing nestedObj funcion', () => {
  //   //   it('Creates a nested object based on a list of keys', () => {
  //   //     // only the object
  //   //     expect(nestedObj('a.b.c.d')).toEqual({ a: { b: { c: { d: {} } } } });
  //   //   });
  //   //   it('Creates a nested object based on a list of keys and assing a value', () => {
  //   //     // a nested object with differents types of values
  //   //     expect(nestedObj('a.b.c', [])).toEqual({ a: { b: { c: [] } } });
  //   //     expect(nestedObj('a.b.c', 'hola!')).toEqual({ a: { b: { c: 'hola!' } } });
  //   //     expect(nestedObj('a.b.c', 23)).toEqual({ a: { b: { c: 23 } } });
  //   //   });
  //   // });
});
