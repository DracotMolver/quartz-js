/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.1.5
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2021.
 */

'use strict';

const errorLog = require('../helpers/errorLog');
const is = require('../is');

function _hasSize(arr, leftmost, rightmost) {
  return (
    leftmost >= 1 &&
    rightmost >= 0 &&
    leftmost + rightmost <= arr.length
  );
}

/**
 * It works like the `slice` function but with positive numbers. It will return a new array
 * between the given values.
 *
 * @example
 * [1, 2, 3, 4, 5, 6].between(2, 2); // [3, 4]
 *
 * @param {number} leftmost - The init position
 * @param {number} rightmost - The last position
 * @returns {array} a new array.
 */
function between(leftmost = 1, rightmost = 0) {
  if (process.env.NODE_ENV !== 'production') {
    errorLog(
      !is.number(leftmost) || !is.number(rightmost),
      'Only pass a Number as the first and second parameter.'
    );
  }

  let arr = [...this];

  if (is.moreOrEqual(arr, 2, true)) {
    if (_hasSize(arr, leftmost, rightmost)) {
      const size = arr.length - 1;

      arr = arr.slice(
        leftmost,
        rightmost ? size + 1 - rightmost : size
      );
    } else {
      throw new TypeError(
        "Array.prototype.between can't receive negative params or the sum of them be greater than the length of the array"
      );
    }
  }

  return arr;
}

/**
 * Join one or multiple arrays into one array with unique values.
 * It returns a new array.
 * 
 * @param  {...any} Any value to concat to the array.
 * @returns {array} a new array
 */
function union(...args) {
  let arr = this;

  if (args.length) {
    arr = [...new Set(this.concat(...args))];
  }

  console.log(this, arr);
  return arr;
}

const BETWEEN = 1;
const UNION = 2;

const defaultMask = BETWEEN | UNION;

function addArrayMethods(mask = defaultMask) {
  if (!Array.prototype.between && mask & BETWEEN) {
    Object.defineProperty(Array.prototype, 'between', {
      value: between,
      writable: false
    });
  }

  if (!Array.prototype.union && mask & UNION) {
    Object.defineProperty(Array.prototype, 'union', {
      value: union,
      writable: false
    });
  }
}

exports.BETWEEN = BETWEEN;
exports.UNION = UNION;
exports.addArrayMethods = addArrayMethods;
