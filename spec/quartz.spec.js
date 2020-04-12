const is = require('./../src/is');

describe('General situations using Quartz', () => {
  // it('is fobidden to overwrite `is`, `has` and `tools`', () => {
  //   expect(() => (is.ip = 'overwrite')).toThrow();
  //   expect(() => (is = 'overwrite')).toThrow();
  // });

  it('`is.moreOrEqual` manages some console.error', () => {
    spyOn(console, 'error');
    is.moreOrEqual(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'Pass only Object, Array or String in the first paramenter.'
    );
  });

  it('`is.lessOrEqual` manages some console.error', () => {
    spyOn(console, 'error');
    is.lessOrEqual(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'Pass only Object, Array or String in the first paramenter.'
    );
  });

  it('`is.exactSize` manages some console.error', () => {
    spyOn(console, 'error');
    is.exactSize(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'Pass only Object, Array or String in the first paramenter.'
    );
  });

  it('`is.run` manages some console.error', () => {
    spyOn(console, 'error');
    is.run(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.run(['17.123.123-1'], 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.run(11111112, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
  });

  it('`is.alpha` manages some console.error', () => {
    spyOn(console, 'error');
    is.alpha(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.alpha([], 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
  });

  it('`is.email` manages some console.error', () => {
    spyOn(console, 'error');
    is.email(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.email([], 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
  });

  it('`is.ip` manages some console.error', () => {
    spyOn(console, 'error');
    is.email(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.email([], 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
  });

  it('`is.url` manages some console.error', () => {
    spyOn(console, 'error');
    is.url(123, 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
    is.url([], 3);
    expect(console.error).toHaveBeenCalledWith(
      'The given parameter must be an String.'
    );
  });
});
