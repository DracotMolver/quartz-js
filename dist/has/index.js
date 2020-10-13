'use strict';

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.freeze");

var is = require('../is');

function _errorMessage(condition, message) {
  var isOK = true;

  if (process.env.NODE_ENV !== 'production') {
    if (is.array(condition)) {
      var errorMsg = '';

      for (var iter = 0, size = condition.length; iter < size; iter += 1) {
        if (condition[iter]) {
          errorMsg = message[iter];
          isOK = false;
          break;
        }
      }

      console.error(errorMsg);
    } else if (condition) {
      console.error(message);
      isOK = false;
    }
  }

  return isOK;
}

function someValues(arr, values) {
  var isOK = _errorMessage([is.not.array(arr), is.not.array(values)], ['The first parameter must be an Array.', 'The second parameter must be an Array.']);

  if (isOK) {
    var size = arr.length;
    var bool = false;

    for (var index = 0; index < size; index += 1) {
      if (values.indexOf(arr[index]) !== -1) {
        bool = true;
        index = size;
      }
    }

    return bool;
  }
}

function singleValue(value, values) {
  var isOK = _errorMessage([is.object(value), is.not.array(values)], ['The first parameter can only be: String, Number or Boolean.', 'The second parameter must be an Array.']);

  if (isOK) {
    return values.indexOf(value) !== -1;
  }
}

function everyValue(value, values) {
  var isOK = _errorMessage([is.object(value), is.not.array(values)], ['The first parameter can only be: String, Number or Boolean.', 'The second parameter must be an Array.']);

  if (isOK) {
    var bool = false;
    var size = values.length;

    for (var index = 0; index < size; index += 1) {
      bool = values[index] === value;
    }

    return bool;
  }
}

function oneValue(value) {
  return function (content) {
    return content === value;
  };
}

function unique(key) {
  return function (content) {
    return content[key];
  };
}

function valueByKey(key, value) {
  return function (content) {
    return content[key] === value;
  };
}

function valuesByKeys(keys, values) {
  return function (content) {
    var isExist = false;
    var size = keys.length;

    for (var iter = 0; iter < size; iter += 1) {
      isExist = content[keys[iter]] === values[iter];

      if (!isExist) {
        iter = size;
      }
    }

    return isExist;
  };
}

module.exports = Object.freeze({
  valuesByKeys: valuesByKeys,
  singleValue: singleValue,
  valueByKey: valueByKey,
  everyValue: everyValue,
  someValues: someValues,
  oneValue: oneValue,
  unique: unique
});