# QuartzJS

Simple library of fancy and funny functions to write code like you were speaking. :bowtie:

I started **Quartz** as a project where I could put in practice all I've been learning in JavaScript and coding in general. Here I re-invented the wheel using Functional Programing and taking the syntax from test frameworks like Mocha or Jasmin. I was looking for a way to make my code more readible without undertanding the logic behind the algorithms.

What I'm trying to get with this is a better way to write code explaining **What** are the code is doing and not **How**. Sometimes you've got crazy logic and for new developers, or sombody that is just getting into your project, might be difficult to understand. This cause a waste of time asking and reading the documentation of the code _(if there's any comment)_ :sweat_smile:

#

Quarts is divided in three dependencies: **is**, **has**, and **tools**. Let's drive though them.

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

This example for me it says nothing. I know as a developer what is going to evaluate the statement. But it says nothing. Shouldn't be nice to read clear **_What__** I'm doing?

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

name | params | definition
-----|--------|----------
 `moreOrEqual` | `value: object\|array\|string` <br /> `size: number` <br /> `isMoreOnly: boolean`| It will check if the given value has a length greater or equal to the given size. It make strict comparision. <br />value: The value to evaluate its length. <br />size: The seed we will use to compare. <br />isMoreOnly: This will check the length of value must be more than the given size
`lessOrMore` | `value: object\|array\|string` <br /> `size: number` <br /> `isLessOnly: boolena` | It will check if the given value has a length lower or equal to the given size. It make strict comparision. <br /> value: The value to evaluate its length.<br /> size: The seed we will use to compare. <br /> isLessOnly: This will check the length of value must be more than the given size.
