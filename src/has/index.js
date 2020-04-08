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

  for (let index = 0, size = arr.length; index < size; index += 1) {
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

module.exports = {
  someValues,
  someValue,
  oneValue,
};
