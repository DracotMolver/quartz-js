/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */

'use strict';

const util = require('util');

function _objLen(value) {
  return (util.isArray(value)
    ? Object.values(value)
    : Object.keys(value)
  ).length;
}

/**
 * It validates if the given value has a length greater or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isMoreOnly          - If you want to only validates that the length of value is more than the given size.
 * @returns {boolean}
 */
function moreOrEqual(value, size, isMoreOnly = false) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error(
        'Pass only Object, Array or String in the first parameter.'
      );
      return;
    }
  }

  const comp = util.isString(value)
    ? value.trim().length
    : _objLen(value);

  let res = comp >= size;

  if (isMoreOnly) {
    res = comp > size;
  }

  return res;
}

/**
 * It validates if the given value has a length lower or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isLessOnly          - If you want to only validates that the length of value is less than the given size.
 * @returns {boolean}
 */
function lessOrEqual(value, size, isLessOnly = false) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error(
        'Pass only Object, Array or String in the first parameter.'
      );
      return;
    }
  }

  const comp = util.isString(value)
    ? value.trim().length
    : _objLen(value);

  let res = comp <= size;

  if (isLessOnly) {
    res = comp < size;
  }

  return res;
}

/**
 * It validates if the given value has the exact length as the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
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
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error(
        'Pass only Object, Array or String in the first parameter.'
      );
      return;
    }
  }

  return (
    (util.isString(value) ? value.trim().length : _objLen(value)) ===
    size
  );
}

/**
 * It validates if the given value is NaN.
 *
 * @param {any} value - Any value to be checked that is NaN.
 * @returns {boolean}
 */
function nan(value) {
  return String(value) === 'NaN';
}

/**
 * It validates if a value is truthty but with slight modifications for Object and Array.
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
 * It validates if a value is falsy but with slight modifications for Object and Array.
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
 * It validates if the given R.U.N is valid. - Chile ID.
 *
 * @param {string} value The given R.U.N.
 * @returns {boolean}
 */
function run(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  const text = value.toLowerCase().trim().replace(/[.-]/g, '');

  let counter = 2;
  let total = 0;
  let size = text.length - 2;

  for (; size >= 0; size--, counter += 1) {
    if (counter > 7) {
      counter = 2;
    }

    total += Number(text[size]) * counter;
  }

  total = Number(11 - (total - 11 * Math.floor(total / 11)));

  let digit = String(total);

  if (total === 11) {
    digit = '0';
  } else if (total === 10) {
    digit = 'k';
  }

  return digit === text.slice(-1);
}

/**
 * Validates that the given value has only words.
 *
 * @param {string} value - Value to match if it's valid
 * @returns {boolean}
 */
function alpha(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
}

/**
 * Validates if the value is a well formed email.
 *
 * @param {string} value - The email to check if it's valid
 * @returns {boolean}
 */
function email(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

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

/**
 * It validates that the given value has only numbers.
 *
 * @param {(string|number)} value Value to match if it's valid.
 * @returns {boolean}
 */
function number(value) {
  return /^\d+$/.test(String(value).trim().replace(/[.,$]/g, ''));
}

/**
 * It validates if the value is a valid well formed ip.
 *
 * @param {string} value - The ip to be checked.
 * @return {boolean}
 */
function ip(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  return /\b(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/.test(
    value
  );
}

/**
 * It validates if the value is a valid well formed URL.
 * based on: https://www.w3.org/Addressing/URL/url-spec.txt
 *
 * @example
 * is.url('http://google.cl');
 *
 * @param {string} value - An URL.
 * @return {boolean}
 */
function url(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  const [protocol, ...rest] = value.split(':');
  let isValid = false;

  if (
    protocol === 'http' ||
    protocol === 'https' ||
    protocol === 'ftp'
  ) {
    isValid = /^([0-65536]{2,4}|)\/\/[\w\d+-.]+\.\w+([\/\w\?=%;&]|:[0-65536]{2,4})+/.test(
      rest.join(':')
    );
  } else if (protocol === 'mailto') {
    const mailTo = value.replace('mailto', '');
    isValid = /^::[\w\d-+]+@[\w\d-+.]+/.test(mailTo);
  }

  return isValid;
}

/**
 * It will set up a Password Strength Policy.
 * The returned function will check later if a password is valid under that policy.
 *
 * @param {object} rules             - The set of rules for your password
 * @param {number} rules.minLength   - Minimum size of characters
 * @param {number} rules.maxLength   - Maximum size of characters
 * @param {number} rules.minAlpha    - Minimum size of alpha characters
 * @param {number} rules.minNumber   - Minimum of numbers
 * @param {number} rules.minSameChar - Minimum of equal characters
 * @param {boolean} rules.allowSpace - If allow or not whitespace
 * @returns {function(string): any}
 */
function password(rules = null) {
  const isValid = {
    minLength: false,
    maxLength: false,
    minAlpha: false,
    minNumber: false,
    minSameChar: true,
    allowSpace: true
  };

  let callback = null;

  if (truthty(rules)) {
    callback = pwd => {
      if (process.env.NODE_ENV !== 'production') {
        if (rules.minLength < rules.minNumber + rules.minAlpha) {
          console.error(
            "The minLength can't be less than the sum of the minNumber and minAlpha values. It can be equal or more."
          );
          return;
        }

        if (rules.maxLength < rules.minNumber + rules.minAlpha) {
          console.error(
            "The maxLength can't be less than the sum of the minNumber and minAlpha values. It can be only equal."
          );
          return;
        }

        if (rules.maxLength < rules.minLength) {
          console.error(
            "The maxLength can't be less than the minLength. It must be more."
          );
          return;
        }
      }

      const strPwd = pwd;

      isValid.minLength = strPwd.length >= rules.minLength;
      isValid.maxLength = strPwd.length <= rules.maxLength;

      const matchedWords = strPwd.match(/\D+/g).join('');
      isValid.minAlpha = matchedWords.length >= rules.minAlpha;

      const matchedNumbers = strPwd.match(/\d+/g).join('');
      isValid.minNumber = matchedNumbers.length >= rules.minNumber;

      if (rules.minSameChar) {
        const singleKeys = [...new Set(strPwd)].filter(
          s => !Number(s)
        );
        let size = singleKeys.length;
        const tmpPwd = strPwd.slice();

        while (size) {
          size -= 1;
          isValid.minSameChar =
            tmpPwd.split(singleKeys[size]).length - 1 >=
            rules.minSameChar;
        }
      }

      if (!rules.allowSpace) {
        isValid.allowSpace = strPwd.split(/\s+/g).length === 1;
      }

      const isValidPwd = Object.entries(isValid)
        .map(([key, value]) => (!value ? { rule: key, value } : null))
        .filter(v => v !== null);

      return isValidPwd.length === 0 || isValidPwd;
    };
  }

  return callback;
}

const is = Object.freeze({
  moreOrEqual,
  lessOrEqual,
  exactSize,
  password,
  truthty,
  number,
  email,
  falsy,
  alpha,
  nan,
  run,
  url,
  ip
});
const isNot = Object.freeze({
  ip: val => !is.ip(val),
  url: val => !is.url(val),
  nan: val => !is.nan(val),
  alpha: val => !is.alpha(val),
  number: val => !is.number(val)
});

module.exports = new Proxy(is, {
  get(obj, prop) {
    return prop === 'not' ? isNot : obj[prop];
  },
  set(obj, prop) {
    if (process.env.NODE_ENV !== 'production') {
      // This will throw an exception when trying to overwrite any attribute of the Object
      return obj[prop];
    }
  }
});
