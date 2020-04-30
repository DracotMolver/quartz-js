# Quartz Is Meant to Be a Readable and Understandable Set of Functions That Explains _What_ You Are Doing Instead of _How_.

Everything is about functions. With this statement born `Quartz`. Functions explain what you are doing and they abstract all the boilerplate logic you have done.
But, _**Why**_ not use functions to explain your intention and also abstract you from the _**How**_ of your code.

**Quartz** is strongly inspired by tests frameworks like Mocha and Jasmine, encouraging you to use functional programming and remove those side effects that algorithms cause. Because I know, as you might as well, that we all code in different ways, some can code clean and beautifully and others cannot.

---

The **core** of **Quartz**:

- **is**: Primarily validations and different ways to ask _**if...**_.
- **has**: For working with Array and Object using filter, map, some, every, and on.
- **tools**: A set of different useful functions that you might need. :+1:

You can use it with any SPA or NodeJS server.

### Some examples.

```js
if (/^\d{0,3}\.\d{0,3}\.\d{0,3}\.$/.test('192.168.0.1')) {
  // Do something...
}
```

Let\'s be honest. Most developers hate regular expressions, and who doesn\'t?!
That was hard to understand at first sight. What about now using **Quartz**.

```js
if (is.ip('192.168.0.1')) {
  // Do something...
}
```

Isn\'t that easier to understand? I can - _almost_ - read **_If it is an ip_**.

Next example:

```js
const str = 'qwerty';
if (str.length) {
  // Do something...
}
```

This example for me says nothing. I know as a developer what this statement is about. But it says nothing. Wouldn't be nice to read clearly **\_What\_** it's doing?

```js
const str = 'qwerty';
if (is.moreOrEqual(str, 0, true)) {
  // Do something...
}
```

> NOTE: The example of above the `if (str.length)` is better for performance. But we use webpack to make websites, right? :stuck_out_tongue_closed_eyes:

Taking the last example, you can also do it using an Object.

```js
const obj = { name: 'diego', age: 30, country: 'chile' };
if (Object.keys(str).length) {
  // Do something...
}
```

Even if the Object is empty I have to write some extra code because an empty Object is `true` due to the nature of JavaScript. This is well known as `Truthty` or `Falsy`.

With **Quarzt** this would be different. An empty Object or Array is `false`. This is even in pure JavaScript if you get the length of an Array or Object, which is 0 if they are empty, therefore false.

```js
const obj = { name: 'diego', age: 30, country: 'chile' };
if (is.moreOrLess(str, 0, true)) {
  // Do something...
}

// or more accurate
const obj2 = {};
if (is.truthty(obj2)) {
  // Do something (Won't pass because is an empty Object)
}
```

# Installation

Open your favorite terminal and type

```
npm install quartzjs
```

Then just use any of the three parts of _Quartz_ that you need.

```js
const { has, tools, is } = require('quartzjs');
```

---

## is

It's an Object that has conditional functions. Some functions have their opposite version using `is.not`. Each function will return `true` or `false`

**`moreOrEqual`**
It validates if the given value has a length greater or equal to the given size. It makes use of strict comparison. Use it **only** with `String`, `Object`, and `Array`.

- **value**: {object\|array\|string} _The value to evaluate its length._
- **size**: {number} _The seed we will use to compare._
- **isMoreOnly**: {boolean} _If you want to only validates that the length of value is more than the given size._

```js
is.moreOrEqual({ name: 'John Doe', married: false }, 2); // true
is.moreOrEqual(['hello', 'hola', 'hallo', 'priviet'], 5); // true
is.moreOrEqual('hello world', 4, true); // true - It is more than 4
```

  <br />

**`lessOrMore`**
It validates if the given value has a length lower or equal to the given size. It makes use of strict comparison. Use it **only** with `String`, `Object`, and `Array`.

- **value**: {object\|array\|string} _The value to evaluate its length._
- **size**: {number} _The seed we will use to compare._
- **isLessOnly**: {boolean} _If you want to only validates that the length of value is less than the given size._

  <br />

**`exactSize`**
It validates if the given value has the exact length as the given size. It makes use of strict comparison. Use it **only** with `String`, `Object`, and `Array`.

- **value**: {object\|array\|string} _The value to evaluate._
- **size**: {number} _The seed we will use to compare._

```js
is.exactSize([1, 2, 3, 4], 4); // true
is.exactSize({ a: { c: 2 }, b: 'hello' }, 2); // true
```

<br />

**`nan`**
It validates if the given value is NaN.

- **value**: {any} _Any value to be checked that is NaN._

```js
is.nan(NaN); // true;
is.nan(Number('123A')); // true
```

<br />

**`truthty`**
It validates if a value is truthty but with slight modifications for Object and Array.

- **value**: {any} _Any value to be checked._

| type   | description                     |
| ------ | ------------------------------- |
| Object | "{}" => false. "{a: 2}" => true |
| Array  | "[]" => false. "[2]" => true    |

> **Important**: Array and Object are false if they are empty.

```js
is.truthty({ a: 'hello' }); // true
is.truthty('hello'); // true
is.truthty([1, 2]); // true
is.truthty(3); // true

is.truthty(NaN); // false
is.truthty([]); // false
is.truthty({}); // false
```

<br />

**`falsy`**
It validates if a value is falsy but with slight modifications for Object and Array.

- **value**: {any} _Any value to be checked._

| type   | description                     |
| ------ | ------------------------------- |
| Object | "{}" => true. "{a: 2}" => false |
| Array  | "[]" => true. "[2]" => false    |

> **Important**: Array and Object are true if they are empty.

```js
is.falsy(NaN); // true
is.falsy([]); // true
is.falsy({}); // true
is.falsy(undefined); // true
is.falsy(''); // true
is.falsy(false); // true
is.falsy(0); // true

is.falsy({ a: 'hello' }); // false
is.falsy('hello'); // false
is.falsy([1, 2]); // false
is.falsy(3); // false
```

<br />

**`run`**
_(Chile only)_ - It validates if the given R.U.N is valid.

- **value**: {string} _The given R.U.N._

```js
is.run('18150581-8'); // true
```

<br />

**`alpha`**
It validates that the given value contains only words.

- **value** {string} _Value to match if it's valid._

```js
is.alpha('hola'); // true
is.alpha('John Doe 3'); // false
```

<br />

**`email`**
It validates if the value is a well formed email.

- **value** {string} _The email to check if it's valid._

```js
is.email('very.common@example.com'); // true
is.email("#!$ %& '*+-/=?^_`{}|~@example.org"); // true
is.email('admin@mailserver1'); // true
```

<br />

**`number`**
It validates that the given value has only numbers. There are some exceptions when it's related to numbers but as a currency value. This type of strings are gonna be validates if they are numbers too, removing the `.`, `,` and the `$`.

- **value** {(string\|number)} _Value to match if it's valid._

```js
is.number('12,34'); // true
is.number('$12,34'); // true
is.number('2'); // true
is.number(2.2); // true
```

<br />

**`ip`**
It validates if the value is a valid well formed ip.

- **value** {string} _The ip to checked._

```js
is.ip('255.255.255.255'); // true
is.ip('0.0.0.0'); // true
```

<br />

`url`
It validates if the value is a valid well formed URL.

**value** {string} _An URL to check._

```js
is.url('http://google.cl'); // true
```

<br />

**`password`**
It sets up a Password Strength Policy. The returned function will validates later if a password is valid under that policy.

- **pwd** {string} _String to match against with._
- **rules** {object} _The set of rules for your password._
- **rules.minLength** {number} _Minimum size of characters._
- **rules.maxLength** {number} _Maximum size of characters._
- **rules.minAlpha** {number} _Minimum size of alpha characters._
- **rules.minNumber** {number} _Minimum of numbers._
- **rules.minSameChar** {number} _Minimum of equal characters._
- **rules.allowSpace** {boolean} _If allow or not whitespace._

```js
// Set a Policy Configuration
const pwdPolicy = is.password({
  minLength: 7,
  maxLength: 10,
  minAlpha: 2,
  minNumber: 5,
  minSameChar: 0,
  allowSpace: false
});

if (pwdMatcher('d@12345')) {
  // valid password. Do something
}
```

### List of `not` functions:

All this functions will return `true` if they are not what they supposed to be.

- `is.not.ip`
- `is.not.url`
- `is.not.nan`
- `is.not.alpha`
- `is.not.number`

## has

It's a set of functions that will help you to work with Array and Objects in the functional way you've been doing, but with style :nail_care:.

**`someValues`**
It checks if the values on the first Array exist, at least one of them, in the second Array. It Doesn't work with Array of Objects. For that case use the `someValuesByKey` function.

- **arr**: {array} _An Array of values to use against the second param._
- **values**: {array} _The values that are going to be searched._

```js
has.someValues([1, 2, 3], [1, 5, 4, 3, 10]); // true
```

<br />

**`someValue`**
It matches a single value against N values until find one. It doesn't work with Array of Objects. For that case use the `someValueByKey` function.

- **value** {(string\|boolean\|number)} _The value to match against with._
- **values** {array} values _All the values to match._

```js
has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo']); // true
```

<br />

**`everyValue`**
It checks that the given value match all the rest of the values.

- **value** {(boolean\|string\|number)} _The value to look for._
- **value** {array} _An array of possible values._

<br />

**`oneValue`**
A High Order Function to use with filter and map. It Doesn't work with Array of Object. For that case use the `unique` function.

- **value** {any} _Any value to use as a seed to filter._
- **callback** {function(any): boolean} _A function that will accept only one param._

```js
[1, 2, 3].filter(has.oneValue(2)); // [2];
```

<br />

**`unique`**
A High Order Function to use with filter and map. It will return the first value of a given key that gives `truthty`.

- **key**: {any} _The key looking for on the object._
- **callback**: {function(any): boolean} _A function that will accept only one param._

```js
[
  { name: 'john', age: 0 },
  { name: 'dee', age: 20 }
].map(has.unique('age'));
```

<br />

**`valueByKey`**
It checks if one of the values is equal to the value obtained from using an specific `key`. This function is for using it with Array of Objects.

- **key** {string} _The key of the object._
- **value** {string} _The value to be compared._
- **callback** {function(any): boolean} _A function that will accept only one param._

```js
[{ id: 1 }, { id: 2 }, { id: 3 }].filter(has.valueByKey('id', 3));
```

**`valuesByKeys`**
It checks if the Array of Object has the respective values based on the given keys. The first key on the first given param is the key that will compare the value of the first value of the second param.

```js
[
  { id: 1, name: 'anna', age: 10, city: 'santiago' },
  { id: 2, name: 'diego', age: 30, city: 'texas' },
  { id: 3, name: 'drake', age: 20, city: 'puerto' },
  { id: 4, name: 'carl', age: 20, city: 'puerto' }
].filter(has.valuesByKeys(['age', 'city'], [20, 'puerto']));
// [{ id: 3, name: 'drake', age: 20, city: 'puerto' },
// { id: 4, name: 'carl', age: 20, city: 'puerto' }];
```

## tools

It a set of "tools" that you might need one day.
Sometimes some JS features are amazing, but a lot of them visually sucks. An example could be the spread operator. I love spread operator, but having a lot of them make look your code messy.

**`camelCase`**
It converts the string to its Lower Camel Case version.

- **text** {string} _The text to convert in camelCase._

```js
tools.camelCase('user_name'); // userName
```

<br />

**`compress`**
It makes an Array of Objects using the chosen key and value from the given Object or a new Object based on this condition.

- **array** {array} _The Array of object to extract the keys._
- **key** {string} _The name of the attribute to use as a key._
- **value** {string} _The name of the attribute to use as a value._

```js
const arr = [
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

tools.compress(arr, 'name', 'email').array();
// [
//   { AAA: 'email@test.cl' },
//   { SSS: 'email@test.cl' },
//   { DDD: 'email@test.cl' }
// ];

tools.compress(arr, 'name', 'email').object();
// {
//   AAA: 'email@test.cl',
//   SSS: 'email@test.cl',
//   DDD: 'email@test.cl'
// };
```

<br />

**`obj2Arr`**
It creates an Object into an Array of Objects keeping the original keys from the given Object.

- **obj** {object} _The Object to convert from._

```js
tools.obj2Arr({ b: '3', c: true, d: [4] });
// [{ b: '3' }, { c: true }, { d: [4] }]
```

<br />

**`clone`**
It merges Arrays or Objects at first level returning a new Object or Array. _**Be carful with the order of the values that you are passing when they are objects.**_

- **obj** {(array|object)} _The values to be merged._

```js
tools.clone({ a: 'aA' }, { b: 'bB', a: 'AA' });
// {a: 'AA', b: 'bB'};

tools.clone([1, 2, 3, 4], [2, 10, 5]);
// [1, 2, 3, 4, 2, 10, 5];
```

<br />

**`upperParagraph`**
It capitalizes the first letter of a text. Also it looks for the first word of a paragraph and any other word after a dot.

- **text** {string} _The text to be parsed._
- **byWord** {boolean} _True if you want to upper the first letter of each word._

```js
tools.upperParagraph('diego molina vera', true);
// 'Diego Molina Vera'
```

<br />

**`compose`**
It receives several functions that are going to be `composed` into one function. If you add more than one value, only the first function will receive them and the returned result from the first function will be passed down to the rest of the functions. This is executed from right to left.

- **func** {function} _A set of functions._

```js
function sum(a) {
  return a + 2;
}

function multi(a, b) {
  return a * b;
}

tools.compose(sum, multi)(10, 30);
// 302
```

<br />

**`pipe`**
It concat and execute several functions on the given values. If you add more than one value, only the first function will receive them and the returned result from the first function will be passed down to the rest of the functions. This is executed from left to right.

- **func** {function} _All the Functions to be executed._

```js
function sum(a, b) {
  return a + b;
}

function multi(a) {
  return a * 5;
}

tools.pipe(sum, multi)(10, 30);
// 200
```

<br />

**`pipeVal`**
It execute a single function for several independents values. It will return an Array of N values.

- **unc** {function} The function to use.

```js
function sum(a) {
  return a + 2;
}

tools.pipeVal(sum)(10, 20, 30, 40);
// [12, 22, 32, 42];
```

<br />

**`rmAttrFromObj`**
It will remove a property from an Object based on the given key. This is only for Object, don't try to remove a property from an Object within an Array. This won't hold the reference as the `delete` keyword does.

- **object** {object} The Object that you want to remove the values from.
- **keys** {(string\|array)} The key(s) to remove from the Object.

```js
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

// It removes the property based on one key at FIRST level.
tools.rmAttrFromObj(obj, 'names');
// {
//   age: 22,
//   email: 'test@test.ts',
//   posts: [
//     {
//       id: 3,
//       comments: [
//         {
//           comment: 1
//         }
//       ]
//     }
//   ]
// }

// Remove the properties based on more than one key at FIRST level.
// You must pass an array containing the keys to remove.
tools.rmAttrFromObj(obj, ['names', 'posts']);
// {
//   age: 22,
//   email: 'test@test.ts'
// }

// Remove the property based on one key at N level (nested) using a dot notation.
tools.rmAttrFromObj(obj, 'names.lastName');
// {
//   age: 22,
//   names: { firstName: 'John' },
//   email: 'test@test.ts',
//   posts: [
//     {
//       id: 3,
//       comments: [
//         {
//           comment: 1
//         }
//       ]
//     }
//   ]
// };
```
