'use strict';

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.string.split");

const util = require('util');

function camelCase(text) {
  const [firstWord, ...rest] = text.split(/[_-]/);
  const tempRest = rest.map(str => `${str[0].toUpperCase()}${str.slice(1)}`).join('');
  return `${firstWord[0].toLowerCase()}${firstWord.slice(1)}${tempRest}`;
}

function compress(array, key, value) {
  const _maker = base => array.reduce((prev, current) => clone(prev, {
    [current[key]]: current[value]
  }), base);

  return {
    object: () => _maker({}),
    array: () => _maker([])
  };
}

function obj2Arr(obj) {
  return Object.entries(obj).flatMap(([key, value]) => [{
    [key]: value
  }]);
}

function clone(obj1, obj2) {
  return util.isArray(obj1) ? obj1.concat(obj2) : Object.assign(obj1, obj2);
}

module.exports = {
  camelCase,
  compress,
  obj2Arr,
  clone
};