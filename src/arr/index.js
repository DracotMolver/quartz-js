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

function ArrayBuilder(array) {
  if (!array.prototype.between) {
    Object.defineProperty(array.prototype, 'between', {
      value: between,
      writable: false
    });
  }
}

module.exports = ArrayBuilder;
