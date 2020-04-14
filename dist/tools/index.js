/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */
'use strict';
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var util = require('util');
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
    var _a = text.split(/[_-]/), firstWord = _a[0], rest = _a.slice(1);
    var tempRest = rest
        .map(function (str) { return "" + str[0].toUpperCase() + str.slice(1); })
        .join('');
    return "" + firstWord[0].toLowerCase() + firstWord.slice(1) + tempRest;
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
    var _maker = function (base) {
        return array.reduce(function (prev, current) {
            var _a;
            return clone(prev, (_a = {}, _a[current[key]] = current[value], _a));
        }, base);
    };
    return {
        object: function () { return _maker({}); },
        array: function () { return _maker([]); }
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
    return Object.entries(obj).flatMap(function (_a) {
        var _b;
        var key = _a[0], value = _a[1];
        return [
            (_b = {}, _b[key] = value, _b)
        ];
    });
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
function upperParagraph(text, byWord) {
    if (byWord === void 0) { byWord = false; }
    var regex = new RegExp('\\.\\s*\\w{1}', 'g');
    var tempText = text;
    if (text) {
        tempText = text.trim().toLowerCase();
        if (byWord) {
            tempText = tempText
                .split(/\s+/g)
                .map(function (word) { return "" + word[0].toUpperCase() + word.slice(1); })
                .join(' ');
        }
        else {
            tempText = "" + tempText[0].toUpperCase() + tempText.slice(1);
            while (regex.exec(tempText) !== null) {
                tempText = "" + tempText.slice(0, regex.lastIndex - 2) + tempText[regex.lastIndex - 1].toUpperCase() + tempText.slice(regex.lastIndex);
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
function compose() {
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    return function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        var firstFunc = func.pop();
        return func.reduce(function (prevValue, currentValue) { return currentValue(prevValue.apply(void 0, value)); }, firstFunc);
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
function pipe() {
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    return func.reduce(function (prevFunc, currentFunc) { return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return currentFunc(prevFunc.apply(void 0, values));
    }; });
}
function getGenerator(func, params) {
    var generator = {};
    var size = params.length;
    var iter = 0;
    // Return an object with with key as an Iterator and the value a
    // function generator which is an Iterator.
    generator[Symbol.iterator] = function iterGenerator() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(iter < size)) return [3 /*break*/, 2];
                    return [4 /*yield*/, func.call(null, params[iter])];
                case 1:
                    _a.sent();
                    iter += 1;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
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
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __spreadArrays(getGenerator(func, params));
    };
}
// formatter
// humanize some values
// /**
//  * It will remove a property from an object based on the given key.
//  * It has three ways to work:
//  * 1.- Remove the property based on one given key but at FIRST level
//  * 2.- Remove the properties based on more than one given keys but at FIRST level.
//  *     You must pass an array containing the keys to remove.
//  * 3.- Remove the property based on one given key but the attribute can be nested (N level).
//  *     You must pass `true` as the third value. You must pass an array that follows te chain
//  *     of the nested keys from the very first one.
//  *
//  * @example
//  * const obj = {age: 22, names: {firstName: 'John', lastName: 'Doeh'}, email: 'test@test.ts'};
//  * // remove one key
//  * rmKey(obj, 'age'); // {names: {firstName: 'John',lastName: 'Doeh'}}
//  * // remove one key
//  * rmKey(obj, ['age', 'names']); // {email: 'test@test.ts'}
//  * // remove one key but nested
//  * rmKey(obj, ['names', 'lastName'], true);
//  * // {age: 22, names: {firstName: 'John'}, email: 'test@test.ts'}
//  *
//  * @param {object} object The object to check and removed its key
//  * @param {(string|array)} keys The key(s) to remove from the object
//  * @param {boolean} isNested Default false, if `true` is passed it will search for a nested key
//  */
// function rmKey(object, keys, isNested = false) {
//   let tmp = { ...object };
//   let dropVar = null;
//   if (Array.isArray(keys) && !isNested) {
//     for (let index = 0, size = keys.length; index < size; index += 1) {
//       ({ [keys[index]]: dropVar, ...tmp } = tmp);
//     }
//   } else if (isNested) {
//     const strKey = keys.map(key => `"${key}":.+`).join('');
//     const match = JSON.stringify(object).match(new RegExp(`${strKey}(?=(},|",|[\d\w]}))`));
//     const replaceFor = match[0].replace(new RegExp(`"${keys[keys.length - 1]}".+`), '');
//     tmp = JSON.parse(JSON.stringify(object).replace(match[0], replaceFor));
//   } else {
//     // one single key
//     ({ [keys]: dropVar, ...tmp } = tmp);
//   }
//   return tmp;
// }
module.exports = Object.freeze({
    upperParagraph: upperParagraph,
    camelCase: camelCase,
    compress: compress,
    compose: compose,
    obj2Arr: obj2Arr,
    pipeVal: pipeVal,
    clone: clone,
    pipe: pipe
});
