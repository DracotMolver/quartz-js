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
 *
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
 * High Order Function to be used within filter and map.
 *
 * @example
 * [1, 2, 3].filter(has.oneValue(2));
 * // [2];
 *
 * @param {any} value              - Any value to use as a seed to filter.
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

// /**
//  * It will check if one of the values is equal to the given one based on they given `Key`.
//  *
//  * @example
//  * [{id: 1}, {id: 2}, {id: 3}].filter(valueByKey('id', 3));
//  *
//  * @param {string} key the key of the object
//  * @param {*} value the value to match against the value of the object found by the given key.
//  * @returns {boolean}
//  */
// function valueByKey(key, value) {
//   return content => content[key] === value;
// }


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

module.exports = {
  everyValue,
  someValues,
  someValue,
  oneValue
};
