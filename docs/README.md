# Quarts is divided in three dependencies: **is**, **has**, and **tools**.

## is

`is` It's a dependency where the functions must return a boolean. Some functions has their opposite version using `is.not`.

- Examples

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

### `is` Functions

- `moreOrEqual`

  It will check if the given value has a length greater or equal to the given size. It make strict comparision.

  - value: {object\|array\|string} - _The value to evaluate its length._
  - size: {number} - _The seed we will use to compare._
  - isMoreOnly: {boolean} - _This will check the length of value must be more than the given size._

  ```js
  is.moreOrEqual({ name: 'John Doe', married: false }, 2); // true
  is.moreOrEqual(['hello', 'hola', 'hallo', 'priviet'], 5); // true
  is.moreOrEqual('hellow world', 4, true); // true - It is more than 4
  ```

- `lessOrMore`
  It will check if the given value has a length lower or equal to the given size. It make strict comparision.

  - value: {object\|array\|string} - _The value to evaluate its length._
  - size: {number} - _The seed we will use to compare._
  - isLessOnly: {boolean} - _This will check the length of value must be more than the given size._

- `exactSize`
  It will check if the given value has exect the same length as the given size. It make strict comparision.

  - value: {object\|array\|string} - _The value to evaluate._
  - size: {number} - _The seed we will use to compare._

```js
is.exactSize([1, 2, 3, 4], 4); // true
is.exactSize({ a: { c: 2 }, b: 'hello' }, 2); // true
```

- `nan`
  It will check if the given value is NaN.

  - value: {any} - _Any value to be checked that is NaN._

- `truthty`
  It will check if a value is truthty but with slightly modifications for Ojects and Arrays.

  - value: - _Any value to be checked._

> Important Array and Object are false if they are empty.

| type    | description                     |
| ------- | ------------------------------- |
| Object | "{}" => false. "{a: 2}" => true |
| Array  | "[]" => false. "[2]" => true    |



- It will check if a value is falsy but with slightly modifications for Object and Array.
-
- @example
- | type | description |
- |---------|---------------------------------|
- | Objects | "{}" => true. "{a: 2}" => false |
- |---------|---------------------------------|
- | Arrays | "[]" => true. "[2]" => false |
- |---------|---------------------------------|
-
- @param {any} value - Any value to be checked
  falsy


- It will check if the given R.U.N is valid - Chile ID.
-
- @param {string} value The given R.U.N.
run


- Validates that the given value has only words.
-
- @param {string} value - Value to match
  function alpha(value) {


- Validates if the value is a well formed email.
- @param {string} value - String to match againt with.
email



- It will check if the value is a valid ip
-
- @param {string} ip - The ip to be checked.
ip



- It will check if the url has the right format
- based on: https://www.w3.org/Addressing/URL/url-spec.txt
-
- @example
- is.url('http://google.cl');
-
- @param {string} value - An URL.


- It will set up a Password Strength Policy.
- The returned funciton will check later if a password is valid under that policy.
-
- @param {string} pwd - String to match against with
- @param {object} rules - The set of rules for your password
- @param {number} rules.minLength - Minimun size of characters
- @param {number} rules.minAlpha - Minimun size of alpha characters
- @param {number} rules.minNumber - Minimun of numbers
- @param {number} rules.minSameChar - Minimun of equal characters
- @param {boolean} rules.allowSpace - If allow or not whitespace
password
