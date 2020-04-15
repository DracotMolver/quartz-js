/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */
'use strict';
var util = require('util');
/**
 * It checkss if the values on the first Array exist, at least one of them, in the second Array.
 * It Doesn't work with Array of Objects. For that case use the `someValuesByKey` function.
 *
 * @example
 * has.someValues([1, 2, 3], [1, 5, 4, 3, 10]);
 * // true
 *
 * @param {array} arr    - An Array of values to used against the second param
 * @param {array} values - The values that are gonna be searched.
 * @returns {boolean}
 */
function someValues(arr, values) {
    if (process.env.NODE_ENV !== 'production') {
        if (!util.isArray(arr)) {
            console.error('The first parameter must be an Array.');
            return;
        }
        else if (!util.isArray(values)) {
            console.error('The second parameter must be an Array.');
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
/**
 * It checks a single value against N values until find one match.
 * Doesn't work with Array of Objects, for that use the `someValueByKey` function
 *
 * @example
 * has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo']);
 * // true
 *
 * @param {string|boolean|number} value - The value to match against with.
 * @param {array} values                  - All the values to match
 * @returns {boolean}
 */
function someValue(value, values) {
    if (process.env.NODE_ENV !== 'production') {
        if (!util.isNumber(value) &&
            !util.isString(value) &&
            !util.isBoolean(value)) {
            console.error('The first parameter can only be: String, Number or Boolean.');
            return;
        }
        else if (!util.isArray(values)) {
            console.error('The second parameter must be an Array.');
            return;
        }
    }
    return values.indexOf(value) !== -1;
}
/**
 * It checks that the given value is present in all the rest of the values.
 *
 * @param {(boolean|string|number)} value    - The value to look for
 * @param {array} values - An array of possible values.
 * @returns {boolean}
 */
function everyValue(value, values) {
    if (process.env.NODE_ENV !== 'production') {
        if (util.isObject(value)) {
            console.error('The first parameter can only be: String, Number or Boolean.');
            return;
        }
        else if (!util.isArray(values)) {
            console.error('The second parameter must be an Array.');
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
/**
 * High Order Function to be with filter and map.
 * Doesn't work with Array of object, for that use the `unique` function
 *
 * @example
 * [1, 2, 3].filter(has.oneValue(2));
 * // [2];
 *
 * @param {any} value                - Any value to use as a seed to filter.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
function oneValue(value) {
    return function (content) { return content === value; };
}
/**
 * High Order Function to be used with filter and map.
 * It return the first value of a given key that return `truthty`.
 *
 * @example
 * [{name: 'john', age: 0}, {name: 'dee', age: 20}].map(util.unique('age'));
 * // [20]
 *
 * @param {any} key                  - The key looking for on the object.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
function unique(key) {
    return function (content) { return content[key]; };
}
/**
 * It checks if one of the values is equal to the one got from using the `Key`.
 * This function is for using it with Array of Objects.
 *
 * @example
 * [{id: 1}, {id: 2}, {id: 3}, {id: 3}].filter(valueByKey('id', 3));
 * // [{id: 3}, {id: 3}];
 *
 * @param {string} key               - The key of the Object.
 * @param {string} value             - The value to be compared.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
function valueByKey(key, value) {
    return function (content) { return content[key] === value; };
}
/**
 * It checks if the Array of Object has the respective values based on the given keys.
 * The first key on the first given param is the key that will compare the value of the first value of the second param.
 *
 * @param {array} keys - They keys of the Object.
 * @param {array} values - They values to be compared.
 */
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
    valueByKey: valueByKey,
    everyValue: everyValue,
    someValues: someValues,
    someValue: someValue,
    oneValue: oneValue,
    unique: unique
});
