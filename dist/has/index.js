'use strict';

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.freeze");

var util = require('util');

function someValues(arr, values) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isArray(arr)) {
      console.error('The first paramameter must be an Array.');
      return;
    } else if (!util.isArray(values)) {
      console.error('The second paramameter must be an Array.');
      return;
    }
  }

  var bool = false;
  var size = arr.length;

  for (var index = 0; index < size; index += 1) {
    if (values.indexOf(arr[index]) !== -1) {
      bool = true;
      index = size;
    }
  }

  return bool;
}

function someValue(value, values) {
  if (process.env.NODE_ENV !== 'production') {
    if (!util.isNumber(value) && !util.isString(value) && !util.isBoolean(value)) {
      console.error('The first parameter can only be: String, Number or Boolean.');
      return;
    } else if (!util.isArray(values)) {
      console.error('The second paramameter must be an Array.');
      return;
    }
  }

  return values.indexOf(value) !== -1;
}

function everyValue(value, values) {
  if (process.env.NODE_ENV !== 'production') {
    if (util.isObject(value)) {
      console.error('The first parameter can only be: String, Number or Boolean.');
      return;
    } else if (!util.isArray(values)) {
      console.error('The second paramameter must be an Array.');
      return;
    }
  }

  var bool = false;
  var size = values.length;

  for (var index = 0; index < size; index += 1) {
    bool = values[index] === value;
  }

  return bool;
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

module.exports = Object.freeze({
  valueByKey: valueByKey,
  everyValue: everyValue,
  someValues: someValues,
  someValue: someValue,
  oneValue: oneValue,
  unique: unique
});