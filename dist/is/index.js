'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.last-index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _errorMessage(condition, message) {
  var isOK = true;

  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      console.error(message);
      isOK = false;
    }
  }

  return isOK;
}

function _objLen(value) {
  return (isArray(value) ? value : Object.keys(value)).length;
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isBool(value) {
  return typeof value === 'boolean';
}

function isObject(value) {
  return _typeof(value) === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isArray(value) {
  return Array.isArray(value);
}

function isPromise(value) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(value) === value;
  }

  return false;
}

function isDate(value) {
  return value instanceof Date;
}

function moreOrEqual(value, size) {
  var isMoreOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    var comp = isString(value) ? value.trim().length : _objLen(value);
    var res = comp >= size;

    if (isMoreOnly) {
      res = comp > size;
    }

    return res;
  }
}

function lessOrEqual(value, size) {
  var isLessOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    var comp = isString(value) ? value.trim().length : _objLen(value);
    var res = comp <= size;

    if (isLessOnly) {
      res = comp < size;
    }

    return res;
  }
}

function exactSize(value, size) {
  var isOK = _errorMessage(isNumber(value) || isBool(value), 'Only pass an Object, an Array or an String at the first parameter.');

  if (isOK) {
    return (isString(value) ? value.length : _objLen(value)) === size;
  }
}

function nan(value) {
  return String(value) === 'NaN';
}

function truthy(value) {
  var isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;

    if (isObject(value) && Object.keys(value).length) {
      isTruthy = true;
    } else if (isObject(value) && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
}

function falsy(value) {
  var isFalsy = false;

  if (!isPromise(value) && !value || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && isObject(value)) {
    if (!isDate(value)) {
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
}

function run(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
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
}

function alpha(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
  }
}

function email(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
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
}

function number(value) {
  var num = Number(String(value).trim().replace(/[.,$]/g, ''));
  return nan(num) ? false : isNumber(num);
}

function ip(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    return /\b(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/.test(value);
  }
}

function url(value) {
  var isOK = _errorMessage(!isString(value), 'The given parameter must be an String.');

  if (isOK) {
    var _value$split = value.split(':'),
        _value$split2 = _toArray(_value$split),
        protocol = _value$split2[0],
        rest = _value$split2.slice(1);

    var isValid = false;

    if (protocol === 'http' || protocol === 'https' || protocol === 'ftp') {
      isValid = /^([0-65536]{2,4}|)\/\/[\w\d+-.]+\.\w+([\/\w\?=%;&]|:[0-65536]{2,4})+/.test(rest.join(':'));
    } else if (protocol === 'mailto') {
      var mailTo = value.replace('mailto', '');
      isValid = /^::[\w\d-+]+@[\w\d-+.]+/.test(mailTo);
    }

    return isValid;
  }
}

function password() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var isValid = {
    minLength: false,
    maxLength: false,
    minAlpha: false,
    minNumber: false,
    minSameChar: true,
    allowSpace: true
  };
  var callback = null;

  if (truthy(rules)) {
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
        var singleKeys = _toConsumableArray(new Set(strPwd)).filter(function (s) {
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

      var isValidPwd = Object.entries(isValid).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

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

var is = {
  moreOrEqual: moreOrEqual,
  lessOrEqual: lessOrEqual,
  exactSize: exactSize,
  password: password,
  truthy: truthy,
  number: number,
  email: email,
  falsy: falsy,
  alpha: alpha,
  nan: nan,
  run: run,
  url: url,
  ip: ip,
  function: isFunction,
  promise: isPromise,
  string: isString,
  object: isObject,
  array: isArray,
  date: isDate,
  bool: isBool
};
var isNot = new Proxy(is, {
  get: function get(obj, prop) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !obj[prop].apply(null, args);
    };
  },
  set: function set(obj, prop) {
    if (process.env.NODE_ENV !== 'production') {
      return obj[prop];
    }
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