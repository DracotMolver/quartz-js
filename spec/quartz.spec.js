const is = require('./../src/is');

describe('General situations using Quartz', () => {
  it('is fobidden to overwrite `is`, `has` and `tools`', () => {
    expect(() => (is.ip = 'overwrite')).toThrow();
    expect(() => (is = 'overwrite')).toThrow();
  });

  it ('is not exist a function in the Object', () => {

    console.log(is.another)
  })
});
