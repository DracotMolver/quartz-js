/**
 * QUARTZ.JS
 *
 * A very useful library with fancy functions
 * @copyright Diego Molina Vera - 2018.
 */
// -=====================================================-
// ------------------------------------------------------------------
// -                              compose                           -
// ------------------------------------------------------------------
const unique = fn => value => fn(value);

// ------------------------------------------------------------------
// -                              compose                           -
// ------------------------------------------------------------------
/**
 * It will recive several function that are gonna compose into one function.
 * This is read from right-to-left.
 * 
 * @param {function} func - Functions
 * @return {function} - A composed function to pass one value
 */
const compose = (...func) =>
    (...value) => {
        const firstFunc = func.pop();

        return func.reduce((prevValue, currentValue) =>
            currentValue(prevValue(...value))
            , firstFunc);
    };

// ------------------------------------------------------------------
// -                              pipe                              -
// ------------------------------------------------------------------
const pipReduce = (prevFunc, currentFunc) =>
    (...values) =>
        currentFunc(prevFunc(...values));

/**
 * It will concat and execute several functions synchronously the givens values.
 * If you add more than one value, only the first function will recive them and
 * the result of it will be passed down to the rest of the functions
 *
 * @param {function} func - Functions.
 * @return {function} - The result of passing all the values through
 *               the functions.
 */
const pipe = (...func) =>
    func.reduce(pipReduce);

// ------------------------------------------------------------------
// -                              isIn                              -
// ------------------------------------------------------------------
const isValidValue = value => typeof value !== 'object';

const isInArray = (element, values) =>
    values.every(value => element.includes(value));

const isInObject = (element, values) => {
    const parsedElement = JSON.stringify(element);

    return values.every(value => (
        (new RegExp(`"${value}":`, 'g')).test(parsedElement)
    ));
};

/**
 * It will check and return wether or not the value(s) exist on the
 * given object or array. For the object it will look for the attribute (key)
 * and not the value (hasOwnProperty).
 *
 * Valid values are:
 * - String
 * - Number
 * - Boolean
 *
 * @param {object} element - The object to search in.
 * @param {string} values - The value(s) to search for separated by comma.
 * @return {boolean} - if you pass more than one value, it will check that exists
 *                     all the values to return `true`, otherwise it will return `false`.
 */
const isIn = (element, ...values) => {
    const functions = {
        isInArray,
        isInObject
    };

    // Check the values
    const notValidValues = values.every(value => isValidValue(value));
    if (isNot(notValidValues)) {
        throw Error('Type objects are not allowed to be checked');
    }

    return functions[`isIn${Array.isArray(element) ? 'Array' : 'Object'}`](element, values);
};

// ------------------------------------------------------------------
// -                           pipeValues                           -
// ------------------------------------------------------------------
const getGenerator = (func, params) => {
    const generator = {};
    let size = params.length - 1;

    // Return an object with with key as an Iterator and the value a
    // function generator which is an Iterator.
    generator[Symbol.iterator] = function* iterGenerator() {
        while (size > -1) {
            yield func.call(null, params[size]);
            size -= 1;
        }
    };

    return generator;
};

/**
 * It will apply a single function to several independents values.
 * It makes use of functions generators (async).
 *
 * @param {object} - The function to use
 * @return {object} - It will return array of N values.
 */
const pipeValues = func =>
    (...params) => [...getGenerator(func, params)];

// ------------------------------------------------------------------
// -                              readonly                          -
// ------------------------------------------------------------------
/**
 * It will set the object in an immutable state.
 *
 * @param {object} - The object to set as read only.
 * @return {object} - The object itself but read only.
 */
const readOnly = object => Object.freeze(object);

// ------------------------------------------------------------------
// -                           nestedObj                            -
// ------------------------------------------------------------------
/**
 * Creates a nested object based on an array of keys
 *
 * @param {sintrg} keys An string concadenating the keys with a dot.
 * @param {any} value Any value to apply to the last key.
 * @return {object} A new nested object
 */
const nestedObj = (keys, value = {}) => {
    const arrKeys = keys.split('.');
    arrKeys.reverse();

    const restWrapper = arrKeys.reduce((prev, current, index) => (
        { [current]: index === 0 ? value : { ...prev } }
    ), {});

    return restWrapper;
};

// ------------------------------------------------------------------
// -                           rmAttrObject                         -
// ------------------------------------------------------------------
/**
 * It will delete the attribute with its value, wether is nested or not.
 * It won't keep the reference like the `delete` operator in cases it might be
 * referenced later.
 *
 * @param {object} object - The object to work with
 * @param {array} keys - The nested attributes to follow along till find the last
 *                       attribute which is the one to be deleted.
 *
 * @return {object} A new object keeping the rest of the original values.
 */
const rmAttrObject = (object, keys) => {
    let chunk = { ...object };
    const keyToRemove = keys.pop();

    // get the chunk to use as haystack to look for the attribute
    // to remove
    keys.forEach((key) => {
        chunk = chunk[key];
    });


    // removed the last value and keep the rest of the content
    const rest = Object.keys(chunk)
        .reduce((accumulator, key) => (
            key !== keyToRemove
                ? {
                    ...accumulator,
                    [key]: chunk[key]
                }
                : accumulator
        ), {});

    keys.reverse();
    const restWrapper = keys.reduce((prev, current, index) => (
        { [current]: index === 0 ? rest : { ...object[current], ...prev } }
    ), {});


    return {
        ...object,
        ...restWrapper
    };
};


/*****************************************************************************************/
/* This is a different section of the library.                                           */
/* Everything below is based on sematic conditional statements. This means, to use words */
/* instead of logical operators                                                          */
/*****************************************************************************************/

// ------------------------------------------------------------------
// -                          is / isNot                            -
// ------------------------------------------------------------------
const truthyOrFalsy = value =>
    typeof value === 'boolean' ? value : unique(Boolean)(value);

/**
* It will only return `true` for any value that is TRUTHY
* @param {any} value Any value that must to be true
* @return {boolean} Always true
*/
const is = value => truthyOrFalsy(value) === true;

/**
 * It will only return `true` for any value that is FALSY
 * @param {any} value Any value that must to be false
 * @return {boolean} Always true
 */
const isNot = value => truthyOrFalsy(value) === false;

// ------------------------------------------------------------------
// -                      moreThan / lessThan                       -
// ------------------------------------------------------------------

const moreThan = (more, less) => more > less;
const lessThan = (less, more) => less < more;
const equal = (firstValue, secondValue) => firstValue === secondValue;
const odd = (firstValue, secondValue) => firstValue !== secondValue;
const must = (firstValue, secondValue) => firstValue && secondValue;
const could = (firstValue, secondValue) => firstValue || secondValue;


/*****************************************************************************************/
/* This is a different section of the library.                                           */
/* Everything below is based on validations commonly used on web forms                   */
/*****************************************************************************************/

// ------------------------------------------------------------------
// -                           password                             -
// ------------------------------------------------------------------
/**
 * Validates if the password contains the next values:
 *
 * Uppercase characters of European languages (A through Z, with diacritic marks, Greek and Cyrillic characters)
 * Lowercase characters of European languages (a through z, sharp-s, with diacritic marks, Greek and Cyrillic characters)
 * Base 10 digits (0 through 9)
 * Nonalphanumeric characters: ~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/
 * (link: https://technet.microsoft.com/en-us/library/cc786468(v=ws.10).aspx)
 *
 * @param {string} password - String to match against with
 * @return {boolean}
 */
const password = password => /[\wa-я\d\~\!@#\$%\^&\*_\-\+\=`\|\\\(\)\{\}\[\]\:;"'<>,\.\?\/]{4,}/.test(password.toString());

// ------------------------------------------------------------------
// -                             number                             -
// ------------------------------------------------------------------
/**
 * Validates numbers only
 * 
 * @param {string} value - String to match
 * @param {boolean}  strict - If the check is againts strict type
 * @return {boolean}
 */
const number = (value, type = false, strict = false) => {
    let isValidStrict = true;

    const cleanedValue = equal(typeof value, 'number')
        ? value
        : value.replace(/\.|,/g, '');

    if (is(strict)) {
        isValidStrict = equal(typeof cleanedValue, 'number');
    }

    return must(/^\d+$/.test(cleanedValue), isValidStrict);
}

// ------------------------------------------------------------------
// -                              alpha                             -
// ------------------------------------------------------------------
/**
 * Validates words only
 * 
 * @param {string} value - String to match
 * @return {boolean}
 */
const alpha = value => /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);

// ------------------------------------------------------------------
// -                              email                             -
// ------------------------------------------------------------------
/**
 * Validates if the value is a well formed email.
 * (link: https://en.wikipedia.org/wiki/Email_address)
 * 
 * LOCAL PART:
 * Uppercase and lowercase Latin letters A to Z and a to z
 * digits 0 to 9
 * special characters !#$%&'*+-/=?^_`{|}~
 * dot ., provided that it is not the first or last character unless quoted,
 *      and provided also that it does not appear consecutively unless quoted
 *      (e.g. John..Doe@example.com is not allowed but "John..Doe"@example.com is allowed)
 * space and "(),:;<>@[\] characters are allowed with restrictions
 *      (they are only allowed inside a quoted string, as described in the paragraph below, and in addition,
 *      a backslash or double-quote must be preceded by a backslash)
 *
 * uppercase and lowercase Latin letters A to Z and a to z;
 * digits 0 to 9, provided that top-level domain names are not all-numeric;
 * hyphen -, provided that it is not the first or last character.
 *
 * @param {string} value - String to match against with
 * @return {boolean}
 */
const email = value => {
    let isEmail = true;
    if (/^[a-z\d\!#\$%&'\.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(value)) {
        const lastPosition = value.lastIndexOf('@');
        const localPart = value.slice(0, lastPosition);
        const domainPart = value.slice(lastPosition + 1, value.length);

        // Local part
        if (/^[\.,]|[\.,]$/.test(localPart)) { // Forbidden
            isEmail = false;
        } else if (must(/(\.{2,}|["\(\),\:;<>\[\\\]]|@+?)/g.test(localPart),
            must(odd(localPart.slice(0, 1), '\"'), odd(localPart.slice(-1), '\"'))
        )) { // Forbidden
            isEmail = false;
        }

        // Domain part
        if (isEmail) {
            isEmail = /^[\-]|[\-]$/.test(domainPart) ? false : true;
        }
    } else {
        isEmail = false;
    }

    return isEmail;
};


/*****************************************************************************************/
/* This is a different section of the library.                                           */
/* Everything below are DOM manipulation                                                 */
/*****************************************************************************************/

// ------------------------------------------------------------------
// -                        eventToString                           -
// ------------------------------------------------------------------

/**
 * Returns the string representation of the key pressed charcode.
 * 
 * @param {Event} Event - Where it's being triggered
 * @return {string}
 */
const eventToString = event => {
    const e = could(event, window.e);
    return String.fromCharCode(is(e.which) ? e.keyCode : e.which);
};

// ------------------------------------------------------------------
// -                          stopEvent                             -
// ------------------------------------------------------------------
/**
 * Prevents the default behavior of the elements.
 *
 * @param {Event} event - The event where it's being triggered
 * @return {boolean}
 */
const stopEvent = event => (
    event.stopPropagation(),
    event.preventDefault(),
    event.returnValue = false,
    event.cancelBubble = true,
    false
);


// ------------------------------------------------------------------------------------------------------------------------

module.exports = {
    eventToString, // TODO: TEST
    rmAttrObject,
    could,
    must,
    pipeValues,
    stopEvent, // TODO: TEST
    nestedObj,
    password, // TODO: TEST
    moreThan,
    lessThan,
    readOnly, // TODO: TEST
    compose, // TODO: TEST
    number,
    alpha,
    email,
    equal,
    isNot,
    pipe,
    isIn,
    odd, // TODO: TEST
    is
};
