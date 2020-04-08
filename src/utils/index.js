/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */

'use strict';

const util = require('util');

/**
 * It will convert the string as a Lower Camel Case
 *
 * @example
 * camelCase('user_name'); // userName
 *
 * @param {string} text - The text to converted
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
 * @param {array} array  - The Array where to work on
 * @param {string} key   - The name of the atribute to use as a key
 * @param {string} value - The name of the atribute to use as a value
 * @returns {array}      - A new Array of objects
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
 * It will create an object into an array of objects keeping the original keys of the object.
 *
 * @example
 * util.obj2Arr({ b: '3', c: true, d: [4] });
 * // [{ b: '3' }, { c: true }, { d: [4] }]
 *
 * @param {object}  - obj the object to seek for
 * @returns {array} - An array of objects
 */
function obj2Arr(obj) {
  return Object.entries(obj).flatMap(([key, value]) => [
    { [key]: value }
  ]);
}

/**
 * It will merge Arrays or Objects at first level returning a new Object or Array.
 * Be carful with the order of the elements you are passing when they are objects.
 *
 * @example
 * clone({a: 'aA'}, {b: 'bB', a: 'AA'});
 * // {a: 'AA', b: 'bB'};
 *
 * @param  {(array|object)} obj The elements to merge
 * @returns {(array|object)}
 */
function clone(obj1, obj2) {
  return util.isArray(obj1)
    ? obj1.concat(obj2)
    : Object.assign(obj1, obj2);
}

module.exports = {
  camelCase,
  compress,
  obj2Arr,
  clone
};
