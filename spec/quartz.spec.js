const is = require('./../src/is');

xdescribe('General situations using Quartz', () => {
  xdescribe('`is` functions showing console.error', () => {
    it('moreOrEqual', () => {
      is.moreOrEqual(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'Only pass an Object, an Array or an String at the first parameter.'
      // );
    });

    it('lessOrEqual', () => {
      is.lessOrEqual(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'Only pass an Object, an Array or an String at the first parameter.'
      // );
    });

    it('exactSize', () => {
      is.exactSize(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'Only pass an Object, an Array or an String at the first parameter.'
      // );
    });

    it('run', () => {
      is.run(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.run(['17.123.123-1'], 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.run(11111112, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );
    });

    it('alpha', () => {
      is.alpha(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.alpha([], 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );
    });

    it('email', () => {
      is.email(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.email([], 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );
    });

    it('ip', () => {
      is.email(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.email([], 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );
    });

    it('url', () => {
      is.url(123, 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );

      is.url([], 3);
      // expect(console.error).toHaveBeenCalledWith(
      //   'The given parameter must be an String.'
      // );
    });
  });
});
