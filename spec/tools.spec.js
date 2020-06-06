const tools = require('./../src/tools');

describe('A collection of "tools" functions', () => {
  it('camelCase', () => {
    expect(tools.camelCase('user_name')).toEqual('userName');
    expect(tools.camelCase('user-name')).toEqual('userName');
    expect(tools.camelCase('user_middle-name')).toEqual(
      'userMiddleName'
    );
    expect(tools.camelCase('UserMiddle-name')).toEqual(
      'userMiddleName'
    );
  });

  it('obj2Arr', () => {
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
  });

  it('compress', () => {
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
  });

  it('clone', () => {
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
  });

  it('upperParagraph', () => {
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
  });

  it('compose', () => {
    function sum(a) {
      return a + 2;
    }

    function multi(a, b) {
      return a * b;
    }

    expect(tools.compose(sum, multi)(10, 30)).toEqual(302);
  });

  it('pipe', () => {
    function sum(a, b) {
      return a + b;
    }

    function multi(a) {
      return a * 5;
    }

    expect(tools.pipe(sum, multi)(10, 30)).toEqual(200);
  });

  it('pipVal', () => {
    function sum(a) {
      return a + 2;
    }

    expect(tools.pipeVal(sum)(10, 20, 30, 40)).toEqual([
      12,
      22,
      32,
      42
    ]);
  });

  it('rmAttrFromObj', () => {
    const obj = {
      age: 22,
      names: { firstName: 'John', lastName: 'Doeh' },
      email: 'test@test.ts',
      posts: [
        {
          id: 3,
          comments: [
            {
              comment: 1
            }
          ]
        }
      ]
    };

    // remove one key - one level
    expect(tools.rmAttrFromObj(obj, 'names')).toEqual({
      age: 22,
      email: 'test@test.ts',
      posts: [
        {
          id: 3,
          comments: [
            {
              comment: 1
            }
          ]
        }
      ]
    });

    // remove multiple keys - one level
    expect(tools.rmAttrFromObj(obj, ['names', 'posts'])).toEqual({
      age: 22,
      email: 'test@test.ts'
    });

    // remove one key - nested level with object
    expect(tools.rmAttrFromObj(obj, 'names.lastName')).toEqual({
      age: 22,
      names: { firstName: 'John' },
      email: 'test@test.ts',
      posts: [
        {
          id: 3,
          comments: [
            {
              comment: 1
            }
          ]
        }
      ]
    });
  });

  xit('connect', () => {
    const users = [
      {
        id: 1,
        name: 'diego',
        age: 20,
        posts: [
          {
            id: 2,
            comment: 'test 1'
          },
          {
            id: 3,
            comment: 'test 1'
          }
        ]
      }
    ];

    const x = tools.connect({ user: users }).with({ post: posts });
  });
});
