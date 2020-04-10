'use strict';

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

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

function upperParagraph(text, byWord = false) {
  const regex = new RegExp('\\.\\s*\\w{1}', 'g');
  let tempText = text;

  if (text) {
    tempText = text.trim().toLowerCase();

    if (byWord) {
      tempText = tempText.split(/\s+/g).map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
    } else {
      tempText = `${tempText[0].toUpperCase()}${tempText.slice(1)}`;

      while (regex.exec(tempText) !== null) {
        tempText = `${tempText.slice(0, regex.lastIndex - 2)}${tempText[regex.lastIndex - 1].toUpperCase()}${tempText.slice(regex.lastIndex)}`;
      }
    }

    tempText = tempText.replace(/\./g, '. ').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
  }

  return tempText;
}

function compose(...func) {
  return (...value) => {
    const firstFunc = func.pop();
    return func.reduce((prevValue, currentValue) => currentValue(prevValue(...value)), firstFunc);
  };
}

function pipe(...func) {
  return func.reduce((prevFunc, currentFunc) => (...values) => currentFunc(prevFunc(...values)));
}

function getGenerator(func, params) {
  const generator = {};
  const size = params.length;
  let iter = 0;

  generator[Symbol.iterator] = function* iterGenerator() {
    while (iter < size) {
      yield func.call(null, params[iter]);
      iter += 1;
    }
  };

  return generator;
}

function pipeVal(func) {
  return (...params) => [...getGenerator(func, params)];
}

module.exports = Object.freeze({
  upperParagraph,
  camelCase,
  compress,
  compose,
  obj2Arr,
  pipeVal,
  clone,
  pipe
});