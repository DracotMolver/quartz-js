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

function _objLen(element) {
  return (util.isArray(element)
    ? Object.values(element)
    : Object.keys(element)
  ).length;
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
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number is not allowed to be checked');
  }

  return (
    (util.isString(value) ? value.trim().length : _objLen(value)) >=
    size
  );
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
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number is not allowed to be checked');
  }

  return (
    (util.isString(value) ? value.trim().length : _objLen(value)) <=
    size
  );
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
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number are not allowed to be checked');
  }

  return (
    (util.isString(value) ? value.trim().length : _objLen(value)) ===
    size
  );
}

/**
 * It will check if the given value is NaN.
 *
 * @param {*} value   - Any value to be checked that is NaN.
 * @returns {boolean}
 */
function nan(value) {
  return String(value) === 'NaN';
}

/**
 * It will check if a value is truthty but with slightly modifications for Ojects and Arrays.
 *
 * @example
 * | type    | description                     |
 * |---------|---------------------------------|
 * | Objects | "{}" => false. "{a: 2}" => true |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => false. "[2]" => true    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked.
 * @returns {boolean}
 */
function truthty(value) {
  let isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;
    if (typeof value === 'object' && Object.keys(value).length) {
      isTruthy = true;
    } else if (
      typeof value === 'object' &&
      !Object.keys(value).length
    ) {
      isTruthy = false;
    }
  }

  return isTruthy;
}

/**
 * It will check if a value is falsy but with slightly modifications for Object and Array.
 *
 * @example
 * | type    |  description                    |
 * |---------|---------------------------------|
 * | Objects | "{}" => true. "{a: 2}" => false |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => true. "[2]" => false    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked
 * @returns {boolean}
 */
function falsy(value) {
  let isFalsy = false;

  function isPromise(object) {
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) === object;
    }
  }

  if ((!isPromise(value) && !value) || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && typeof value === 'object') {
    if (!(value instanceof Date)) {
      // check for dates
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
}

/**
 * It will check if the given R.U.N is valid - Chile ID.
 *
 * @param {string} value The given R.U.N.
 * @returns {boolean}
 */
function run(value) {
  const text = value.toLowerCase().trim().replace(/[.-]/g, '');

  let counter = 2;
  let total = 0;
  let size = text.length - 2;

  for (; size >= 0; size--, counter += 1) {
    if (counter > 7) {
      counter = 2;
    }

    total += text[size] * counter;
  }

  total = Number(11 - (total - 11 * Math.floor(total / 11)));

  if (total === 11) {
    total = 0;
  } else if (total === 10) {
    total = 'k';
  }

  return String(total) === text.slice(-1);
}

/**
 * Validates that the given value has only words.
 *
 * @param {string} value - Value to match
 * @returns {boolean}
 */
function alpha(value) {
  if (
    !util.isString(value) &&
    process.env.NODE_ENV !== 'production'
  ) {
    throw Error('The value must be an string');
  }

  return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
}

/**
 * Validates if the value is a well formed email.
 *
 * @param {string} value - String to match against with-
 * @returns {boolean}
 */
function email(value) {
  let isEmail = true;
  if (
    /^[a-z\d\!#\$%&'.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(
      value.toLowerCase()
    )
  ) {
    const lastPosition = value.lastIndexOf('@');
    const localPart = value.slice(0, lastPosition);
    const domainPart = value.slice(lastPosition + 1, value.length);

    // Local part
    if (/^[.,]|[.,]$/.test(localPart)) {
      // Forbidden
      isEmail = false;
    } else if (
      /(\.{2,}|["\(\),\:;<>\[\\\]]|@+?)/g.test(localPart) &&
      localPart.slice(0, 1) !== '"' &&
      localPart.slice(-1) !== '"'
    ) {
      // Forbidden
      isEmail = false;
    }

    // Domain part
    if (isEmail) {
      isEmail = /^[\-]|[\-]$/.test(domainPart) ? false : true;
    }
  } else {
    isEmail = false;
  }

  return isEmail;
}

module.exports = {
  moreOrEqual,
  lessOrEqual,
  exactSize,
  truthty,
  email,
  falsy,
  alpha,
  nan,
  run
};
