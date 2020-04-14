declare const _exports: {
    readonly valueByKey: typeof valueByKey;
    readonly everyValue: typeof everyValue;
    readonly someValues: typeof someValues;
    readonly someValue: typeof someValue;
    readonly oneValue: typeof oneValue;
    readonly unique: typeof unique;
};
export = _exports;
/**
 * It will check if one of the values is equal to the one got from using the `Key`.
 * This funciton is for using it with Array of Objects.
 *
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(valueByKey('id', 3));
 * // [{id: 3}]
 *
 * @param {string} key               - The key of the object.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
declare function valueByKey(key: string, value: any): (arg0: any) => boolean;
/**
 * It will check that the given value is present in all the rest of the values.
 *
 * @param {(boolean|string|number)} value    - The value to look for
 * @param {array} values - An array of possible values.
 * @returns {boolean}
 */
declare function everyValue(value: string | number | boolean, values: any[]): boolean;
/**
 * It will check if the values on the first Array exist at least one of them
 * in the second Array.
 * Doesn't work with Array of Objects, for that use `someValuesByKey` function
 *
 * @example
 * has.someValues([1, 2, 3], [1, 5, 4, 3, 10]);
 * // true
 *
 * @param {array} arr    - An Array of values to used against the second param
 * @param {array} values - The values that are gonna be searched.
 * @returns {boolean}
 */
declare function someValues(arr: any[], values: any[]): boolean;
/**
 * It will check a single value against N values until find one match.
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
declare function someValue(value: string | number | boolean, values: any[]): boolean;
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
declare function oneValue(value: any): (arg0: any) => boolean;
/**
 * High Order Function to be used with filter and map.
 * It will return the first value of a given key that return `truthty`.
 *
 * @example
 * [{name: 'john', age: 0}, {name: 'dee', age: 20}].map(util.unique('age'));
 * // [20]
 *
 * @param {any} key                  - The key looking for on the object.
 * @returns {function(any): boolean} - A function that will accept only one param.
 */
declare function unique(key: any): (arg0: any) => boolean;
