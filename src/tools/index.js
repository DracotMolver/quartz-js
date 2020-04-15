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

/**
 * It will convert the string to a Lower Camel Case format.
 *
 * @example
 * camelCase('user_name'); // userName
 *
 * @param {string} text - The text to be converted.
 * @returns {string}
 */
function camelCase(text) {
  const [firstWord, ...rest] = text.split(/[_-]/);

  const tempRest = rest
    .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
    .join('');

  return `${firstWord[0].toLowerCase()}${firstWord.slice(
    1
  )}${tempRest}`;
}

/**
 * It will make an Array of Objects using the key and value you
 * choose from the given Object or a new Object based on this condition.
 *
 * @param {array} array  - The Array of Object where to extract the keys.
 * @param {string} key   - The name of the attribute to use as a key.
 * @param {string} value - The name of the attribute to use as a value.
 * @returns {object}
 */
function compress(array, key, value) {
  const _maker = base =>
    array.reduce(
      (prev, current) =>
        clone(prev, { [current[key]]: current[value] }),
      base
    );

  return {
    object: () => _maker({}),
    array: () => _maker([])
  };
}

/**
 * It will create an Object into an Array of Objects keeping the original keys of the given Object.
 *
 * @example
 * util.obj2Arr({ b: '3', c: true, d: [4] });
 * // [{ b: '3' }, { c: true }, { d: [4] }]
 *
 * @param {object}  obj - the object to seek for
 * @returns {array}
 */
function obj2Arr(obj) {
  return Object.entries(obj).flatMap(([key, value]) => [
    { [key]: value }
  ]);
}

/**
 * It will merge Arrays or Objects at first level returning a new Object or Array.
 * Be carful with the order of the values you are passing when they are objects.
 *
 * @example
 * clone({a: 'aA'}, {b: 'bB', a: 'AA'});
 * // {a: 'AA', b: 'bB'};
 *
 * @param  {(array|object)} obj1 - The base Array or Object
 * @param  {(array|object)} obj2 - The Array or Object to merge on the base Array or Object.
 * @returns {(array|object)}
 */
function clone(obj1, obj2) {
  return util.isArray(obj1)
    ? obj1.concat(obj2)
    : Object.assign(obj1, obj2);
}

/**
 * It will upper case the first letter of a text. It will look for the first word of
 * a paragraph and any other word after a dot.
 *
 * @param {string} text   - The text to be parsed
 * @param {boolean} byWord - True if you want to upper the first letter of each word
 * @returns {string} The parsed content
 */
function upperParagraph(text, byWord = false) {
  const regex = new RegExp('\\.\\s*\\w{1}', 'g');
  let tempText = text;

  if (text) {
    tempText = text.trim().toLowerCase();

    if (byWord) {
      tempText = tempText
        .split(/\s+/g)
        .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(' ');
    } else {
      tempText = `${tempText[0].toUpperCase()}${tempText.slice(1)}`;

      while (regex.exec(tempText) !== null) {
        tempText = `${tempText.slice(
          0,
          regex.lastIndex - 2
        )}${tempText[
          regex.lastIndex - 1
        ].toUpperCase()}${tempText.slice(regex.lastIndex)}`;
      }
    }

    tempText = tempText
      .replace(/\./g, '. ')
      .replace(/,/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return tempText;
}

/**
 * It will receive several function that are going to `compose` into one function.
 * If you add more than one value, only the first function will receive them and
 * the result of it will be passed down to the rest of the functions.
 * This is read from right to left.
 *
 * You can pass multiple variables, but then the result of the first function
 * will be passing through the rest of the functions.
 *
 * @param {array} func            - A set of functions
 * @returns {function(any): any} - A function that will accept only one param.
 */
function compose(...func) {
  return (...value) => {
    const firstFunc = func.pop();

    return func.reduce(
      (prevValue, currentValue) => currentValue(prevValue(...value)),
      firstFunc
    );
  };
}

/**
 * It will concat and execute several functions to the given values.
 * If you add more than one value, only the first function will receive them and
 * the result of it will be passed down to the rest of the functions.
 * This is read from left to right.
 *
 * @param {array} func            - All the Functions to be executed.
 * @returns {function(any): any} - The result of passing all the values through the functions.
 */
function pipe(...func) {
  return func.reduce((prevFunc, currentFunc) => (...values) =>
    currentFunc(prevFunc(...values))
  );
}

function getGenerator(func, params) {
  const generator = {};
  const size = params.length;
  let iter = 0;

  // Return an object with with key as an Iterator and the value a
  // function generator which is an Iterator.
  generator[Symbol.iterator] = function* iterGenerator() {
    while (iter < size) {
      yield func.call(null, params[iter]);
      iter += 1;
    }
  };

  return generator;
}

/**
 * It will call a single function for several independents values.
 * It will return array of N values.
 *
 * @param {function} func         - The function to use.
 * @returns {function(any): any} - The result of passing all the values through the function.
 */
function pipeVal(func) {
  return (...params) => [...getGenerator(func, params)];
}

// formatter
// humanize some values

/**
 * It will remove a property from an Object based on the given key.
 * This is only for Object, don't try to remove a property from an Object within an Array.
 *
 * 1.- It removes the property based on one key at FIRST level.
 * 
 * 2.- Remove the properties based on more than one key at FIRST level.
 *     You must pass an array containing the keys to remove.
 * 
 * 3.- Remove the property based on one key at N level (nested) using a dot notation.
 * 
 * @param {object} object - The Object that you want to remove the values from.
 * @param {(string|array)} keys - The key(s) to remove from the Object.
 * @returns {object}
 */
function rmAttrFromObj(obj, keys) {
  let tmp = { ...obj };

  // Simple searching
  if (util.isString(keys)) {
    const _keys = keys.split('.');

    if (_keys.length === 1) {
      const { [_keys[0]]: dropVar, ...rest } = tmp;
      tmp = rest;
    } else {
      const size = _keys.length - 1;

      const tmpObj = { ...obj };
      tmp = tmpObj;

      for (let iter = 0; iter < size; iter += 1) {
        if (iter === size - 1) {
          const { [_keys[size]]: dropVar, ...rest } = tmp[
            _keys[iter]
          ];

          tmp[_keys[iter]] = rest;
        } else {
          tmp = tmp[_keys[iter]];
        }
      }
    }
  } else if (util.isArray(keys)) {
    const size = keys.length;

    for (let iter = 0; iter < size; iter += 1) {
      const { [keys[iter]]: dropVar, ...rest } = tmp;
      tmp = rest;
    }
  }

  return tmp;
}

module.exports = Object.freeze({
  upperParagraph,
  rmAttrFromObj,
  camelCase,
  compress,
  compose,
  obj2Arr,
  pipeVal,
  clone,
  pipe
});
