/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */

'use strict';

const util = require('util');

/**
 * It will check if the values on the first Array exist at least one of them
 * in the second Array.
 * Doesn't work with Array of Objects, for that use `someValuesByKey` function
 *
 * @example
 * has.someValues([1, 2, 3], [1, 5, 4, 3, 10]);
 * // true
 *
 * @param {array} arr    - An Array of elements to used against the second param
 * @param {array} values - The values that are gonna be searched.
 * @returns {boolean}
 */
function someValues(arr, values) {
  let bool = false;

  const size = arr.length;

  for (let index = 0; index < size; index += 1) {
    if (values.indexOf(arr[index]) !== -1) {
      bool = true;
      index = size;
    }
  }

  return bool;
}

/**
 * It will check a single value against N values until find one match.
 * Doesn't work with Array of Objects, for that use the `someValueByKey` function
 *
 * @example
 * has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo']);
 * // true
 *
 * @param {string|boolean|number} element - The element to match against with.
 * @param {array} values                  - All the values to match
 * @returns {boolean}
 */
function someValue(element, values) {
  let result = null;

  if (!util.isArray(values) && process.env.NODE_ENV !== PRODUCTION) {
    throw new Error('The second param should be an Array');
  }

  if (
    util.isNumber(element) ||
    util.isString(element) ||
    util.isBoolean(element)
  ) {
    result = values.indexOf(element) !== -1;
  } else {
    throw new Error(
      'The first param can only be: string, number or boolean'
    );
  }

  return result;
}

/**
 * It will check that the given value is present in all the rest of the values.
 *
 * @param {any} value    - The value to look for
 * @param {array} values - An array of possible values.
 * @returns {boolean}
 */
function everyValue(value, values) {
  let bool = false;

  const size = values.length;

  for (let index = 0; index < size; index += 1) {
    bool = values[index] === value;
  }

  return bool;
}

/**
 * High Order Function to be used within filter and map.
 * Doesn't work with Array of object, for that use the `unique` function
 *
 * @example
 * [1, 2, 3].filter(has.oneValue(2));
 * // [2];
 *
 * @param {any} value                - Any value to use as a seed to filter.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
function oneValue(value) {
  return content => content === value;
}

// // /**
// //  * HOF - It will return only one `Truthty` value. `Falsy` values are not returned.
// //  *
// //  * @example
// //  * [{name: 'john', age: 20}].map(util.unique('age')); // [{age: 20}]
// //  *
// //  * @param {any} key The name of the chain attribute to get the value from
// //  * @param {any} content The content from where to extract the value
// //  * @returns {any} The needed value
// //  */
// // function unique(key) {
// //   return content => content[key];
// // }

/**
 * It will check if one of the values is equal to the one got from using the `Key`.
 * This funciton is for using it with Array of Objects.
 *
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(valueByKey('id', 3));
 * // [{id: 3}]
 *
 * @param {string} key - The key of the object.
 * @param {*} value    - The value we are looking for.
 * @returns {boolean}
 */
function valueByKey(key, value) {
  return content => content[key] === value;
}

// someValueByKey
// someValuesByKey

module.exports = {
  valueByKey,
  everyValue,
  someValues,
  someValue,
  oneValue
};
