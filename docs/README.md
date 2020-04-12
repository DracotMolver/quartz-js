# Quartz is meant to be a readable and understandtable set of functions that explain _What_ are you doing instead of _How_.

Everything is about functions. With this statement borned `Quartz`. Functions explain what you are doing and they abstract all the boilerplate logic you have done.
But, Why not using functions to explain your intention and also abstract you from the _**How**_ of your code.

**Quartz** is strongely inspired by tests frameworks like Mocha and Jasmine, encouranging you to use functional programming and remove those side effect that algorithms cause in many developers independently their experince. Because I know, as you might to ass well, that we all code in differents ways, some can code clean and beautiful and other don't.

---

The **core** of **Quartz**:

- **is**: Primarily validations and different ways to ask _**if...**_.
- **has**: For working with Array and Object using filter, map, some, every, and on.
- **tools**: A set of different usefull functions that you might need. :+1:

### Some examples.

```js
if (/^\d{0,3}\.\d{0,3}\.\d{0,3}\.$/.test('192.168.0.1')) {
  // Do something...
}
```

Let\'s be honest. Most of the developers hate regular expressions, and who doesn\'t?!.
That was hard to understand at first sight. What about now using **Quartz**.

```js
if (is.ip('192.168.0.1')) {
  // Do something...
}
```

Isn\'t easier to understand?. I can - _almost_ - read **_If it is an ip_**.

Next example:

```js
const str = 'qwerty';
if (str.length) {
  // Do something...
}
```

This example for me it says nothing. I know as a developer what this statement is about. But it says nothing. Shouldn't be nice to read clear **\_What\_** it's doing?

```js
const str = 'qwerty';
if (is.moreOrEqual(str, 0, true)) {
  // Do something...
}
```

> NOTE: The example of above the `if (str.length)` is better for performance. But we use webpack to make websites, right? :stuck_out_tongue_winking_eye:

Taking the last example, you can also do it using an Object.

```js
const obj = { name: 'diego', age: 30, country: 'chile' };
if (Object.keys(str).length) {
  // Do something...
}
```

Even if the Object is empty I have to do some extra code because an empty Object is `true` due the nature of JavaScript. This is well known as `Trusthy` or `Falsy`.

With **Quarzt** this would be different. An empty Object or Array are `false`. This is even in pure JavaScript if you get the length of an Array or Object, which is 0 if they are empty, therefore false.

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

Open your favourite terminal and type

```
npm install quartz
```

Then just use any of the three parts of _Quartz_ that you need.

```js
const { has, tools, is } = require('quartzjs');
```

---

## is

It's a Object that has conditional functions. Some functions has their opposite version using `is.not`.

`moreOrEqual`
It validates if the given value has a length greater or equal than the given size. It makes use of strict comparision.

- **value**: {object\|array\|string} _The value to evaluate its length._
- **size**: {number} _The seed we will use to compare._
- **isMoreOnly**: {boolean} _This validates that the length of value must be more than the given size and not equal._

```js
is.moreOrEqual({ name: 'John Doe', married: false }, 2); // true
is.moreOrEqual(['hello', 'hola', 'hallo', 'priviet'], 5); // true
is.moreOrEqual('hellow world', 4, true); // true - It is more than 4
```

  <br />

`lessOrMore`
It validates if the given value has a length lower or equal than the given size. It makes use of strict comparision.

- **value**: {object\|array\|string} _The value to evaluate its length._
- **size**: {number} _The seed we will use to compare._
- **isLessOnly**: {boolean} _This validates that the length of value must be less than the given size and not equal._
  <br />

`exactSize`
It validates if the given value has the exact length as the given size. It makes use of strict comparision.

- **value**: {object\|array\|string} _The value to evaluate._
- **size**: {number} _The seed we will use to compare._

```js
is.exactSize([1, 2, 3, 4], 4); // true
is.exactSize({ a: { c: 2 }, b: 'hello' }, 2); // true
```

<br />

`nan`
It validates if the given value is NaN.

- **value**: {any} _Any value to be checked that is NaN._

<br />

`truthty`
It validates if a value is truthty but with slightly modifications for Object and Array.

- **value**: {any} _Any value to be checked._

> **Important**: Array and Object are false if they are empty.

| type   | description                     |
| ------ | ------------------------------- |
| Object | "{}" => false. "{a: 2}" => true |
| Array  | "[]" => false. "[2]" => true    |

<br />

`falsy`
It validates if a value is falsy but with slightly modifications for Object and Array.

- **value**: {any} _Any value to be checked._

> **Important**: Array and Object are true if they are empty.

| type   | description                     |
| ------ | ------------------------------- |
| Object | "{}" => true. "{a: 2}" => false |
| Array  | "[]" => true. "[2]" => false    |

<br />

`run`
_(Chile only)_ - It validates if the given R.U.N is valid.

- **value**: {string} _The given R.U.N._

```js
is.run('18150581-8'); // true
```

<br />

`alpha`
It validates that the given value contains only words.

- **value** {string} _Value to match if it's valid._

```js
is.alpha('hola'); // true
is.alpha('John Doe 3'); // fase
```

<br />

`email`
It validates if the value is a well formed email.

- **value** {string} _The email to check if it's valid._

```js
is.email('very.common@example.com'); // true
is.email("#!$ %& '*+-/=?^_`{}|~@example.org"); // true
is.email('admin@mailserver1'); // true
```

<br />

`ip`
It validates if the value is a valid ip.

- **value** {string} _The ip to checke._

```js
is.ip('255.255.255.255'); // true
is.ip('0.0.0.0'); // true
```

<br />

`url`
It validates if the value is a valid URL.

**value** {string} _An URL to check._

```js
is.url('http://google.cl'); // true
```

<br />

`password`
It sets up a Password Strength Policy. The returned function will validates later if a password is valid under that policy.

- **pwd** {string} _String to match against with._
- **rules** {object} _The set of rules for your password._
- **rules.minLength** {number} _Minimun size of characters._
- **rules.minAlpha** {number} _Minimun size of alpha characters._
- **rules.minNumber** {number} _Minimun of numbers._
- **rules.minSameChar** {number} _Minimun of equal characters._
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
  // valid password. Do smoething
}
```

# has

It's a set of functions that will help you to work with Array and Objects in the functional way you've been doing, but with style :nail_care:.

`somevalues`
It checks if the values on the first Array exist, at least one of them, in the second Array. It Doesn't work with Array of Objects. For that case use the `someValuesByKey` function.

- **arr**: {array} _An Array of values to use against the second param._
- **values**: {array} _The values that are going to be searched._

```js
has.someValues([1, 2, 3], [1, 5, 4, 3, 10]); // true
```

<br />

`someValue`
It matchs a single value against N values until find one. It doesn't work with Array of Objects. For that case use the `someValueByKey` function

- **value** {string|boolean|number} _The value to match against with._
- **values** {array} values _All the values to match._

```js
has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo']); // true
```

<br />

`everyValue`
It checks that the given value match all the rest of the values.

- **value** {(boolean\|string\|number)} _The value to look for._
- **value** {array} _An array of possible values._

<br />

`oneValue`
A High Order Function to use with filter and map. It Doesn't work with Array of Object. For that case use the `unique` function.

- **value** {any} _Any value to use as a seed to filter._
- **callback** {function(any): boolean} _A function that will accept only one param._

```js
[1, 2, 3].filter(has.oneValue(2)); // [2];
```

<br />

`unique`
A High Order Function to use with filter and map. It will return the first value of a given key that gives `truthty`.

- **key**: {any} _The key looking for on the object._
- **callback**: {function(any): boolean} _A function that will accept only one param._

```js
[
  { name: 'john', age: 0 },
  { name: 'dee', age: 20 }
].map(util.unique('age'));
```

<br />

`valueByKey`
It checks if one of the values is equal to the value obtained from using an specific `key`. This function is for using it with Array of Objects.

- **key** {string} _The key of the object._
- **callback** {function(any): boolean} _A function that will accept only one param._

```js
[{ id: 1 }, { id: 2 }, { id: 3 }].filter(valueByKey('id', 3));
```

## tools

It a set of "tools" that you might need one day.
Sometimes some JS features are amezing, but a lot of them visually sucks. An example could be the spread operator. I love spread operator, but having a lot of them make look your code messy.

`camelCase`
It converts the string to its Lower Camel Case version.

- **text** {string} _The text to convert in camelCase._

```js
tools.camelCase('user_name'); // userName
```

<br />

`compress`
It makes an Array of Objects using the key and value choosen from the given Object or a new Object based on this condition.

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

`obj2Arr`
It creates an Object into an Array of Objects keeping the original keys from the given Object.

- **obj** {object} _The Object to convert from._

```js
tools.obj2Arr({ b: '3', c: true, d: [4] });
// [{ b: '3' }, { c: true }, { d: [4] }]
```

<br />

`clone`
It merges Arrays or Objects at first level returning a new Object or Array. _**Be carful with the order of the values that you are passing when they are objects.**_

- **obj** {(array|object)} _The values to be merged._

```js
tools.clone({ a: 'aA' }, { b: 'bB', a: 'AA' });
// {a: 'AA', b: 'bB'};

tools.clone([1, 2, 3, 4], [2, 10, 5]);
// [1, 2, 3, 4, 2, 10, 5];
```

<br />

`upperParagraph`
It capitalizes the first letter of a text. Also it looks for the first word of a paragraph and any other word after a dot.

- **text** {string} _The text to be parsed._
- **byWord** {boolean} _True if you want to upper the first letter of each word._

```js
tools.upperParagraph('diego molina vera', true);
// 'Diego Molina Vera'
```

<br />

`compose`
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

`pipe`
It concats and execute several functions on the given values. If you add more than one value, only the first function will receive them and the returned result from the first function will be passed down to the rest of the functions. This is executed from left to right.

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

`pipeVal`
It execute a single function for several independents values. It will return an Array of N values.

- **unc** {function} The function to use.

```js
function sum(a) {
  return a + 2;
}

tools.pipeVal(sum)(10, 20, 30, 40);
// [12, 22, 32, 42];
```
