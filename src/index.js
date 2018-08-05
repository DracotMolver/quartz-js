/**
 * FUX.JS
 *
 * This is an small collections of useful lines of codes.
 * @copyright Diego Molina Vera - 2018.
 */
// -=====================================================-
// ------------------------------------------------------------------
// -                              compose                           -
// ------------------------------------------------------------------
const unique = fn =>
    value => fn(value);

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
    if (!notValidValues) {
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
const mustBetween = (firstValue, secondValue) => firstValue && secondValue;
const coudlBetween = (firstValue, secondValue) => firstValue || secondValue;


// ------------------------------------------------------------------
// -                           isPassword                           -
// ------------------------------------------------------------------
// /**
//  * Validates if the password contains the next values:
//  *
//  * Uppercase characters of European languages (A through Z, with diacritic marks, Greek and Cyrillic characters)
//  * Lowercase characters of European languages (a through z, sharp-s, with diacritic marks, Greek and Cyrillic characters)
//  * Base 10 digits (0 through 9)
//  * Nonalphanumeric characters: ~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/
//  * (link: https://technet.microsoft.com/en-us/library/cc786468(v=ws.10).aspx)
//  *
//  * @param {string} password - String to match against with
//  * @return {boolean}
//  */
// const isPassword = password => /[\wa-я\d\~\!@#\$%\^&\*_\-\+\=`\|\\\(\)\{\}\[\]\:;"'<>,\.\?\/]{4,}/.test(password);

module.exports = {
    rmAttrObject,
    coudlBetween,
    mustBetween,
    pipeValues,
    // isPassword, // TODO: TEST
    nestedObj,
    moreThan,
    lessThan,
    readOnly, // TODO: TEST
    compose, // TODO: TEST
    equal,
    isNot,
    pipe,
    isIn,
    is
};




// /**
//  * @param {string} formId - The id of the form to validate
//  * @param {object} rules - A list of rules
//  * @param {function} submitForm - A callback function to get the values when the form is truly validated
//  * @param {object} options - A list of options to overwrite the default behavior
//  */
// function FormValidationJS({ formId, rules, submitForm, options }) {
//     const parentForm = document.getElementById(formId);
//     const whiteListKey = [
//         9, // Tab
//         33, 34, 35, 36, 37, 38, 39, 40, // Arrows and other keys
//         16, 17, 18, 19, 20, // Alt, Ctrl and Shift
//         173, 174, 175, // Som Fn
//         91, // Window
//         27, // Esc
//         116, // Refresh
//         93, // ...
//         255 // ...
//     ];

//     let rulesToValidate = {};
//     let childrenForm = {};

//     /**
//      * Extract the name attribute from the field-
//      * If the name is with [], they will be removed.
//      * 
//      * @param {HTMLElement} element - Element to get the name attribute
//      * @return {string} The name attribute of the field
//      */
//     const getNameAttr = element => element.name.replace(/[\[\]]/g, '');

//     // Gets all the elementos to validate from the form
//     const children = [...parentForm].filter(v => {
//         if (/select|textarea/i.test(v.nodeName)) {
//             return v;
//         } else if ('INPUT' === v.nodeName &&
//             /text|password|radio|checkbox|email|number/i.test(v.type)
//         ) {
//             return v;
//         }
//     });

//     for (let i = 0, s = children.length; i < s; i++) {
//         const childName = getNameAttr(children[i]);
//         const child = rules[childName];
//         if (typeof child === 'string') {
//             const tempPassValue = {};

//             child.split('|').forEach(m => {
//                 tempPassValue[(/match|min|max/.test(m) ? m.split(':')[0] : m)] = false;
//             });

//             // Gets all the field form the form that has validations rules
//             childrenForm[childName] = children[i];
//             // Adds all the validations as FALSE
//             rulesToValidate[childName] = tempPassValue;
//             // Splits all the rules
//             rules[childName] = child.split('|');
//         }
//     }

//     childrenForm = Object.freeze(childrenForm);
//     rules = Object.freeze(rules);

//     const __required = 'required';
//     const __password = 'password';
//     const __number = 'number';
//     const __match = 'match';
//     const __alpha = 'alpha';
//     const __mail = 'mail';
//     const __min = 'min';
//     const __max = 'max';
//     const __rut = 'rut';

//     // -========================== CONFIGURATION ==========================
//     let config = {
//         notFormat: options && options.notFormat ? options.notFormat : [],
//         lang: options && options.lang ? options.lang : {
//             [__required]: 'Required field',
//             [__password]: 'The password must contain at least: <br>Upper and Lower letters<br>Numbers<br>One of the following characters: ~!@#$%^&*_-+=`|\(){}[]:;\"\'<>,.?/',
//             [__number]: 'Only numbers are allowed',
//             [__match]: 'The field %0 doesn\'t match with field %1',
//             [__alpha]: 'Only letters are allowed',
//             [__mail]: 'The email is not valid',
//             [__min]: 'The field accept minimun %0 characters',
//             [__max]: 'The field accept maximun %0 characters',
//             [__rut]: ''
//         },
//         messages: options && options.messages ? options.messages : null
//     };



//     /**
//      * Validates that ONLY numbers are being typed into the field
//      * 
//      * @param {string} value - The value of the field
//      * @param {Event} event - The event where it's being triggered
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isNumber = (value, event = null) => {
//         if (event) {
//             return eventCode(event) === 8
//                 ? /^\d+$/.test(value) || cancelEvent(event)
//                 : /^\d+$/.test(toUtf8(eventCode(event))) || cancelEvent(event);
//         } else {
//             return /^\d+$/.test(value);
//         }
//     };

//     /**
//      * Validates and prevents numbers into the field
//      * 
//      * @param {string} value - The value of the field
//      * @param {Event} event - The event where it's being triggered
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isAlpha = (value, event = null) => {
//         if (event) {
//             return eventCode(event) === 8
//                 ? /^[a-z\sа-я]+$/i.test(value) || cancelEvent(event)
//                 : /^[a-z\sа-я]+$/i.test(toUtf8(eventCode(event))) || cancelEvent(event);
//         } else {
//             return /^[a-z\sа-я]+$/i.test(value);
//         }
//     };

//     /**
//      * Validates if the value of the element that contains the rule match against the one
//      * next to the ":"
//      * 
//      * @param {string} - The value of the field
//      * @param {string} - The element to match against to
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isMatch = (value, matchElement) =>
//         value === childrenForm[matchElement].value.trim();

//     /**
//      * Validates that the VALUE of the field is a well formed email.
//      * (link: https://en.wikipedia.org/wiki/Email_address)
//      * 
//      * LOCAL PART:
//      * Uppercase and lowercase Latin letters A to Z and a to z
//      * digits 0 to 9
//      * special characters !#$%&'*+-/=?^_`{|}~
//      * dot ., provided that it is not the first or last character unless quoted,
//      *      and provided also that it does not appear consecutively unless quoted
//      *      (e.g. John..Doe@example.com is not allowed but "John..Doe"@example.com is allowed)
//      * space and "(),:;<>@[\] characters are allowed with restrictions
//      *      (they are only allowed inside a quoted string, as described in the paragraph below, and in addition,
//      *      a backslash or double-quote must be preceded by a backslash)
//      *
//      * uppercase and lowercase Latin letters A to Z and a to z;
//      * digits 0 to 9, provided that top-level domain names are not all-numeric;
//      * hyphen -, provided that it is not the first or last character.
//      *
//      * @param {string} value - Value of the field
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isMail = value => {
//         if (/^([a-z\d\!#\$%&'\.\*\+\-\/\=\?\^_`\{\|\}~"\(\),\:;<>\@\[\\\]\s]{1,64}@[a-z\d\-]{2,235}|\.[a-z]{1,20})+$/i.test(value)) {
//             const mailSplitted = value.split('@');
//             const localPart = mailSplitted[0];
//             const domainPart = mailSplitted[1];

//             // Local part
//             if (/^[\.,]|[\.,]$/.test(localPart)) { // Forbidden 
//                 return false;
//             }

//             if (/(\.{2}|["\(\),\:;<>@\[\\\]])/g.test(localPart) && (
//                 localPart.slice(0, 1) !== '\"' && localPart.slice(-1) !== '\"'
//             )) { // Forbidden
//                 return false;
//             }

//             // Domain part
//             if (/^[\-]|[\-]$/.test(domainPart)) { // Forbidden 
//                 return false;
//             }

//             return true;
//         } else {
//             return false;
//         }
//     };

//     /**
//      * Validates if the length of the value is the min assigned
//      * 
//      * @param {string} value - The value of the field
//      * @param {string} min - The min value to accept
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isMin = (value, min) => value >= Number(min);

//     /**
//      * Validates if the lenght of the value is the max assigned
//      * It will blocks the event when the value exceeds the maximun value
//      * 
//      * @param {string} value - The value of the field
//      * @param {string} max - The max value to accept
//      * @param {Event} event  - The event where it's being triggered
//      * @param {boolean} - Whether or not the result is valid
//      */
//     const isMax = (value, max, event = null) => {
//         if (event) {
//             return eventCode(event) === 8
//                 ? (value <= Number(max))
//                 : (value <= Number(max)) || cancelEvent(event);
//         } else {
//             return (value <= Number(max));
//         }
//     };

//     /**
//      * Validates and formats the RUN (Chile).
//      * Format: xx.xxx.xxx-x
//      * 
//      * @param {HTMLElement} target
//      * @param {string} value - The Value of the field
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isRut = (value, target) => {
//         let text = '';
//         // Formateo del rut
//         if (config.notFormat.indexOf(__rut) === -1) {
//             text = value.trim().replace(/[\.\-]/g, '');

//             text.length > 1 && (text = `${text.slice(0, text.length - 1)}-${text.slice(-1)}`),
//                 text.length > 5 && (text = `${text.slice(0, text.length - 5)}.${text.slice(text.length - 5)}`),
//                 text.length > 9 && (text = `${text.slice(0, text.length - 9)}.${text.slice(text.length - 9)}`);

//             target && (target.value = text);
//         }

//         // Validación
//         text = value.trim().replace(/[\.\-]/g, '');

//         let total = 0;
//         for (let counter = 2, size = text.length - 2; size >= 0; size-- , counter++) {
//             counter > 7 && (counter = 2);
//             total += text[size] * counter;
//         }

//         total = Number(11 - (total - 11 * Math.floor(total / 11)));

//         total === 11 && (total = 0);
//         total === 10 && (total = 'k');

//         return total.toString() === text.slice(-1);
//     };

//     /**
//      * Validates that the field is not empty (knonw as: required)
//      * 
//      * @param {string} value - The value of the field
//      * @return {boolean} - Whether or not the result is valid
//      */
//     const isRequired = value => !!value;

//     // -========================== FUNCTIONS ==========================
//     /**
//      * Only for INPUTS type checkbox and radio
//      * It will get the checked elements and how many of them are checked.
//      * 
//      * @param {HTMLElement} element - The input field
//      * @param {string} id - the name of the field
//      * @return {object} An object containing the amount of checked items and if at least one is checked
//      */
//     const isChecked = (element, id) => {
//         let isValid = false;
//         let selectedElements = 0;

//         let elements = [...(
//             arrElements = document.getElementsByName(id)).length
//             ? arrElements
//             : document.getElementsByName(`${id}[]`)];

//         for (let i = 0, ss = elements.length; i < ss; i++) {
//             if (elements[i].checked) {
//                 ++selectedElements;
//                 isValid = true;
//             }
//         }

//         return {
//             checked: isValid,
//             selectedElements
//         };
//     };

//     const checkRules = ({ id, value, rule, subrule, event }) => {
//         switch (rule) {
//             case __password:
//                 rulesToValidate[id][rule] = isPassword(value, event && event.target);
//                 break;
//             case __number:
//                 rulesToValidate[id][rule] = isNumber(value, event);
//                 break;
//             case __alpha:
//                 rulesToValidate[id][rule] = isAlpha(value, event);
//                 break;
//             case __match:
//                 rulesToValidate[id][rule] = isMatch(value, subrule);
//                 break;
//             case __mail:
//                 rulesToValidate[id][rule] = isMail(value);
//                 break;
//             case __min:
//                 rulesToValidate[id][rule] = isMin(value, subrule);
//                 break;
//             case __max:
//                 rulesToValidate[id][rule] = isMax(value, subrule, event);
//                 break;
//             case __rut:
//                 rulesToValidate[id][rule] = isRut(value, event && event.target);
//                 break;
//         }
//     };

//     /**
//      * Checks the validations and decide wether to show or not the messages
//      * 
//      * @param {Event} event - The event is gonna be triggered
//      * @param {string} rule - The validation rule
//      * @param {string} subrule - The value of the rule next to the ":"
//      */
//     const isRulesValid = (event, rule, subrule = '') => {
//         const element = event.target;
//         const id = getNameAttr(element);
//         const targetValue = element.value.trim();

//         if (event.type !== 'focus' && event.type !== 'click') {
//             checkRules({
//                 id,
//                 value: (rule === 'max' || rule === 'min')
//                     ? targetValue.length
//                     : targetValue,
//                 rule,
//                 subrule,
//                 event
//             });

//             // Displays the right message
//             const ruleType = Object.keys(rulesToValidate[id]);
//             for (let i = 0, size = ruleType.length; i < size; i++) {
//                 if (ruleType[i] !== __required) {
//                     if (!rulesToValidate[id][ruleType[i]]) {
//                         displayMessage(ruleType[i], element);

//                         const timeout = setTimeout(() => {
//                             hideMessage(element);
//                             clearTimeout(timeout);
//                         }, 4000);

//                         break;
//                     } else {
//                         hideMessage(element);
//                     }
//                 }
//             }
//         }
//     };

//     /**
//      * For each event triggered it must validate the field based upon its rules
//      *
//      * @param {Event} event - The vent is gonna be triggered
//      */
//     const eventHandler = event => {
//         const element = event.target;

//         if (/input|textarea/i.test(element.nodeName) &&
//             /text|password|radio|checkbox|email|number/i.test(element.type)
//         ) {
//             // Don't execute when the events are triggerd by key that
//             // are not words, numbers or any valid characters
//             if (whiteListKey.indexOf(eventCode(event)) === -1 &&
//                 eventCode(event) !== undefined &&
//                 (element.type !== 'radio' && element.type !== 'checkbox')
//             ) {
//                 const childName = getNameAttr(element);
//                 if (rules[childName]) {
//                     rules[childName].forEach(v => {
//                         if (/match|min|max/.test(v)) {
//                             v = v.split(':');
//                             isRulesValid(event, v[0], v[1]);
//                         } else {
//                             isRulesValid(event, v);
//                         }
//                     });
//                 }
//             }
//         }
//     };

//     /**
//     * Displays the error messages
//     * 
//     * @param {string} type - The name of the rule
//     * @param {HTMLElement} element - The field where the validation is being used
//     */
//     const displayMessage = (type = '', element, customMessage = '') => {
//         const parent = element.parentElement;
//         const msgContainer = parent.children[0];
//         const msgChild = msgContainer.children[0];
//         const childName = getNameAttr(element);

//         // Check if are custom messages
//         // and assign the right message
//         const message = config.messages
//             ? config.messages[type]
//                 ? config.messages[type]
//                 : config.messages[childName] && config.messages[childName][type]
//                     ? config.messages[childName][type]
//                     : config.lang[type]
//             : config.lang[type];

//         switch (type) {
//             case __required:
//             case __number:
//             case __alpha:
//             case __mail:
//             case __rut:
//                 msgChild.textContent = message;
//                 break;
//             case __password: msgChild.innerHTML = message; break;
//             case __match:
//                 const matchMessage = message
//                     .replace('%0', childName)
//                     .replace('%1', rules[childName][0].replace(`${__match}:`, ''));

//                 msgChild.textContent = matchMessage;
//                 break;
//             case __min:
//                 const minMessage = message
//                     .replace('%0', rules[childName][0].replace(`${__min}:`, ''));

//                 msgChild.textContent = minMessage;
//                 break;
//             case __max:
//                 const maxMessage = config.lang.max
//                     .replace('%0', rules[childName][0].replace(`${__max}:`, ''));

//                 msgChild.textContent = maxMessage;
//                 break;
//             default: msgChild.textContent = customMessage;
//         }

//         msgContainer.classList.contains('form-hide') &&
//             msgContainer.classList.remove('form-hide');
//     };

//     /**
//      * Hides the messages
//      * 
//      * @param {HTMLElement} Element - The field where the validation has been used
//      */
//     const hideMessage = element => {
//         const parent = element.parentElement;
//         const msgContainer = parent.children[0];

//         !msgContainer.classList.contains('form-hide') &&
//             msgContainer.classList.add('form-hide');
//     };

//     /**
//      * Prevents the default behavior of the elements.
//      *
//      * @param {Event} event - The event where it's being triggered
//      * @return {boolean} - FALSE by default
//      */
//     const cancelEvent = event => (
//         event.stopPropagation(),
//         event.preventDefault(),
//         event.returnValue = false,
//         event.cancelBubble = true,
//         false
//     );

//     /**
//      * Converts the code to string
//      * 
//      * @param {number} value - The value to convert to string.
//      * @return {string} Return the string from an unicode value
//      */
//     const toUtf8 = value => String.fromCharCode(value);

//     /**
//      * Returns the charcode of the key pressed.
//      * 
//      * @param {Event} Event - Where it's being triggered
//      * @return {number} The code of the event
//      */
//     const eventCode = event => {
//         const e = event || window.e;
//         return !!e.which ? e.keyCode : e.which;
//     };

//     // -============================== PUBLIC FUNCTIONS ==============================
//     /**
//      * Displays a custom message immeadiately when the method is called.
//      * Use it generally after getting a single message from the server.
//      * 
//      * @param {string} id - The id of the elmento which was validated
//      * @param {string} message - A Custom message to show
//      */
//     this.showMessage = (elementId, message) => {
//         displayMessage('', document.getElementById(elementId), message);
//     };

//     /**
//      * Displays several custom messages immeadiately when the method is called.
//      * Use it generally after getting more than one message from the server.
//      * 
//      * @param {object} message - An object with custom messages
//      */
//     this.showMessages = messages => {
//         const keys = Object.keys(messages);
//         for (let i = 0, s = keys.length; i < s; i++) {
//             displayMessage('', document.getElementById(keys[i]), messages[keys[i]]);
//         }
//     };

//     /**
//      * Sets the especified language.
//      * See the `lang` forlder
//      * 
//      * @param {object} lang - An object that has all the messages in the right language
//      */
//     this.setLang = lang => {
//         config.lang = lang;
//     };

//     /**
//      * It will reset all the interal variables that make
//      * sure that the fields are validated.
//      */
//     this.reset = () => {
//         // Sets all false
//         const keyRules = Object.keys(rulesToValidate);
//         for (let i = 0, s = keyRules.length; i < s; i++) {
//             const keyRule = rulesToValidate[keyRules[i]];
//             for (let j = 0, ss = keyRule.length; j < ss; j++) {
//                 rulesToValidate[keyRules[i]][keyRule[j]] = false;
//             }
//         }
//     };

//     /**
//      * Adds a new rule to applay to a new field. Mostly added
//      * dinamically.
//      * 
//      * @param {string} elementId - The Id of the new field
//      * @param {string} rule - Rules to apply
//      * @param {object} msg - Optional. Custom messages
//      */
//     this.addRuleToField = (elementId, rule, msg = '') => {
//         const element = document.getElementById(elementId);
//         const tempPassValue = {};

//         const addElement = (objectElement, value) =>
//             Object.freeze(
//                 Object.assign({
//                     [element.name]: value
//                 }, objectElement)
//             );

//         // Adds the field to validate
//         childrenForm = addElement(childrenForm, element);
//         // Adds the rule to validate
//         rules = addElement(rules, rule.split('|'));

//         rule.split('|').forEach(m => {
//             tempPassValue[(/match|min|max/.test(m) ? m.split(':')[0] : m)] = false;
//         });
//         rulesToValidate[element.name] = tempPassValue;

//         // Adds custom messages
//         if (msg) {
//             config.messages = config.messages
//                 ? Object.assign(config.messages, msg)
//                 : msg;
//         }
//     };

//     this.removeRulefromField = elementId => {
//         const id = document.getElementById(elementId).name;
//         const tempPassValue = {};

//         const removeContent = objectElement => {
//             const tempValues = {};
//             Object.keys(objectElement).forEach(v => {
//                 if (v !== id) {
//                     tempValues[v] = objectElement[v];
//                 }
//             });

//             return tempValues;
//         };

//         // Removes the field to validate
//         childrenForm = Object.freeze(removeContent(childrenForm));
//         // Removes the rule to validate
//         rules = Object.freeze(removeContent(rules));

//         rulesToValidate = Object.freeze(removeContent(rulesToValidate));

//         // Removes custom messages
//         config.messages = removeContent(config.messages);
//     };

//     // -========================== FORM CONFIGURATION ==========================
//     parentForm.addEventListener('keypress', eventHandler, true);
//     parentForm.addEventListener('keydown', eventHandler, true);
//     parentForm.addEventListener('change', eventHandler, true);
//     parentForm.addEventListener('keyup', eventHandler, true);
//     parentForm.addEventListener('click', eventHandler, true);
//     parentForm.addEventListener('focus', eventHandler, true);

//     // Prevents submitting the form
//     parentForm.addEventListener('submit', function submitHandler(event) {
//         event.preventDefault();
//         let isSend = [];

//         console.log(childrenForm, rules, rulesToValidate);
//         Object.keys(rules).forEach(keyRules => {
//             rules[keyRules].forEach(keyRule => {
//                 const element = childrenForm[keyRules];
//                 const id = getNameAttr(element);

//                 // Check if the rules differents from "required"
//                 // and they are not applied to an input's radio type
//                 if (keyRule !== __required && element.type !== 'radio') {
//                     if (/match|min|max/.test(keyRule)) {
//                         const x = keyRule.split(':');

//                         checkRules({
//                             id,
//                             value: element.type === 'checkbox'
//                                 ? isChecked(element, id).selectedElements
//                                 : (/match/.test(keyRule))
//                                     ? element.value.trim()
//                                     : element.value.trim().length,
//                             rule: x[0],
//                             subrule: x[1]
//                         });
//                     } else {
//                         checkRules({
//                             id,
//                             value: element.value.trim(),
//                             rule: keyRule,
//                             subrule: ''
//                         });
//                     }
//                 } else if (keyRule === __required) { // Only for requried elements
//                     if (element.nodeName === 'SELECT') {
//                         rulesToValidate[id][__required] = isRequired(element.options[element.selectedIndex].value.trim());
//                     } else if (element.type === 'radio' || element.type === 'checkbox') {
//                         rulesToValidate[id][__required] = isChecked(element, id).checked;
//                     } else {
//                         rulesToValidate[id][__required] = isRequired(element.value.trim());
//                     }
//                 }
//             });
//         });

//         const keyRules = Object.keys(rulesToValidate);
//         for (let i = 0, s = keyRules.length; i < s; i++) {
//             // Display first the requires messages
//             const keyRule = Object.keys(rulesToValidate[keyRules[i]]);
//             for (let j = 0, ss = keyRule.length; j < ss; j++) {
//                 if ((isValid = rulesToValidate[keyRules[i]][keyRule[j]])) {
//                     isSend.push(isValid);
//                 } else {
//                     isSend.push(isValid);
//                     displayMessage(keyRule[j], childrenForm[keyRules[i]]);
//                 }
//             }
//         }

//         // Sends the form
//         if (isSend.indexOf(false) === -1) {
//             submitForm(new FormData(this));
//         } else {
//             // Hides the error messages
//             const timeout = setTimeout(() => {
//                 const childrenKeys = Object.keys(childrenForm);
//                 for (let i = 0, s = childrenKeys.length; i < s; i++) {
//                     hideMessage(childrenForm[childrenKeys[i]]);
//                 }

//                 clearTimeout(timeout);
//             }, 4000);
//         }

//     }, false);
// }
