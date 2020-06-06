declare const _exports: {
    readonly moreOrEqual: typeof moreOrEqual;
    readonly lessOrEqual: typeof lessOrEqual;
    readonly exactSize: typeof exactSize;
    readonly password: typeof password;
    readonly truthy: typeof truthy;
    readonly number: typeof number;
    readonly email: typeof email;
    readonly falsy: typeof falsy;
    readonly alpha: typeof alpha;
    readonly nan: typeof nan;
    readonly run: typeof run;
    readonly url: typeof url;
    readonly ip: typeof ip;
};
export = _exports;
/**
 * It validates if the given value has a length greater or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isMoreOnly          - If you want to only validates that the length of value is more than the given size.
 * @returns {boolean}
 */
declare function moreOrEqual(value: (object | any[] | string), size: number, isMoreOnly?: boolean): boolean;
/**
 * It validates if the given value has a length lower or equal to the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @param {(object|array|string)} value - The value to evaluate its length.
 * @param {number} size                 - The seed we will use to compare.
 * @param {boolean} isLessOnly          - If you want to only validates that the length of value is less than the given size.
 * @returns {boolean}
 */
declare function lessOrEqual(value: (object | any[] | string), size: number, isLessOnly?: boolean): boolean;
/**
 * It validates if the given value has the exact length as the given size.
 * It makes use of strict comparison. Use it only with `String`, `Object`, and `Array`.
 *
 * @example
 * exactSize([1, 2, 3, 4], 4); // true
 * exactSize({a: { c: 2 }, b: 'hello'}, 2); // true
 *
 * @param {(object|array|string)} value - The value to evaluate.
 * @param {number} size                 - The seed we will use to compare.
 * @returns {boolean}
 */
declare function exactSize(value: (object | any[] | string), size: number): boolean;
/**
 * It will set up a Password Strength Policy.
 * The returned function will check later if a password is valid under that policy.
 *
 * @param {object} rules             - The set of rules for your password
 * @param {number} rules.minLength   - Minimum size of characters
 * @param {number} rules.maxLength   - Maximum size of characters
 * @param {number} rules.minAlpha    - Minimum size of alpha characters
 * @param {number} rules.minNumber   - Minimum of numbers
 * @param {number} rules.minSameChar - Minimum of equal characters
 * @param {boolean} rules.allowSpace - If allow or not whitespace
 * @returns {function(string): any}
 */
declare function password(rules?: {
    minLength: number;
    maxLength: number;
    minAlpha: number;
    minNumber: number;
    minSameChar: number;
    allowSpace: boolean;
}): (arg0: string) => any;
/**
 * It validates if a value is truthy but with slight modifications for Object and Array.
 *
 * @example
 * | type    | description                     |
 * |---------|---------------------------------|
 * | Objects | "{}" => false. "{a: 2}" => true |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => false. "[2]" => true    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked.
 * @returns {boolean}
 */
declare function truthy(value: any): boolean;
/**
 * It validates that the given value has only numbers.
 *
 * @param {(string|number)} value Value to match if it's valid.
 * @returns {boolean}
 */
declare function number(value: (string | number)): boolean;
/**
 * Validates if the value is a well formed email.
 *
 * @param {string} value - The email to check if it's valid
 * @returns {boolean}
 */
declare function email(value: string): boolean;
/**
 * It validates if a value is falsy but with slight modifications for Object and Array.
 *
 * @example
 * | type    |  description                    |
 * |---------|---------------------------------|
 * | Objects | "{}" => true. "{a: 2}" => false |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => true. "[2]" => false    |
 * |---------|---------------------------------|
 *
 * @param {any} value - Any value to be checked
 * @returns {boolean}
 */
declare function falsy(value: any): boolean;
/**
 * Validates that the given value has only words.
 *
 * @param {string} value - Value to match if it's valid
 * @returns {boolean}
 */
declare function alpha(value: string): boolean;
/**
 * It validates if the given value is NaN.
 *
 * @param {any} value - Any value to be checked that is NaN.
 * @returns {boolean}
 */
declare function nan(value: any): boolean;
/**
 * It validates if the given R.U.N is valid. - Chile ID.
 *
 * @param {string} value The given R.U.N.
 * @returns {boolean}
 */
declare function run(value: string): boolean;
/**
 * It validates if the value is a valid well formed URL.
 * based on: https://www.w3.org/Addressing/URL/url-spec.txt
 *
 * @example
 * is.url('http://google.cl');
 *
 * @param {string} value - An URL.
 * @return {boolean}
 */
declare function url(value: string): boolean;
/**
 * It validates if the value is a valid well formed ip.
 *
 * @param {string} value - The ip to be checked.
 * @return {boolean}
 */
declare function ip(value: string): boolean;
