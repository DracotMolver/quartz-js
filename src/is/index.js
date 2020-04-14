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
 * It will check if the given value has a length greater or equal to the given size.
 * it makes strict comparision
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isMoreOnly           - This will check the length of value must be more than the given size.
 * @returns {boolean}
 */
function moreOrEqual(value, size, isMoreOnly = false) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error(
        'Pass only Object, Array or String in the first paramenter.'
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
 * It will check if the given value has a length lower or equal to the given size.
 * it makes strict comparision
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isLessOnly          - This will check the length of value must be more than the given size.
 * @returns {boolean}
 */
function lessOrEqual(value, size, isLessOnly = false) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error(
        'Pass only Object, Array or String in the first paramenter.'
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
 * It will check if the given value has exect the same length as the given size.
 * it makes strict comparision
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
        'Pass only Object, Array or String in the first paramenter.'
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
 * It will check if the given value is NaN.
 *
 * @param {any} value   - Any value to be checked that is NaN.
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
 * @param {string} value - Value to match
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
 * @param {string} value - String to match against with-
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
 * Validates only numbers
 *
 * @param {(string|number)} value - The value to be validated
 * @returns {boolean}
 */
function number(value) {
  return /^\d+$/.test(String(value).trim().replace(/[.,$]/g, ''));
}

/**
 * It will check if the value is a valid ip
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
 * It will check if the url has the right format
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
 * The returned funciton will check later if a password is valid under that policy.
 *
 * @param {object} rules             - The set of rules for your password
 * @param {number} rules.minLength   - Minimun size of characters
 * @param {number} rules.maxLength   - Maximun size of characters
 * @param {number} rules.minAlpha    - Minimun size of alpha characters
 * @param {number} rules.minNumber   - Minimun of numbers
 * @param {number} rules.minSameChar - Minimun of equal characters
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
            "The maxLength can't be less than the minLenght. It must be more."
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
        const singlekeys = [...new Set(strPwd)].filter(
          s => !Number(s)
        );
        let size = singlekeys.length;
        const tmpPwd = strPwd.slice();

        while (size) {
          size -= 1;
          isValid.minSameChar =
            tmpPwd.split(singlekeys[size]).length - 1 >=
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

const handler = {
  get(obj, prop, value) {
    return prop === 'not' ? isNot : obj[prop];
  }
};

if (process.env.NODE_ENV !== 'production') {
  handler.set = function get(obj, prop) {
    // This will throw an exeception when trying to overwrite any attribute of the Object
    return obj[prop];
  };
}

module.exports = new Proxy(is, handler);
