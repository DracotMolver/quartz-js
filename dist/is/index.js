'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.last-index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var util = require('util');

function _objLen(value) {
  return (util.isArray(value) ? Object.values(value) : Object.keys(value)).length;
}

function moreOrEqual(value, size, isMoreOnly) {
  if (isMoreOnly === void 0) {
    isMoreOnly = false;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error('Pass only Object, Array or String in the first parameter.');
      return;
    }
  }

  var comp = util.isString(value) ? value.trim().length : _objLen(value);
  var res = comp >= size;

  if (isMoreOnly) {
    res = comp > size;
  }

  return res;
}

function lessOrEqual(value, size, isLessOnly) {
  if (isLessOnly === void 0) {
    isLessOnly = false;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error('Pass only Object, Array or String in the first parameter.');
      return;
    }
  }

  var comp = util.isString(value) ? value.trim().length : _objLen(value);
  var res = comp <= size;

  if (isLessOnly) {
    res = comp < size;
  }

  return res;
}

function exactSize(value, size) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isNumber(value)) {
      console.error('Pass only Object, Array or String in the first parameter.');
      return;
    }
  }

  return (util.isString(value) ? value.trim().length : _objLen(value)) === size;
}

function nan(value) {
  return String(value) === 'NaN';
}

function truthty(value) {
  var isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;

    if (_typeof(value) === 'object' && Object.keys(value).length) {
      isTruthy = true;
    } else if (_typeof(value) === 'object' && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
}

function falsy(value) {
  var isFalsy = false;

  function isPromise(object) {
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) === object;
    }
  }

  if (!isPromise(value) && !value || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && _typeof(value) === 'object') {
    if (!(value instanceof Date)) {
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
}

function run(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  var text = value.toLowerCase().trim().replace(/[.-]/g, '');
  var counter = 2;
  var total = 0;
  var size = text.length - 2;

  for (; size >= 0; size--, counter += 1) {
    if (counter > 7) {
      counter = 2;
    }

    total += Number(text[size]) * counter;
  }

  total = Number(11 - (total - 11 * Math.floor(total / 11)));
  var digit = String(total);

  if (total === 11) {
    digit = '0';
  } else if (total === 10) {
    digit = 'k';
  }

  return digit === text.slice(-1);
}

function alpha(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
}

function email(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  var isEmail = true;

  if (/^[a-z\d\!#\$%&'.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(value.toLowerCase())) {
    var lastPosition = value.lastIndexOf('@');
    var localPart = value.slice(0, lastPosition);
    var domainPart = value.slice(lastPosition + 1, value.length);

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

function ip(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  return /\b(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/.test(value);
}

function url(value) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isString(value)) {
      console.error('The given parameter must be an String.');
      return;
    }
  }

  var _a = value.split(':'),
      protocol = _a[0],
      rest = _a.slice(1);

  var isValid = false;

  if (protocol === 'http' || protocol === 'https' || protocol === 'ftp') {
    isValid = /^([0-65536]{2,4}|)\/\/[\w\d+-.]+\.\w+([\/\w\?=%;&]|:[0-65536]{2,4})+/.test(rest.join(':'));
  } else if (protocol === 'mailto') {
    var mailTo = value.replace('mailto', '');
    isValid = /^::[\w\d-+]+@[\w\d-+.]+/.test(mailTo);
  }

  return isValid;
}

function password(rules) {
  if (rules === void 0) {
    rules = null;
  }

  var isValid = {
    minLength: false,
    maxLength: false,
    minAlpha: false,
    minNumber: false,
    minSameChar: true,
    allowSpace: true
  };
  var callback = null;

  if (truthty(rules)) {
    callback = function callback(pwd) {
      if (process.env.NODE_ENV !== 'production') {
        if (rules.minLength < rules.minNumber + rules.minAlpha) {
          console.error("The minLength can't be less than the sum of the minNumber and minAlpha values. It can be equal or more.");
          return;
        }

        if (rules.maxLength < rules.minNumber + rules.minAlpha) {
          console.error("The maxLength can't be less than the sum of the minNumber and minAlpha values. It can be only equal.");
          return;
        }

        if (rules.maxLength < rules.minLength) {
          console.error("The maxLength can't be less than the minLength. It must be more.");
          return;
        }
      }

      var strPwd = pwd;
      isValid.minLength = strPwd.length >= rules.minLength;
      isValid.maxLength = strPwd.length <= rules.maxLength;
      var matchedWords = strPwd.match(/\D+/g).join('');
      isValid.minAlpha = matchedWords.length >= rules.minAlpha;
      var matchedNumbers = strPwd.match(/\d+/g).join('');
      isValid.minNumber = matchedNumbers.length >= rules.minNumber;

      if (rules.minSameChar) {
        var singleKeys = __spreadArrays(new Set(strPwd)).filter(function (s) {
          return !Number(s);
        });

        var size = singleKeys.length;
        var tmpPwd = strPwd.slice();

        while (size) {
          size -= 1;
          isValid.minSameChar = tmpPwd.split(singleKeys[size]).length - 1 >= rules.minSameChar;
        }
      }

      if (!rules.allowSpace) {
        isValid.allowSpace = strPwd.split(/\s+/g).length === 1;
      }

      var isValidPwd = Object.entries(isValid).map(function (_a) {
        var key = _a[0],
            value = _a[1];
        return !value ? {
          rule: key,
          value: value
        } : null;
      }).filter(function (v) {
        return v !== null;
      });
      return isValidPwd.length === 0 || isValidPwd;
    };
  }

  return callback;
}

var is = Object.freeze({
  moreOrEqual: moreOrEqual,
  lessOrEqual: lessOrEqual,
  exactSize: exactSize,
  password: password,
  truthty: truthty,
  number: number,
  email: email,
  falsy: falsy,
  alpha: alpha,
  nan: nan,
  run: run,
  url: url,
  ip: ip
});
var isNot = Object.freeze({
  ip: function ip(val) {
    return !is.ip(val);
  },
  url: function url(val) {
    return !is.url(val);
  },
  nan: function nan(val) {
    return !is.nan(val);
  },
  alpha: function alpha(val) {
    return !is.alpha(val);
  },
  number: function number(val) {
    return !is.number(val);
  }
});
module.exports = new Proxy(is, {
  get: function get(obj, prop) {
    return prop === 'not' ? isNot : obj[prop];
  },
  set: function set(obj, prop) {
    if (process.env.NODE_ENV !== 'production') {
      return obj[prop];
    }
  }
});