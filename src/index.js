/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2018 - 2019.
 */
// -=====================================================-
const PRODUCTION = 'production';

// ------------------------------------------------------------------
//
// - VALIDATIONS
//
// They will only return `true` or `false`
//
// ------------------------------------------------------------------
const inFunctions = {
  isInArray(element, values) {
    return values.every(value => element.indexOf(value) !== -1);
  },
  isInObject(element, values) {
    const parsedElement = JSON.stringify(element);

    return values.every(value => (new RegExp(`"${value}":`)).test(parsedElement));
  },
};

/**
 * It will check and return wether or not the value(s) exist on the
 * given object or array. For the object it will look for the attribute (key)
 * and not the value.
 *
 * Valid values are:
 * - String
 * - Number
 * - Boolean
 *
 * @example
 * into(['hello', 20, true], 20); // true
 * into(['hello', 20, true], 20, 'hello'); // true
 *
 * @param {(object|array)} element - The object or array to search in.
 * @param {(string|boolean|number)} values - The value(s) to searching for separated by comma.
 * @returns {Boolean} - if you pass more than one value, it will check that actually all the
 *                     all the values exists to return `true`, otherwise it will return `false`.
 */
function into(element, ...values) {
  // Check the values
  const notValidValues = values.every(value => typeof value !== 'object');
  if (!notValidValues && process.env.NODE_ENV !== PRODUCTION) {
    throw Error('Type Object is not allowed to be checked');
  }

  return inFunctions[`isIn${Array.isArray(element) ? 'Array' : 'Object'}`](element, values);
}

const objLenth = element => (
  Array.isArray(element)
    ? Object.values(element).length
    : Object.keys(element).length
);

/**
 * It will check if the element has the exact `length` of elements (Object and Array)
 * or the exact amount of characters (Strings)
 *
 * @example
 * exactSize([1, 2, 3, 4], 4); // true
 * exactSize({a: { c: 2 }, b: 'hello'}, 2); // true
 *
 * @param {(object|array|string)} element The element to evaluate.
 * @param {number} size What should be the length.
 * @returns {boolean}
 */
function exactSize(element, size) {
  if (typeof element === 'number' && process.env.NODE_ENV !== PRODUCTION) {
    throw Error('Type objects are not allowed to be checked');
  }

  return (typeof element === 'string'
    ? element.trim().length
    : objLenth(element)) === size;
}

/**
 * It will check if the element has the more or equal `length` of elements (Object and Array)
 * or  characters for an String
 *
 * @param {(object|array|string)} element The element to evaluate.
 * @param {number} size What should be the length.
 * @returns {boolean}
 */
function moreOrEqual(element, size) {
  if (typeof element === 'number' && process.env.NODE_ENV !== PRODUCTION) {
    throw Error('Type objects are not allowed to be checked');
  }

  return (typeof element === 'string'
    ? element.trim().length
    : objLenth(element)) >= size;
}

/**
 * It will check if the element has the less or equal `length` of elements (Object and Array)
 * or  characters for an String
 *
 * @param {(object|array|string)} element The element to evaluate.
 * @param {number} size What should be the length.
 * @returns {boolean}
 */
function lessOrEqual(element, size) {
  if (typeof element === 'number' && process.env.NODE_ENV !== PRODUCTION) {
    throw Error('Type objects are not allowed to be checked');
  }

  return (typeof element === 'string' ? element.trim().length : objLenth(element)) <= size;
}

/**
 * It will check if the given value is NaN.
 *
 * @param {*} value Any value to be checked that is NaN.
 * @returns {boolean}
 */
function nan(value) {
  return String(value) === 'NaN';
};

/**
 * It will check if a value is truthty but with slightly modifications for Ojects and Arrays.
 *
 * @example
 * | type    | description                     |
 * |---------|---------------------------------|
 * | Objects | "{}" => false. "{a: 2}" => true |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => false. "[2]" => true    |
 * |---------|---------------------------------|
 * 
 * @param {*} value Any value to be checked.
 * @returns {boolean}
 */
function truthty(value) {
  let isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !nan(value)) {
    isTruthy = true;
    if (typeof value === 'object' && Object.keys(value).length) {
      isTruthy = true;
    } else if (typeof value === 'object' && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
};

/**
 * It will check if a value is falsy but with slightly modifications for Object and Array.
 * 
 * @example
 * | type    |  description                    |
 * |---------|---------------------------------|
 * | Objects | "{}" => true. "{a: 2}" => false |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => true. "[2]" => false    |
 * |---------|---------------------------------|
 * 
 * @param {*} value Any value to be checked
 * @returns {boolean}
 */
function falsy(value) {
  let isFalsy = false;

  function isPromise(object) {
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) === object;
    }
  }

  if (!isPromise(value) && !value || nan(value)) {
    isFalsy = true;
  } else if (!isPromise(value) && typeof value === 'object') {
    if (!(value instanceof Date)) {// check for dates
      isFalsy = !Boolean(Object.keys(value).length);
    }
  }

  return isFalsy;
};

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
 *      (e.g. John..Doe@mail.com is not allowed but "John..Doe"@mail.com is allowed)
 * space and "(),:;<>@[\] characters are allowed with restrictions
 *      (they are only allowed inside a quoted string, as described in the paragraph below, and in addition,
 *      a backslash or double-quote must be preceded by a backslash)
 *
 * uppercase and lowercase Latin letters A to Z and a to z;
 * digits 0 to 9, provided that top-level domain names are not all-numeric;
 * hyphen -, provided that it is not the first or last character.
 *
 * @param {string} value - String to match against with-
 * @returns {boolean}
 */
function email(value) {
  let isEmail = true;
  if (/^[a-z\d\!#\$%&'.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>@\[\\\]\s]{1,64}@([a-z\d\-\[\]\:]{1,235}|\.[a-z]{1,20})+$/i.test(value)) {
    const lastPosition = value.lastIndexOf('@');
    const localPart = value.slice(0, lastPosition);
    const domainPart = value.slice(lastPosition + 1, value.length);

    // Local part
    if (/^[.,]|[.,]$/.test(localPart)) { // Forbidden
      isEmail = false;
    } else if (
      /(\.{2,}|["\(\),\:;<>\[\\\]]|@+?)/g.test(localPart) &&
      localPart.slice(0, 1) !== '\"' &&
      localPart.slice(-1) !== '\"'
    ) { // Forbidden
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

/**
 * Validates only words
 * 
 * @param {string} value - String to match
 * @returns {boolean}
 */
function alpha(value) {
  return /^[a-z\sа-яáéíóúäëïöüàèìòùñ]+$/i.test(value);
}

/**
 * Validates only numbers
 * 
 * @param {(string|number)} value - A String or the Number 
 * @returns {boolean}
 */
function number(value) {
  return /^\d+$/.test(Number(String(value).replace(/[.,$]/g, '')));
}

/**
 * Validates if the password contains the next values:
 *
 * Uppercase characters of European languages (A through Z, with diacritic marks, Greek and Cyrillic characters)
 * Lowercase characters of European languages (a through z, sharp-s, with diacritic marks, Greek and Cyrillic characters)
 * Base 10 digits (0 through 9)
 * Nonalphanumeric characters: ~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/
 * (link: https://technet.microsoft.com/en-us/library/cc786468(v=ws.10).aspx)
 *
 * @param {string} pwd - String to match against with
 * @returns {boolean}
 */
function password(pwd) {
  return /[\wa-я\d\~\!@#\$%\^&\*_\-\+\=`\|\\\(\)\{\}\[\]\:;"'<>,\.\?\/]{4,}/.test(String(pwd));
}

/**
 * It will check if the given R.U.N is valid.
 * 
 * @param {string} value The given R.U.N.
 * @returns {boolean}
 */
function run(value) {
  const text = value.toLowerCase().trim().replace(/[.-]/g, '');

  let counter = 2;
  let total = 0;
  let size = text.length - 2;

  for (; size >= 0; size-- , counter++) {
    counter > 7 && (counter = 2);
    total += text[size] * counter;
  }

  total = Number(11 - (total - 11 * Math.floor(total / 11)));

  total === 11 && (total = 0);
  total === 10 && (total = 'k');

  return String(total) === text.slice(-1);
}

// ------------------------------------------------------------------
//
// - ARRAYS
//
// Severals functions to use with arrays.
// Most of them are function functions
//
// ------------------------------------------------------------------
/**
 * HOF that will check if one of the values is equal to the given one.
 * Works only with a single params.
 * 
 * @example
 * [1, 2, 3].filter(has.oneValue(2));
 * 
 * @param {*} value Any type of value.
 * @returns {function(*): boolean} - A function that will accept only one param
 */
function oneValue(value) {
  return content => content === value;
}

/**
 * It will check a single value against N values. If at least one of the values is `true`
 * it will stop checking and return `true`, otherwise `false`.
 *
 * @example
 * has.someValue('hello', ['hello', 'priviet', 'hola', 'hallo']);
 *
 * @param {*} element The element to match against with.
 * @param {array} values All the values to match
 * @returns {boolean}
 */
function someValue(element, values) {
  if (!Array.isArray(values) && process.env.NODE_ENV !== PRODUCTION) {
    throw Error('The second param should be an Array');
  }

  return values.indexOf(element) !== -1;
}

/**
 * It will chekc two arrays. The first param agains the second one.
 * 
 * @example
 * has.someValues([1, 2, 3], [1, 5, 4, 3, 10])
 * 
 * @param {array} arr An array of elements to used against the second param
 * @param {array} values The values that are gonna be searched.
 * @returns {boolean}
 */
function someValues(arr, values) {
  let bool = false;

  for (let index = 0, size = arr.length; index < size; index++) {
    if (values.indexOf(arr[index]) !== -1) {
      bool = true;
      break;
    }
  }

  return bool;
}

/**
 * HOF that will check if one of the values is different to the given one.
 * Works only with a single params.
 *
 * @example
 * [1, 2, 3].filter(has.not.oneValue(2));
 * 
 * @param {any} value Any type of value
 * @returns {function(*): boolean} A function that will accept only one param
 */
function notOneValue(value) {
  return content => content !== value;
}

// /**
//  * HOF that will check if one of the values is equal to the given one.
//  * 
//  * @example
//  * [{id: 1}, {id: 2}, {id: 3}].filter(hasValueByKey('id', 3));
//  * 
//  * @param {String} key the key of the object
//  * @param {Any} value the value to match against the value of the object found by the given key.
//  * @returns true
//  */
// export const hasValueByKey = (key, value) =>
//   content => content[key] === value;

// /**
//  * HOF that will check if within the array are not the given value.
//  * 
//  * @example
//  * [{id: 1}, {id: 2}, {id: 3}].filter(hasNotValueByKey('id', 3));
//  * 
//  * @param {String} key the key of the object
//  * @param {Any} value the value to match against the value of the object found by the given key.
//  * @returns false
//  */
// export const hasNotValueByKey = (key, value) =>
//   content => content[key] !== value;

// export const hasEveryValue = (element, values) => {
//   let bool = false;

//   for (let index = 0, size = values.length; index < size; index += 1) {
//     bool = values === element;
//   }

//   return bool;
// }

// export const hasNotEveryValue = (element, values) => {
//   let bool = false;

//   for (let index = 0, size = values.length; index < size; index += 1) {
//     bool = values !== element;
//   }

//   return bool;
// }


// /**
// * It will check a single value against N values. If at least one value is false
// * it will stop checking and return true, otherwise false
// * 
// * @param {Any} element The element to match against with.
// * @param {Array} values All the values to match
// * @returns Boolean
// */
// export const hasNotSomeValue = (element, values) =>
//   values.indexOf(element) === -1;


// export const someValuesByKey = (key, values) =>
//   content => values.indexOf(content[key]) !== -1;

// export const notEveryValueByKey = (key, values) => {
//   let bool = false;
//   return content => {
//     for (let index = 0, size = values.length; index < size; index++) {
//       bool = values[index] !== content[key];
//     }

//     return bool;
//   }
// }

// ------------------------------------------------------------------
//
// - Utils
//
// They will only return `true` or `false`
//
// ------------------------------------------------------------------
/**
 * It will create a single string of valid classes.
 * Usefull for UI front-end frameworks like React
 *
 * @example
 * addClass(['px-0 border-0', props.className, props.anotherClass && 'text-right']);
 *
 * @param {Array} classes A list of string classes.
 * @returns {String} The joined classes. Eg.'px-0 border-0'
 */
function addClass(classes) {
  return classes.filter(cls =>
    typeof cls === 'string' && cls
  ).join(' ').trim();
}

// // ------------------------------------------------------------------
// // -                              compose                           -
// // ------------------------------------------------------------------
// const unique = fn => value => fn(value);

// // ------------------------------------------------------------------
// // -                              compose                           -
// // ------------------------------------------------------------------
// /**
//  * It will recive several function that are gonna compose into one function.
//  * This is read from right-to-left.
//  * 
//  * @param {function} func - Functions
//  * @returns {function} - A composed function to pass one value
//  */
// const compose = (...func) =>
//     (...value) => {
//         const firstFunc = func.pop();

//         return func.reduce((prevValue, currentValue) =>
//             currentValue(prevValue(...value))
//             , firstFunc);
//     };

// // ------------------------------------------------------------------
// // -                              pipe                              -
// // ------------------------------------------------------------------
// const pipReduce = (prevFunc, currentFunc) =>
//     (...values) =>
//         currentFunc(prevFunc(...values));

// /**
//  * It will concat and execute several functions synchronously the givens values.
//  * If you add more than one value, only the first function will recive them and
//  * the result of it will be passed down to the rest of the functions
//  *
//  * @param {function} func - Functions.
//  * @returns {function} - The result of passing all the values through
//  *               the functions.
//  */
// const pipe = (...func) =>
//     func.reduce(pipReduce);

// // ------------------------------------------------------------------
// // -                           pipeValues                           -
// // ------------------------------------------------------------------
// const getGenerator = (func, params) => {
//     const generator = {};
//     let size = params.length - 1;

//     // Return an object with with key as an Iterator and the value a
//     // function generator which is an Iterator.
//     generator[Symbol.iterator] = function* iterGenerator() {
//         while (size > -1) {
//             yield func.call(null, params[size]);
//             size -= 1;
//         }
//     };

//     return generator;
// };

// /**
//  * It will apply a single function to several independents values.
//  * It makes use of functions generators (async).
//  *
//  * @param {object} - The function to use
//  * @returns {object} - It will return array of N values.
//  */
// const pipeValues = func =>
//     (...params) => [...getGenerator(func, params)];

// // ------------------------------------------------------------------
// // -                              readonly                          -
// // ------------------------------------------------------------------
// /**
//  * It will set the object in an immutable state.
//  *
//  * @param {object} - The object to set as read only.
//  * @returns {object} - The object itself but read only.
//  */
// const readOnly = object => Object.freeze(object);

// // ------------------------------------------------------------------
// // -                           nestedObj                            -
// // ------------------------------------------------------------------
// /**
//  * Creates a nested object based on an array of keys
//  *
//  * @param {sintrg} keys An string concadenating the keys with a dot.
//  * @param {any} value Any value to apply to the last key.
//  * @returns {object} A new nested object
//  */
// const nestedObj = (keys, value = {}) => {
//     const arrKeys = keys.split('.');
//     arrKeys.reverse();

//     const restWrapper = arrKeys.reduce((prev, current, index) => (
//         { [current]: index === 0 ? value : { ...prev } }
//     ), {});

//     return restWrapper;
// };

// // ------------------------------------------------------------------
// // -                           rmAttrObject                         -
// // ------------------------------------------------------------------
// /**
//  * It will delete the attribute with its value, wether is nested or not.
//  * It won't keep the reference like the `delete` operator in cases it might be
//  * referenced later.
//  *
//  * @param {object} object - The object to work with
//  * @param {array} keys - The nested attributes to follow along till find the last
//  *                       attribute which is the one to be deleted.
//  *
//  * @returns {object} A new object keeping the rest of the original values.
//  */
// const rmAttrObject = (object, keys) => {
//     let chunk = { ...object };
//     const keyToRemove = keys.pop();

//     // get the chunk to use as haystack to look for the attribute
//     // to remove
//     keys.forEach((key) => {
//         chunk = chunk[key];
//     });


//     // removed the last value and keep the rest of the content
//     const rest = Object.keys(chunk)
//         .reduce((accumulator, key) => (
//             key !== keyToRemove
//                 ? {
//                     ...accumulator,
//                     [key]: chunk[key]
//                 }
//                 : accumulator
//         ), {});

//     keys.reverse();
//     const restWrapper = keys.reduce((prev, current, index) => (
//         { [current]: index === 0 ? rest : { ...object[current], ...prev } }
//     ), {});


//     return {
//         ...object,
//         ...restWrapper
//     };
// };



// /*****************************************************************************************/
// /* This is a different section of the library.                                           */
// /* Everything below is based on validations commonly used on web forms                   */
// /*****************************************************************************************/


// /*****************************************************************************************/
// /* This is a different section of the library.                                           */
// /* Everything below are DOM manipulation                                                 */
// /*****************************************************************************************/

// // ------------------------------------------------------------------
// // -                        eventToString                           -
// // ------------------------------------------------------------------

// /**
//  * Returns the string representation of the key pressed charcode.
//  * 
//  * @param {Event} Event - Where it's being triggered
//  * @returns {string}
//  */
// const eventToString = event => {
//     const e = could(event, window.e);
//     return String.fromCharCode(is(e.which) ? e.keyCode : e.which);
// };

// // ------------------------------------------------------------------
// // -                          stopEvent                             -
// // ------------------------------------------------------------------
// /**
//  * Prevents the default behavior of the elements.
//  *
//  * @param {Event} event - The event where it's being triggered
//  * @returns {boolean}
//  */
// const stopEvent = event => (
//     event.stopPropagation(),
//     event.preventDefault(),
//     event.returnValue = false,
//     event.cancelBubble = true,
//   event.returnValue = '';
//     false
// );



// Object.defineProperty(Object, 'extractValues', {
//   /**
//    * It will return all the values from an Object or an alement from an specific
//    * given position.
//    * 
//    * @param {Object} element The object to extract all the values
//    * @param {Number} position The position of the element we would like to get in return
//    * @returns Array of the object values.
//    */
//   value: function extractValues(element, position) {
//     let el = [];

//     if (truthty(element) && Object.values(element).length) {
//       if (position >= 0 && position !== undefined && position !== null) {
//         el = Object.values(element)[position];
//       } else {
//         el = Object.values(element);
//       }
//     }

//     return el;
//   },
//   writable: true,
// });

// Object.defineProperty(Object, 'hasValues', {
//   /**
//    * It will check if the given object has any elements as a value
//    * 
//    * @param {Object} element The element to check the values
//    * @returns Boolean
//    */
//   value: function hasValues(element) {
//     return Boolean(Object.values(element).length);
//   },
//   writable: true,
// });

// Object.defineProperty(Object, 'findValue', {
//   value: function findValue(element, fnc) {
//     return truthty(element) ? Object.values(element).find(fnc) : [];
//   },
//   writable: true,
// });

// Object.defineProperty(Object, 'filterValues', {
//   value: function filterValues(element, fnc) {
//     return truthty(element) ? Object.values(element).filter(fnc) : [];
//   },
//   writable: true,
// });

// // ---------------- String ---------------- 
// const _string = String;
// _string.prototype.toJSON = function toJSON(normalize = false) {
//   let self = JSON.parse(this);

//   if (normalize) {
//     self = normalizeKey(self);
//   }

//   return self;
// }

// _string.prototype.toLowerCamelCase = function toLowerCamelCase() {
//   let index = false;

//   const firstWord = this.slice(0, 1).toLowerCase();
//   const self = `${firstWord}${this.slice(1)}`;

//   const result = Object.values(self)
//     .map(str => {
//       let tempStr = str;

//       if (index) {
//         tempStr = str.toUpperCase();
//       }

//       index = (str === '-' || str === '_');

//       return tempStr;
//     })
//     .filter(str => str !== '-' && str !== '_')
//     .join('');

//   return result;
// };

// export const normalizeKey = obj => {
//   return truthty(Object.keys(obj))
//     ? Object.keys(obj)
//       .reduce((prev, current) => {
//         prev[current.toLowerCamelCase().replace('.', '')] = obj[current];
//         return prev;
//       }, {})
//     : {};
// };

// /**
//  * It will turn out an object into an array of objects keeping the original
//  * keys
//  * 
//  * @param {object} obj the object to seek for
//  * @returns {array} An array of objects
//  */
// export const objectToArray = obj =>
//   Object.keys(obj)
//     .reduce((prev, current) => (
//       [
//         ...prev,
//         { [current]: obj[current] }
//       ]
//     ), []);

// /**
//  * It will turn out an array of object into a new array of objects or a new object of objects, but
//  * the objects in the arrays are based on the passed `key` and `value` params
//  * extracted from the objects in the initial array
//  * 
//  * @param {array} array The array to seek for
//  * @param {string} key The name of the atribute to use as a key
//  * @param {string} value The name of the atribute to use as a value
//  * @returns {array} a new array of objects
//  */
// export const compressObject = (array, key, value) =>
//   array.reduce((prev, current) => (
//     [
//       ...prev,
//       { [current[key]]: current[value] }
//     ]
//   ), []);

// export const appendToObject = (array, extraKey, extraValue, objItself = false) =>
//   array.reduce((prev, current) => ([
//     ...prev,
//     {
//       ...current,
//       [extraKey]: objItself ? current[extraValue] : extraValue,
//     }
//   ]), []);

// /**
//  * It will turn out an array of objects to a single object
//  *
//  * @param {array} arr The array to seek for
//  * @returns {object} A new object
//  */
// export const flatObject = arr =>
//   arr.reduce((prev, current) => {
//     const [[key, value]] = Object.entries(current);

//     prev[key] = value;
//     return prev;
//   }, {});

// /**
//  * HOC - It will return only one value from an object.
//  * falsy values are not returned.
//  * Eg: data.name - returned value is "name".
//  * Useful to work with `map`
//  * 
//  * @param {any} key The name of the chain attribute to get the value from
//  * @param {any} content The content from where to extract the value
//  * @returns {any} The needed value
//  */
// export const uniqueObjValue = key => content => content[key];


// export const normalizeObj = arr => {
//   let id = null;

//   return truthty(arr)
//     ? arr.reduce((prev, current, index) => {
//       if (current.id !== undefined) {
//         id = current.id;
//       } else if (current.Id !== undefined) {
//         id = current.Id;
//       } else {
//         id = index;
//       }

//       prev[id] = current;
//       return prev;
//     }, {})
//     : (Array.isArray(arr) ? [] : {});
// };

// export const formatRUN = text => (
//   /*eslint no-sequences: "off"*/
//   text.length > 1 && (text = `${text.slice(0, text.length - 1)}-${text.slice(-1)}`),
//   text.length > 5 && (text = `${text.slice(0, text.length - 5)}.${text.slice(text.length - 5)}`),
//   text.length > 9 && (text = `${text.slice(0, text.length - 9)}.${text.slice(text.length - 9)}`)
// );

// export const getObjectByKey = element =>
//   key => ({
//     [key]: element[key]
//   });

// /**
//  * It will concat and execute several functions synchronously.
//  * If you add more than one value, only the first function will recive them and
//  * the result of it will be passed down through the rest of the functions
//  *
//  * @param {function} func - Functions.
//  * @returns {function} - The result of passing all the values through
//  *               the functions.
//  */
// export const pipe = (...func) =>
//   func.reduce((prevFunc, currentFunc) =>
//     (...values) =>
//       currentFunc(prevFunc(...values)));


// export const removeKeyByFilter = (object, keyParam) =>
//   Object.keys(object)
//     .filter(key => key !== keyParam.toString())
//     .reduce((obj, key) => {
//       obj[key] = object[key];
//       return obj;
//     }, {});


// export const invertObj = obj =>
//   Object.entries(obj)
//     .reduce((prev, current) => {
//       const [key, value] = current;
//       prev[value] = key;
//       return prev;
//     }, {});

// export const clone = (objectType, ...obj) =>
//   objectType === 'OBJECT'
//     ? Object.assign({}, ...obj)
//     : obj.reduce((prev, current) => prev.concat(current), []).filter(truthty);

// Object.defineProperty(clone, 'ARRAY', {
//   value: 'ARRAY',
//   writable: true,
// });

// Object.defineProperty(clone, 'OBJECT', {
//   value: 'OBJECT',
//   writable: true,
// });

// const regex = new RegExp("\\.\\s*\\w{1}", 'g');
// export const humanizeText = (text, fullname = false) => {
//   let tempText = '';
//   if (truthty(text)) {
//     tempText = text.trim().toLowerCase();

//     if (fullname) {
//       tempText = tempText.split(/\s+/).map(a => `${a[0].toUpperCase()}${a.slice(1)}`).join(' ');
//     } else {
//       tempText = `${tempText[0].toUpperCase()}${tempText.slice(1)}`;

//       while (regex.exec(tempText) !== null) {
//         tempText = `${tempText.slice(0, regex.lastIndex - 2)}${tempText[regex.lastIndex - 1].toUpperCase()}${tempText.slice(regex.lastIndex)}`;
//       }
//     }
//   }

//   return tempText;
// };


// ------------------------------------------------------------------------------------------------------------------------

module.exports = {
  // utils
  addClass, // TODO: TEST
  //     eventToString, // TODO: TEST
  //     rmAttrObject,
  //     pipeValues,
  //     stopEvent, // TODO: TEST
  //     nestedObj,
  //     readOnly, // TODO: TEST
  //     compose, // TODO: TEST
  //     isNot,
  //     pipe,
  // TODO: test all of them
  has: {
    someValues,
    someValue,
    oneValue,
    not: {
      oneValue: notOneValue,
    }
  },
  is: {
    // TODO: test all of them
    not: {
      exactSize(element, size) {
        return !exactSize(element, size);
      },
      password(pwd) {
        return !password(pwd);
      },
      number(value) {
        return !number(value);
      },
      email(value) {
        return !email(value);
      },
      alpha(value) {
        return !alpha(value);
      },
      into(element, ...values) {
        return !into(element, ...values);
      },
      run(value) {
        return !run(value);
      },
      nan(value) {
        return !nan(value);
      },
    },
    moreOrEqual,
    lessOrEqual,
    exactSize,
    password, // TODO: TEST
    truthty,
    number,
    email,
    falsy,
    alpha,
    into,
    run,
    nan,
  }
};
