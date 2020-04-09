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

  it('number', done => {
    expect(is.number('1234')).toBe(true);
    expect(is.number('12.34')).toBe(true);
    expect(is.number('12,34')).toBe(true);
    expect(is.number('$12,34')).toBe(true);
    expect(is.number('2')).toBe(true);
    expect(is.number(2.2)).toBe(true);
    expect(is.number(2)).toBe(true);

    done();
  });

  it('password', done => {
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
    expect(pwdMatcher('di12345e')).toBe(true);
    expect(pwdMatcher('di12345eh')).toBe(true);
    expect(pwdMatcher('di12345')).toBe(true);
    expect(pwdMatcher('d@12345')).toBe(true);
    expect(pwdMatcher('d@12345')).toBe(true);
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

    expect(pwdMatcher('di 12345')).toBe(true);
    expect(pwdMatcher('di12345')).toBe(true);

    // min char
    pwdMatcher = is.password({
      minLength: 7,
      maxLength: 10,
      minAlpha: 2,
      minNumber: 5,
      minSameChar: 2,
      allowSpace: false
    });

    expect(pwdMatcher('dd12345')).toBe(true);
    expect(pwdMatcher('di12345')).toEqual([
      {
        rule: 'minSameChar',
        value: false
      }
    ]);

    done();
  });

  it('not.ip', done => {
    expect(is.not.ip('25x.2s5.255.255')).toBe(true);
    expect(is.not.ip('288.0.1.0')).toBe(true);
    expect(is.not.ip('288.999.999.999')).toBe(true);
    expect(is.not.ip('127.500.0.1')).toBe(true);
    expect(is.not.ip('12a.88.99.0')).toBe(true);

    done();
  });

  it('not.url', () => {
    expect(is.not.url('http//:www.exampledomain.com')).toBe(true);
    expect(is.not.url('shttp://exampledomain.com')).toBe(true);
    expect(is.not.url('http://8080:exampledomain.com:8080')).toBe(true);
    expect(is.not.url('https/:www.exampledomain.com')).toBe(true);
    expect(is.not.url('mailto:xalphase@ampledomain.cl')).toBe(true);
    expect(is.not.url('sftp:/www.exampledomain.com')).toBe(true);
  });
});
