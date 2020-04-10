'use strict';

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

const util = require('util');

function _objLen(value) {
  return (util.isArray(value) ? Object.values(value) : Object.keys(value)).length;
}

function moreOrEqual(value, size, isMoreOnly = false) {
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number is not allowed to be checked');
  }

  const comp = util.isString(value) ? value.trim().length : _objLen(value);
  let res = comp >= size;

  if (isMoreOnly) {
    res = comp > size;
  }

  return res;
}

function lessOrEqual(value, size, isLessOnly = false) {
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number is not allowed to be checked');
  }

  const comp = util.isString(value) ? value.trim().length : _objLen(value);
  let res = comp <= size;

  if (isLessOnly) {
    res = comp < size;
  }

  return res;
}

function exactSize(value, size) {
  if (util.isNumber(value) && process.env.NODE_ENV !== 'production') {
    throw Error('Type number are not allowed to be checked');
  }

  return (util.isString(value) ? value.trim().length : _objLen(value)) === size;
}

function nan(value) {
  return String(value) === 'NaN';
}

function truthty(value) {
  let isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;

    if (typeof value === 'object' && Object.keys(value).length) {
      isTruthy = true;
    } else if (typeof value === 'object' && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
}

function falsy(value) {
  let isFalsy = false;

  function isPromise(object) {
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) === object;
    }
  }

  if (!isPromise(value) && !value || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && typeof value === 'object') {
    if (!(value instanceof Date)) {
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
}

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

function alpha(value) {
  if (!util.isString(value) && process.env.NODE_ENV !== 'production') {
    throw Error('The value must be an string');
  }

  return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
}

function email(value) {
  let isEmail = true;

  if (/^[a-z\d\!#\$%&'.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(value.toLowerCase())) {
    const lastPosition = value.lastIndexOf('@');
    const localPart = value.slice(0, lastPosition);
    const domainPart = value.slice(lastPosition + 1, value.length);

    if (/^[.,]|[.,]$/.test(localPart)) {
      isEmail = false;
    } else if (/(\.{2,}|["\(\),\:;<>\[\\\]]|@+?)/g.test(localPart) && localPart.slice(0, 1) !== '"' && localPart.slice(-1) !== '"') {
      isEmail = false;
    }

    if (isEmail) {
      isEmail = /^[\-]|[\-]$/.test(domainPart) ? false : true;
    }
  } else {
    isEmail = false;
  }

  return isEmail;
}

function number(value) {
  return /^\d+$/.test(String(value).trim().replace(/[.,$]/g, ''));
}

function ip(ip) {
  return /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/.test(ip);
}

function url(value) {
  const [protocol, ...rest] = value.split(':');
  let isValid = false;

  if (protocol === 'http' || protocol === 'https' || protocol === 'ftp') {
    isValid = /^([0-65536]{2,4}|)\/\/[\w\d+-.]+\.\w+([\/\w\?=%;&]|:[0-65536]{2,4})+/.test(rest.join(':'));
  } else if (protocol === 'mailto') {
    const mailTo = value.replace('mailto', '');
    isValid = /^::[\w\d-+]+@[\w\d-+.]+/.test(mailTo);
  }

  return isValid;
}

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
          throw Error("The minLength can't be less than the sum of the minNumber and minAlpha values. It can be equal or more.");
        }

        if (rules.maxLength < rules.minNumber + rules.minAlpha) {
          throw Error("The maxLength can't be less than the sum of the minNumber and minAlpha values. It can be only equal.");
        }

        if (rules.maxLength < rules.minLength) {
          throw Error("The maxLength can't be less than the minLenght. It must be more.");
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
        const singlekeys = [...new Set(strPwd)].filter(s => !Number(s));
        let size = singlekeys.length;
        const tmpPwd = strPwd.slice();

        while (size) {
          size -= 1;
          isValid.minSameChar = tmpPwd.split(singlekeys[size]).length - 1 >= rules.minSameChar;
        }
      }

      if (!rules.allowSpace) {
        isValid.allowSpace = strPwd.split(/\s+/g).length === 1;
      }

      const isValidPwd = Object.entries(isValid).map(([key, value]) => !value ? {
        rule: key,
        value
      } : null).filter(v => v !== null);
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
  get(obj, prop) {
    return prop === 'not' ? isNot : obj[prop];
  }

};
module.exports = new Proxy(is, handler);