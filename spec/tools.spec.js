const tools = require('./../src/tools');

describe('A collection of "tools" functions', () => {
  it('camelCase', done => {
    expect(tools.camelCase('user_name')).toEqual('userName');
    expect(tools.camelCase('user-name')).toEqual('userName');
    expect(tools.camelCase('user_middle-name')).toEqual(
      'userMiddleName'
    );
    expect(tools.camelCase('UserMiddle-name')).toEqual(
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

    expect(tools.obj2Arr(obj)).toEqual(arr);

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

    expect(tools.compress(value, 'name', 'email').array()).toEqual(
      arr
    );
    expect(tools.compress(value, 'name', 'email').object()).toEqual(
      obj
    );

    done();
  });

  it('clone', done => {
    const arr = tools.clone([1, 2, 3, 4], [2, 10, 5]);
    const obj = tools.clone(
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

  it('upperParagraph', done => {
    const paragraph = `lorem ipsum dolor sit amet consectetur adipiscing 
    elit curae sagittis, nibh nulla vivamus aliquet per cum ullamcorper vel, 
    suscipit primis velit parturient orci auctor tellus nam. himenaeos 
    eleifend turpis pharetra etiam sociis nisl curabitur, in rhoncus donec 
    aliquet augue aliquam dapibus, suscipit potenti dictumst fusce non volutpat. 
    sed mattis integer at proin vehicula ligula imperdiet phasellus, ad velit 
    facilisis aenean sollicitudin ante.`;

    expect(tools.upperParagraph(paragraph)).toEqual(
      'Lorem ipsum dolor sit amet consectetur adipiscing elit curae sagittis, nibh nulla vivamus aliquet per cum ullamcorper vel, suscipit primis velit parturient orci auctor tellus nam. Himenaeos eleifend turpis pharetra etiam sociis nisl curabitur, in rhoncus donec aliquet augue aliquam dapibus, suscipit potenti dictumst fusce non volutpat. Sed mattis integer at proin vehicula ligula imperdiet phasellus, ad velit facilisis aenean sollicitudin ante.'
    );

    expect(tools.upperParagraph('diego molina vera', true)).toEqual(
      'Diego Molina Vera'
    );

    done();
  });
});
