'use strict';

const util = require('util');

function someValues(arr, values) {
  let bool = false;
  const size = arr.length;

  for (let index = 0; index < size; index += 1) {
    if (values.indexOf(arr[index]) !== -1) {
      bool = true;
      index = size;
    }
  }

  return bool;
}

function someValue(value, values) {
  let result = null;

  if (!util.isArray(values) && process.env.NODE_ENV !== PRODUCTION) {
    throw new Error('The second param should be an Array');
  }

  if (util.isNumber(value) || util.isString(value) || util.isBoolean(value)) {
    result = values.indexOf(value) !== -1;
  } else {
    throw new Error('The first param can only be: string, number or boolean');
  }

  return result;
}

function everyValue(value, values) {
  let bool = false;
  const size = values.length;

  for (let index = 0; index < size; index += 1) {
    bool = values[index] === value;
  }

  return bool;
}

function oneValue(value) {
  return content => content === value;
}

function unique(key) {
  return content => content[key];
}

function valueByKey(key, value) {
  return content => content[key] === value;
}

module.exports = Object.freeze({
  valueByKey,
  everyValue,
  someValues,
  someValue,
  oneValue,
  unique
});