/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */

"use strict";

const util = require("util");

function _objLen(element) {
  return (util.isArray(element) ? Object.values(element) : Object.keys(element))
    .length;
}

/**
 * It will check if the given value has a length greater or equal to the given size.
 * It make strict comparision
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @returns {boolean}
 */
function moreOrEqual(value, size) {
  if (util.isNumber(value) && process.env.NODE_ENV !== PRODUCTION) {
    throw Error("Type number is not allowed to be checked");
  }

  return (util.isString(value) ? value.trim().length : _objLen(value)) >= size;
}

/**
 * It will check if the given value has a length lower or equal to the given size.
 * It make strict comparision
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @returns {boolean}
 */
function lessOrEqual(value, size) {
  if (util.isNumber(value) && process.env.NODE_ENV !== PRODUCTION) {
    throw Error("Type number is not allowed to be checked");
  }

  return (util.isString(value) ? value.trim().length : _objLen(value)) <= size;
}

/**
 * It will check if the given value has exect the same length as the given size.
 * It make strict comparision
 *
 * @example
 * exactSize([1, 2, 3, 4], 4); // true
 * exactSize({a: { c: 2 }, b: 'hello'}, 2); // true
 *
 * @param {(object|array|string)} value - The value to evaluate.
 * @param {number} size                 - The seed we will use to compare.
 * @returns {boolean}
 */
function exactSize(value, size) {
  if (util.isNumber(value) && process.env.NODE_ENV !== PRODUCTION) {
    throw Error("Type number are not allowed to be checked");
  }

  return (util.isString(value) ? value.trim().length : _objLen(value)) === size;
}

module.exports = {
  moreOrEqual,
  lessOrEqual,
  exactSize,
};
