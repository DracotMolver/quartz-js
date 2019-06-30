require("core-js");

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
const OBJECT = 'object';
const ARRAY = 'array';

// ------------------------------------------------------------------
//
// - VALIDATIONS
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

function objLenth(element) {
  return Array.isArray(element)
    ? Object.values(element).length
    : Object.keys(element).length
};

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
// - ARRAYS & OBJECTS 
//
// ------------------------------------------------------------------

/**
 * It will merge arrays or objects at first level returning a new object or array.
 * Be carfuly with the order of the passed elements when they are objects
 * 
 * @example
 * clone(OBJECT, {a: 'aA'}, {b: 'bB', a: 'AA'}); // {a: 'AA', b: 'bB'};
 * 
 * @param {string} elementType The constant type of data to merge. ARRAY or OBJECT
 * @param  {(array|object)} obj The elements to merge
 * @returns {(array|object)}
 */
function clone(elementType, ...obj) {
  return elementType === OBJECT
    ? Object.assign({}, ...obj)
    : [].concat(...obj);
}

/**
 * HOF - It will return only one `Truthty` value. `Falsy` values are not returned.
 *
 * @example
 * [{name: 'john', age: 20}].map(util.unique('age')); // [{age: 20}]
 * 
 * @param {any} key The name of the chain attribute to get the value from
 * @param {any} content The content from where to extract the value
 * @returns {any} The needed value
 */
function unique(key) {
  return content => content[key];
}

/**
 * It will turn out an Array of objects into a new array of objects or a new object. 
 * The new objects in the array are based on the passed `key` and `value` params extracted from
 * the key of the objects in the initial array.
 *
 * @param {array} array The array where to work on
 * @param {string} key The name of the atribute to use as a key
 * @param {string} value The name of the atribute to use as a value
 * @param {string=} [OBJECT] A constant that defines the type of element to return
 * @returns {array} a new array of objects
 */
function compress(array, key, value, elementType = ARRAY) {
  return array.reduce((prev, current) =>
    clone(elementType, prev, { [current[key]]: current[value] })
    , elementType === ARRAY ? [] : {});
}

// export const invertObj = obj =>
//   Object.entries(obj)
//     .reduce((prev, current) => {
//       const [key, value] = current;
//       prev[value] = key;
//       return prev;
//     }, {});

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
 * It will check if one of the values is equal to the given one based on they given `Key`.
 * 
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(has.valueByKey('id', 3));
 * 
 * @param {string} key the key of the object
 * @param {*} value the value to match against the value of the object found by the given key.
 * @returns {boolean}
 */
function valueByKey(key, value) {
  return content => content[key] === value;
}

/**
 * It will check if within the array is not the given value by they given `key`.
 * 
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(has.not.valueByKey('id', 3));
 * 
 * @param {string} key the key of the object
 * @param {*} value the value to match against the value of the object found by the given key.
 * @returns {boolean}
 */
function notValueByKey(key, value) {
  return content => content[key] !== value;
}

/**
 * It will turn out an object into an array of objects keeping the original
 * keys of the object.
 * 
 * @param {object} obj the object to seek for
 * @returns {array} An array of objects
 */
function obj2Arr(obj) {
  return Object.entries(obj)
    .flatMap(([key, value]) => [{ [key]: value }]);
}

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

/**
 * It will recive several function that are goint to `compose` into one function.
 * This is read from right-to-left.
 * 
 * @param {function} func - Functions
 * @returns {function} - A composed function to pass one value
 */
function compose(...func) {
  return (...value) => {
    const firstFunc = func.pop();

    return func.reduce((prevValue, currentValue) =>
      currentValue(prevValue(...value))
      , firstFunc);
  };
}

/**
 * It will concat and execute several functions to the given values.
 * If you add more than one value, only the first function will recive them and
 * the result of it will be passed down to the rest of the functions.
 *
 * @param {function} func - Functions.
 * @returns {function} - The result of passing all the values through
 *               the functions.
 */
function pipe(...func) {
  return func.reduce((prevFunc, currentFunc) => (...values) => currentFunc(prevFunc(...values)));
}

function getGenerator(func, params) {
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
}

/**
 * It will apply a single function to several independents values.
 * It makes use of functions generators (async).
 * It will return array of N values.
 *
 * @param {function} - The function to use
 * @returns {array}
 */
function pipeValues(func) {
  return (...params) => [...getGenerator(func, params)];
}

/**
 * It will parsed the given to be returnded as a Lower Camel Case.
 *
 * @example
 * lowerCamelCase('user_name'); // userName
 * 
 * @param {string} text The text to parse
 * @returns {string}
 */
function lowerCamelCase(text) {
  const [firstLetter, ...rest] = text;

  let temp = '';
  let isDash = false;

  const tempRest = rest.map(str => {
    temp = str;

    if (isDash) {
      temp = str.toUpperCase();
    }

    isDash = (str === '-' || str === '_');

    return temp;
  })
    .filter(str => /[^\-_]/.test(str))
    .join('');

  return `${firstLetter.toLowerCase()}${tempRest}`;
}

function rmKey(object, key) {
  let tmp = {};

  if (!/^w+\.\w+/ig.test(key)) { // one single key
    ({ [key]: _, ...tmp } = object);
  } else if (Array.isArray(key)) {
    tmp = object;
    for (let index = 0, size = key.length; index < size; index += 1) {
      ({ [key[index]]: _, ...tmp } = tmp);
    }
  }
  // TODO: REMOVE NESTED VALUES
  //     let chunk = { ...object };
  //     const keyToRemove = keys.pop();

  //     // get the chunk to use as haystack to look for the attribute
  //     // to remove
  //     keys.forEach((key) => {hasNotValueByKey
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

  return tmp;
}

function upperText(text, byWord = false) {
  const regex = new RegExp("\\.\\s*\\w{1}", 'g');
  let tempText = '';

  if (text) {
    tempText = text.trim().toLowerCase();

    if (byWord) {
      tempText = tempText.split(/\s+/g).map(([first, ...rest]) => `${first.toUpperCase()}${rest.join()}`).join(' ');
    } else {
      // const [first, rest]
      // tempText = `${tempText[0].toUpperCase()}${tempText.slice(1)}`;

      // while (regex.exec(tempText) !== null) {
      //   tempText = `${tempText.slice(0, regex.lastIndex - 2)}${tempText[regex.lastIndex - 1].toUpperCase()}${tempText.slice(regex.lastIndex)}`;
      // }
    }
  }

  return tempText;
};

module.exports = {
  // constants
  ARRAY,
  OBJECT,
  util: {
    human: {
      upperText,
    },
    lowerCamelCase,
    pipeValues, // TODO: TEST
    addClass, // TODO: TEST
    compress,
    compose, // TODO: TEST
    obj2Arr,
    clone,
    rmKey, // TODO: TEST
    pipe, // TODO: TEST
  },
  has: {
    valueByKey, // TODO: TEST
    someValues,
    someValue,
    oneValue,
    unique, // TODO: TEST
    not: {
      valueByKey: notValueByKey, // TODO: TEST
      oneValue: notOneValue,
    },
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
  },
};
