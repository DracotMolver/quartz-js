const is = require('./../src/is');

xdescribe('A collectin of "is not" functions', () => {
  it('not.ip', () => {
    expect(is.not.ip('25x.2s5.255.255')).toBeTrue();
    expect(is.not.ip('288.0.1.0')).toBeTrue();
    expect(is.not.ip('288.999.999.999')).toBeTrue();
    expect(is.not.ip('127.500.0.1')).toBeTrue();
    expect(is.not.ip('12a.88.99.0')).toBeTrue();
  });

  it('not.url', () => {
    expect(is.not.url('http//:www.exampledomain.com')).toBeTrue();
    expect(is.not.url('shttp://exampledomain.com')).toBeTrue();
    expect(is.not.url('http://8080:exampledomain.com:8080')).toBe(
      true
    );
    expect(is.not.url('https/:www.exampledomain.com')).toBeTrue();
    expect(is.not.url('mailto:xalphase@ampledomain.cl')).toBeTrue();
    expect(is.not.url('sftp:/www.exampledomain.com')).toBeTrue();
  });

  it('not.nan', () => {
    expect(is.not.nan(123)).toBeTrue();
    expect(is.not.nan(Number('123'))).toBeTrue();
  });

  it('not.alpha', () => {
    expect(is.not.alpha('123')).toBeTrue();
    expect(is.not.alpha(String(123))).toBeTrue();
    expect(is.not.alpha('123412`0.-,')).toBeTrue();
  });

  it('not.number', () => {
    expect(is.not.number('1a234')).toBeTrue();
    expect(is.not.number('hola')).toBeTrue();
    expect(is.not.number(NaN)).toBeTrue();
    expect(is.not.number(undefined)).toBeTrue();
    expect(is.not.number(null)).toBeTrue();
  });
});
