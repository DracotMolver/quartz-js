# Quartz is meant to be a readable and understandtable set of functions that explain _What_ are you doing instead of _How_.

Everything is about functions. With this statement born `Quartz`. Functions explain what you are doing and they abstract all the verbove logic you need to code.
Why not use functions to explain the your intention instead and also abstract you from the _**How**_.

**Quartz** strongely inspired by tests frameworks like Mocha and Jasmin, encouraging to use functional programming and remove those effect that cause in many developers independently their leve of experince.

The heart of **Quartz**:

- **is**: Are primarily validations.
- **has**: Are for working with Array and Objects.
- **tools**: A set of different usefull functions.

- Some examples.

```js
if (/^\d{0,3}\.\d{0,3}\.\d{0,3}\.$/.test('192.168.0.1')) {
  // Do something...
}
```

Let\'s be honest. Most of the developers hate regular expressions, and who doesn\'t?!.
That was hard to understand at first sight. What about now using _Quartz_.

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

This example for me it says nothing. I know as a developer what is going to evaluate the statement. But it says nothing. Shouldn't be nice to read clear **\_What\_\_** I'm doing?

```js
const str = 'qwerty';
if (is.moreOrEqual(str, 0, true)) {
  // Do something...
}
```

> NOTE: The example of above the `if (str.length)` is better for performance.

Taking the last example, I'll do it using and Object.

```js
const obj = { name: 'diego', age: 30, country: 'chile' };
if (Object.keys(str).length) {
  // Do something...
}
```

Even if the Object is empty I have to do some extra code because an empty Object is `true` due the nature of JavaScript. This is well known as `Trusthy` or `Falsy`.

In _Quarzt_ this would be different. An empty Object or Array are `false`. This is even in pure JavaScript if you get the length of an Array or Object, which is 0 if it's empty, Therefore false.

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

# Instalation

Open your favourite terminal and type

```
npm install quartz
```

## is

It's a dependency where the functions must return a boolean. Some functions has their opposite version using `is.not`.

- `moreOrEqual`

  It will check if the given value has a length greater or equal to the given size. It make strict comparision.

  - **value**: {object\|array\|string} _The value to evaluate its length._
  - **size**: {number} _The seed we will use to compare._
  - **isMoreOnly**: {boolean} _This will check the length of value must be more than the given size._

  ```js
  is.moreOrEqual({ name: 'John Doe', married: false }, 2); // true
  is.moreOrEqual(['hello', 'hola', 'hallo', 'priviet'], 5); // true
  is.moreOrEqual('hellow world', 4, true); // true - It is more than 4
  ```

- `lessOrMore`
  It will check if the given value has a length lower or equal to the given size. It make strict comparision.

  - **value**: {object\|array\|string} _The value to evaluate its length._
  - **size**: {number} _The seed we will use to compare._
  - **isLessOnly**: {boolean} _This will check the length of value must be more than the given size._

- `exactSize`
  It will check if the given value has exect the same length as the given size. It make strict comparision.

  - **value**: {object\|array\|string} _The value to evaluate._
  - **size**: {number} _The seed we will use to compare._

```js
is.exactSize([1, 2, 3, 4], 4); // true
is.exactSize({ a: { c: 2 }, b: 'hello' }, 2); // true
```

- `nan`
  It will check if the given value is NaN.

  - **value**: {any} _Any value to be checked that is NaN._

- `truthty`
  It will check if a value is truthty but with slightly modifications for Ojects and Arrays.

  - **value**: {any} _Any value to be checked._

> Important Array and Object are false if they are empty.

| type   | description                     |
| ------ | ------------------------------- |
| Object | "{}" => false. "{a: 2}" => true |
| Array  | "[]" => false. "[2]" => true    |

- `falsy`
  It will check if a value is falsy but with slightly modifications for Object and Array.

  - **value**: {any} _Any value to be checked._

> Important Array and Object are true if they are empty.

| type    | description                     |
| ------- | ------------------------------- |
| Objects | "{}" => true. "{a: 2}" => false |
| Arrays  | "[]" => true. "[2]" => false    |

- `run`
  _(Chile only)_ - It will check if the given R.U.N is valid.

  - **value**: {string} _The given R.U.N._

- `alpha`
  Validates that the given value has only words.

  - **value** {string} _Value to match if it's valid._

- `email`
  Validates if the value is a well formed email.

  - **value** {string} _The email to check if it's valid._

- `ip`
  It will check if the value is a valid ip

  - **value** {string} _The ip to checke._

- `url`
  It will check if the url has the right format

  **value** {string} _An URL to check._

  ```js
  is.url('http://google.cl'); // true
  ```

- `password`
  It will set up a Password Strength Policy. The returned funciton will check later if a password is valid under that policy.

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
