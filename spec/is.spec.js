const is = require('./../src/is');

describe('A collectin of "is" functions', () => {
  it('ip', () => {
    expect(is.ip('255.255.255.255')).toBe(true);
    expect(is.ip('0.0.0.0')).toBe(true);
    expect(is.ip('127.0.0.1')).toBe(true);
    expect(is.ip('192.88.99.0')).toBe(true);
  });

  it('url', () => {
    expect(is.url('http://www.exampledomain.com')).toBe(true);
    expect(is.url('http://exampledomain.com')).toBe(true);
    expect(is.url('http://exampledomain.com:8080')).toBe(true);
    expect(is.url('https://www.exampledomain.com')).toBe(true);
    expect(is.url('mailto::xalphase@ampledomain.cl')).toBe(true);
    expect(is.url('ftp://www.exampledomain.com')).toBe(true);
  });

  it('truthy', done => {
    expect(is.truthty({ a: 'hello' })).toBe(true);
    expect(is.truthty('hello')).toBe(true);
    expect(is.truthty([1, 2])).toBe(true);
    expect(is.truthty(true)).toBe(true);
    expect(is.truthty(3)).toBe(true);
    //
    expect(is.truthty(NaN)).toBe(false);
    expect(is.truthty([])).toBe(false);
    expect(is.truthty({})).toBe(false);
    expect(is.truthty(undefined)).toBe(false);
    expect(is.truthty('')).toBe(false);
    expect(is.truthty(false)).toBe(false);
    expect(is.truthty(0)).toBe(false);

    done();
  });

  it('falsy', () => {
    expect(is.falsy({ a: 'hello' })).toBe(false);
    expect(is.falsy('hello')).toBe(false);
    expect(is.falsy([1, 2])).toBe(false);
    expect(is.falsy(true)).toBe(false);
    expect(is.falsy(3)).toBe(false);
    //
    expect(is.falsy(NaN)).toBe(true);
    expect(is.falsy([])).toBe(true);
    expect(is.falsy({})).toBe(true);
    expect(is.falsy(undefined)).toBe(true);
    expect(is.falsy('')).toBe(true);
    expect(is.falsy(false)).toBe(true);
    expect(is.falsy(0)).toBe(true);
  });

  it('nan', done => {
    expect(is.nan(NaN)).toBe(true);
    expect(is.nan(Number('123A'))).toBe(true);

    done();
  });

  it('R.U.N (run) - Chile ID', done => {
    expect(is.run('18150581-8')).toBe(true);
    expect(is.run('19423287-k')).toBe(true);
    expect(is.run('117945138')).toBe(true);
    expect(is.run('24.634.452-3')).toBe(true);

    done();
  });

  //     describe('Checking the length of the elements', () => {
  const object = {
    name: 'John Doe',
    age: 20,
    married: false,
    other: {
      email: 'joahn@doe.cl'
    }
  }; // length:4

  const array = ['hello', 'hola', 20, true, 'hallo', 'priviet', {}]; // length:7
  const string = 'hellow world'; // length:12

  it('exactSize', () => {
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

  it('moreOrEqual', done => {
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

  it('lessOrEqual', done => {
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

  it('email', () => {
    expect(is.email('very.common@example.com')).toBe(true);
    expect(
      is.email('disposable.style.email.with + symbol@example.com')
    ).toBe(true);
    expect(is.email('other.email -with-hyphen@example.com')).toBe(
      true
    );
    expect(is.email('fully - qualified - domain@example.com')).toBe(
      true
    );
    expect(is.email('user.name + tag + sorting@example.com')).toBe(
      true
    );
    expect(is.email('x@example.com')).toBe(true);
    expect(
      is.email(
        '"very.(),:;<>[]\\".VERY."very@\\ "very".unusual"@strange.example.com'
      )
    ).toBe(true);
    expect(is.email('example - indeed@strange-example.com')).toBe(
      true
    );
    expect(is.email('admin@mailserver1')).toBe(true);
    expect(is.email("#!$ %& '*+-/=?^_`{}|~@example.org")).toBe(true);
    expect(is.email('simple@example.com')).toBe(true);
    expect(is.email('" "@example.org')).toBe(true);
    expect(is.email('user@[2001:DB8::1]')).toBe(true);
    expect(is.email('example@s.example')).toBe(true);
  });

  it('alpha', done => {
    expect(is.alpha('hola')).toBe(true);
    expect(is.alpha('John Doe')).toBe(true);
    expect(is.alpha('John Doe día')).toBe(true);
    expect(is.alpha('John Doe Ño')).toBe(true);

    done();
  });

  it('number', () => {
    expect(is.number('1234')).toBe(true);
    expect(is.number('12.34')).toBe(true);
    expect(is.number('12,34')).toBe(true);
    expect(is.number('$12,34')).toBe(true);
    expect(is.number('2')).toBe(true);
    expect(is.number(2.2)).toBe(true);
    expect(is.number(2)).toBe(true);
  });

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
});
