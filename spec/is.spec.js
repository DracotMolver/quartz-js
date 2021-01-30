const is = require('./../src/is');

describe('A collectin of "is" functions', () => {
  it('ip', () => {
    expect(is.ip('255.255.255.255')).toBeTrue();
    expect(is.ip('0.0.0.0')).toBeTrue();
    expect(is.ip('127.0.0.1')).toBeTrue();
    expect(is.ip('192.88.99.0')).toBeTrue();
  });

  it('url', () => {
    expect(is.url('http://www.exampledomain.com')).toBeTrue();
    expect(is.url('http://exampledomain.com')).toBeTrue();
    expect(is.url('http://exampledomain.com:8080')).toBeTrue();
    expect(is.url('https://www.exampledomain.com')).toBeTrue();
    expect(is.url('mailto::xalphase@ampledomain.cl')).toBeTrue();
    expect(is.url('ftp://www.exampledomain.com')).toBeTrue();
  });

  it('truthy', () => {
    expect(is.truthy({ a: 'hello' })).toBeTrue();
    expect(is.truthy('hello')).toBeTrue();
    expect(is.truthy([1, 2])).toBeTrue();
    expect(is.truthy(true)).toBeTrue();
    expect(is.truthy(3)).toBeTrue();
    //
    expect(is.truthy(NaN)).toBeFalse();
    expect(is.truthy([])).toBeFalse();
    expect(is.truthy({})).toBeFalse();
    expect(is.truthy(undefined)).toBeFalse();
    expect(is.truthy('')).toBeFalse();
    expect(is.truthy(false)).toBeFalse();
    expect(is.truthy(0)).toBeFalse();
  });

  it('falsy', () => {
    expect(is.falsy({ a: 'hello' })).toBeFalse();
    expect(is.falsy('hello')).toBeFalse();
    expect(is.falsy([1, 2])).toBeFalse();
    expect(is.falsy(true)).toBeFalse();
    expect(is.falsy(3)).toBeFalse();
    //
    expect(is.falsy(NaN)).toBeTrue();
    expect(is.falsy([])).toBeTrue();
    expect(is.falsy({})).toBeTrue();
    expect(is.falsy(undefined)).toBeTrue();
    expect(is.falsy('')).toBeTrue();
    expect(is.falsy(false)).toBeTrue();
    expect(is.falsy(0)).toBeTrue();
  });

  it('nan', () => {
    expect(is.nan(NaN)).toBeTrue();
    expect(is.nan(Number('123A'))).toBeTrue();
  });

  it('R.U.N (run) - Chile ID', () => {
    expect(is.run('18150581-8')).toBeTrue();
    expect(is.run('19423287-k')).toBeTrue();
    expect(is.run('117945138')).toBeTrue();
    expect(is.run('24.634.452-3')).toBeTrue();
  });

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
    expect(is.exactSize(object, 4)).toBeTrue();
    expect(is.exactSize(array, 7)).toBeTrue();
    expect(is.exactSize(string, 12)).toBeTrue();
    //
    expect(is.exactSize(object, 2)).toBeFalse();
    expect(is.exactSize(array, 10)).toBeFalse();
    expect(is.exactSize(string, 9)).toBeFalse();
  });

  it('moreOrEqual', () => {
    expect(is.moreOrEqual(object, 4)).toBeTrue();
    expect(is.moreOrEqual(array, 5)).toBeTrue();
    expect(is.moreOrEqual(string, 12)).toBeTrue();
    expect(is.moreOrEqual('hello', 3, true)).toBeTrue();
    //
    expect(is.moreOrEqual(object, 10)).toBeFalse();
    expect(is.moreOrEqual(array, 12)).toBeFalse();
    expect(is.moreOrEqual(string, 13)).toBeFalse();
    expect(is.moreOrEqual('hello', 5, true)).toBeFalse();
  });

  it('lessOrEqual', () => {
    expect(is.lessOrEqual(object, 10)).toBeTrue();
    expect(is.lessOrEqual(array, 7)).toBeTrue();
    expect(is.lessOrEqual(string, 20)).toBeTrue();
    expect(is.lessOrEqual('hello', 7, true)).toBeTrue();
    //
    expect(is.lessOrEqual(object, 1)).toBeFalse();
    expect(is.lessOrEqual(array, 2)).toBeFalse();
    expect(is.lessOrEqual(string, 10)).toBeFalse();
    expect(is.lessOrEqual('hello', 2, true)).toBeFalse();
  });

  it('email', () => {
    expect(is.email('very.common@example.com')).toBeTrue();
    expect(
      is.email('disposable.style.email.with + symbol@example.com')
    ).toBeTrue();
    expect(is.email('other.email -with-hyphen@example.com')).toBe(
      true
    );
    expect(is.email('fully - qualified - domain@example.com')).toBe(
      true
    );
    expect(is.email('user.name + tag + sorting@example.com')).toBe(
      true
    );
    expect(is.email('x@example.com')).toBeTrue();
    expect(
      is.email(
        '"very.(),:;<>[]\\".VERY."very@\\ "very".unusual"@strange.example.com'
      )
    ).toBeTrue();
    expect(is.email('example - indeed@strange-example.com')).toBe(
      true
    );
    expect(is.email('admin@mailserver1')).toBeTrue();
    expect(is.email("#!$ %& '*+-/=?^_`{}|~@example.org")).toBeTrue();
    expect(is.email('simple@example.com')).toBeTrue();
    expect(is.email('" "@example.org')).toBeTrue();
    expect(is.email('user@[2001:DB8::1]')).toBeTrue();
    expect(is.email('example@s.example')).toBeTrue();
  });

  it('alpha', () => {
    expect(is.alpha('hola')).toBeTrue();
    expect(is.alpha('John Doe')).toBeTrue();
    expect(is.alpha('John Doe día')).toBeTrue();
    expect(is.alpha('John Doe Ño')).toBeTrue();

    expect(is.alpha('John Doe 3')).toBeFalse();
  });

  it('number', () => {
    expect(is.number('1234')).toBeTrue();
    expect(is.number('12.34')).toBeTrue();
    expect(is.number('12,34')).toBeTrue();
    expect(is.number('$12,34')).toBeTrue();
    expect(is.number('2')).toBeTrue();
    expect(is.number(2.2)).toBeTrue();
    expect(is.number(2)).toBeTrue();
  });

  it('password', () => {
    // set a different policy for different passwords
    let pwdMatcher = is.password({
      minLength: 7,
      maxLength: 10,
      minAlpha: 2,
      minNumber: 5,
      minSameChar: 0,
      allowSpace: false
    });

    // success
    expect(pwdMatcher('di12345e')).toBeTrue();
    expect(pwdMatcher('di12345eh')).toBeTrue();
    expect(pwdMatcher('di12345')).toBeTrue();
    expect(pwdMatcher('d@12345')).toBeTrue();
    expect(pwdMatcher('d@12345')).toBeTrue();
    // mistakes
    expect(pwdMatcher('d12345')).toEqual([
      {
        rule: 'minLength',
        value: false
      },
      {
        rule: 'minAlpha',
        value: false
      }
    ]);

    expect(pwdMatcher('diego123')).toEqual([
      {
        rule: 'minNumber',
        value: false
      }
    ]);

    expect(pwdMatcher('di 12345')).toEqual([
      {
        rule: 'allowSpace',
        value: false
      }
    ]);

    // Allowing space
    pwdMatcher = is.password({
      minLength: 7,
      maxLength: 10,
      minAlpha: 2,
      minNumber: 5,
      minSameChar: 0,
      allowSpace: true
    });

    expect(pwdMatcher('di 12345')).toBeTrue();
    expect(pwdMatcher('di12345')).toBeTrue();

    // min char
    pwdMatcher = is.password({
      minLength: 7,
      maxLength: 10,
      minAlpha: 2,
      minNumber: 5,
      minSameChar: 2,
      allowSpace: false
    });

    expect(pwdMatcher('dd12345')).toBeTrue();
    expect(pwdMatcher('di12345')).toEqual([
      {
        rule: 'minSameChar',
        value: false
      }
    ]);
  });
});
