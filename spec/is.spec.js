const is = require("./../src/is");

describe('A collectin of "is" functions', () => {
  //   describe('`is` functions', () => {
  //     it('Is `into` and Array or Object the specified value(s)', () => {
  //       const object = {
  //         name: 'John Doe',
  //         age: 20,
  //         married: false,
  //         other: {
  //           email: 'joahn@doe.cl'
  //         }
  //       };

  // const array = ['hello', 'hola', 20, true, 'hallo', 'priviet', {}];

  //       // array test
  //       expect(is.into(array, 20)).toBe(true);
  //       expect(is.into(array, 'priviet', 20)).toBe(true);

  //       // object testing
  //       expect(is.into(object, 'name')).toBe(true);
  //       expect(is.into(object, 'married', 'email')).toBe(true);

  //       // Testing not allowed values
  //       expect(() => is.into(array, {})).toThrow();
  //     });

  //     it('Is truthy the given values', () => {
  //       expect(is.truthty({ a: 'hello' })).toBe(true);
  //       expect(is.truthty('hello')).toBe(true);
  //       expect(is.truthty([1, 2])).toBe(true);
  //       expect(is.truthty(true)).toBe(true);
  //       expect(is.truthty(3)).toBe(true);
  //       //
  //       expect(is.truthty(NaN)).toBe(false);
  //       expect(is.truthty([])).toBe(false);
  //       expect(is.truthty({})).toBe(false);
  //       expect(is.truthty(undefined)).toBe(false);
  //       expect(is.truthty('')).toBe(false);
  //       expect(is.truthty(false)).toBe(false);
  //       expect(is.truthty(0)).toBe(false);
  //     });

  //     it('Is falsy the given values', () => {
  //       expect(is.falsy({ a: 'hello' })).toBe(false);
  //       expect(is.falsy('hello')).toBe(false);
  //       expect(is.falsy([1, 2])).toBe(false);
  //       expect(is.falsy(true)).toBe(false);
  //       expect(is.falsy(3)).toBe(false);
  //       //
  //       expect(is.falsy(NaN)).toBe(true);
  //       expect(is.falsy([])).toBe(true);
  //       expect(is.falsy({})).toBe(true);
  //       expect(is.falsy(undefined)).toBe(true);
  //       expect(is.falsy('')).toBe(true);
  //       expect(is.falsy(false)).toBe(true);
  //       expect(is.falsy(0)).toBe(true);;
  //     });

  //     it('Is NaN `nan`', () => {
  //       expect(is.nan(NaN)).toBe(true);
  //       expect(is.nan(Number('123A'))).toBe(true);
  //     });

  //     it('Is RUN (run)', () => {
  //       expect(is.run('18150581-8')).toBe(true);
  //       expect(is.run('19423287-k')).toBe(true);
  //       expect(is.run('117945138')).toBe(true);
  //       expect(is.run('24.634.452-3')).toBe(true);
  //     });

  //     describe('Checking the length of the elements', () => {
  const object = {
    name: "John Doe",
    age: 20,
    married: false,
    other: {
      email: "joahn@doe.cl",
    },
  }; // length:4

  const array = ["hello", "hola", 20, true, "hallo", "priviet", {}]; // length:7
  const string = "hellow world"; // length:12

  it("exactSize", () => {
    expect(is.exactSize(object, 4)).toBe(true);
    expect(is.exactSize(array, 7)).toBe(true);
    expect(is.exactSize(string, 12)).toBe(true);
    //
    expect(is.exactSize(object, 2)).toBe(false);
    expect(is.exactSize(array, 10)).toBe(false);
    expect(is.exactSize(string, 9)).toBe(false);

    // Testing not allowed values
    expect(() => is.exactSize(5, 5)).toThrow();
  });

  it("moreOrEqual", (done) => {
    expect(is.moreOrEqual(object, 4)).toBe(true);
    expect(is.moreOrEqual(array, 5)).toBe(true);
    expect(is.moreOrEqual(string, 12)).toBe(true);
    //
    expect(is.moreOrEqual(object, 10)).toBe(false);
    expect(is.moreOrEqual(array, 12)).toBe(false);
    expect(is.moreOrEqual(string, 13)).toBe(false);

    // Testing not allowed values
    expect(() => is.moreOrEqual(5, 5)).toThrow();

    done();
  });

  it("Is `lessOrEqual` than the given value", (done) => {
    expect(is.lessOrEqual(object, 10)).toBe(true);
    expect(is.lessOrEqual(array, 7)).toBe(true);
    expect(is.lessOrEqual(string, 20)).toBe(true);
    //
    expect(is.lessOrEqual(object, 1)).toBe(false);
    expect(is.lessOrEqual(array, 2)).toBe(false);
    expect(is.lessOrEqual(string, 10)).toBe(false);

    // Testing not allowed values
    expect(() => is.lessOrEqual(5, 5)).toThrow();

    done();
  });

  //     describe('Checking differents commons validations', () => {
  //       it('Is a valid `email`', () => {
  //         expect(is.email('very.common@example.com')).toBe(true);
  //         expect(is.email('disposable.style.email.with + symbol@example.com')).toBe(true);
  //         expect(is.email('other.email -with-hyphen@example.com')).toBe(true);
  //         expect(is.email('fully - qualified - domain@example.com')).toBe(true);
  //         expect(is.email('user.name + tag + sorting@example.com')).toBe(true);
  //         expect(is.email('x@example.com')).toBe(true);
  //         expect(is.email('"very.(),:;<>[]\\".VERY.\"very@\\ \"very\".unusual"@strange.example.com')).toBe(true);
  //         expect(is.email('example - indeed@strange-example.com')).toBe(true);
  //         expect(is.email('admin@mailserver1')).toBe(true);
  //         expect(is.email('#!$ %& \'*+-/=?^_`{}|~@example.org')).toBe(true);
  //         expect(is.email('simple@example.com')).toBe(true);
  //         expect(is.email('" "@example.org')).toBe(true);
  //         expect(is.email('user@[2001:DB8::1]')).toBe(true);
  //         expect(is.email('example@s.example')).toBe(true);
  //       });

  //       it('Allows only words `alpha`', () => {
  //         expect(is.alpha('hola')).toBe(true);
  //         expect(is.alpha('John Doe')).toBe(true);
  //         expect(is.alpha('John Doe día')).toBe(true);
  //         expect(is.alpha('John Doe Ño')).toBe(true);
  //       });

  //       it('Allows only numbers `number`', () => {
  //         expect(is.number('1234')).toBe(true);
  //         expect(is.number('12.34')).toBe(true);
  //         expect(is.number('12,34')).toBe(true);
  //         expect(is.number('$12,34')).toBe(true);
  //         expect(is.number('2')).toBe(true);
  //         expect(is.number(2.2)).toBe(true);
  //         expect(is.number(2)).toBe(true);
  //       });
  //     });
  //   });
  // });

  //     // it('Is not a valid email', () => {
  //     //   expect(isNot(email('Abc.example.com'))).toBe(true);
  //     //   expect(isNot(email('A@b@c@example.com'))).toBe(true);
  //     //   expect(isNot(email('a"b(c)d,e:f;g<h>i[j\k]l@example.com'))).toBe(true);
  //     //   expect(isNot(email('just"not"right@example.com'))).toBe(true);
  //     //   expect(isNot(email('this is"not\allowed@example.com'))).toBe(true);
  //     //   expect(isNot(email('this\ still\"not\\allowed@example.com'))).toBe(true);
  //     //   expect(isNot(email('1234567890123456789012345678901234567890123456789012345678901234+x@example.com'))).toBe(true);
  //     //   expect(isNot(email('john..doe@example.com'))).toBe(true);
  //     //   expect(isNot(email('john.doe@example..com'))).toBe(true);
  //     // });

  //   //         it('Is not Allows only letters', () => {
  //   //             expect(isNot(alpha('John Doe234'))).toBe(true);
  //   //             expect(isNot(alpha('123John Doe234'))).toBe(true);
  //   //             expect(isNot(alpha('123234'))).toBe(true);
  //   //             expect(isNot(alpha(123234))).toBe(true);
  //   //         });
  //   //     });

  //   //     describe('number function', () => {

  //   //         it('Is not Allows only numbers', () => {
  //   //             expect(isNot(alpha('John Doe234'))).toBe(true);
  //   //             expect(isNot(alpha('123John Doe234'))).toBe(true);
  //   //             expect(isNot(alpha('123234', true))).toBe(true);
  //   //             expect(isNot(alpha(123234, false))).toBe(true);
  //   //         });
});
