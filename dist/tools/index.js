'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.symbol.to-primitive");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.date.to-primitive");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var util = require('util');

function camelCase(text) {
  var _text$split = text.split(/[_-]/),
      _text$split2 = _toArray(_text$split),
      firstWord = _text$split2[0],
      rest = _text$split2.slice(1);

  var tempRest = rest.map(function (str) {
    return "".concat(str[0].toUpperCase()).concat(str.slice(1));
  }).join('');
  return "".concat(firstWord[0].toLowerCase()).concat(firstWord.slice(1)).concat(tempRest);
}

function compress(array, key, value) {
  var _maker = function _maker(base) {
    return array.reduce(function (prev, current) {
      return clone(prev, _defineProperty({}, current[key], current[value]));
    }, base);
  };

  return {
    object: function object() {
      return _maker({});
    },
    array: function array() {
      return _maker([]);
    }
  };
}

function obj2Arr(obj) {
  return Object.entries(obj).flatMap(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [_defineProperty({}, key, value)];
  });
}

function clone(obj1, obj2) {
  return util.isArray(obj1) ? obj1.concat(obj2) : Object.assign(obj1, obj2);
}

function upperParagraph(text) {
  var byWord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var regex = new RegExp('\\.\\s*\\w{1}', 'g');
  var tempText = text;

  if (text) {
    tempText = text.trim().toLowerCase();

    if (byWord) {
      tempText = tempText.split(/\s+/g).map(function (word) {
        return "".concat(word[0].toUpperCase()).concat(word.slice(1));
      }).join(' ');
    } else {
      tempText = "".concat(tempText[0].toUpperCase()).concat(tempText.slice(1));

      while (regex.exec(tempText) !== null) {
        tempText = "".concat(tempText.slice(0, regex.lastIndex - 2)).concat(tempText[regex.lastIndex - 1].toUpperCase()).concat(tempText.slice(regex.lastIndex));
      }
    }

    tempText = tempText.replace(/\./g, '. ').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
  }

  return tempText;
}

function compose() {
  for (var _len = arguments.length, func = new Array(_len), _key = 0; _key < _len; _key++) {
    func[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, value = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      value[_key2] = arguments[_key2];
    }

    var firstFunc = func.pop();
    return func.reduce(function (prevValue, currentValue) {
      return currentValue(prevValue.apply(void 0, value));
    }, firstFunc);
  };
}

function pipe() {
  for (var _len3 = arguments.length, func = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    func[_key3] = arguments[_key3];
  }

  return func.reduce(function (prevFunc, currentFunc) {
    return function () {
      return currentFunc(prevFunc.apply(void 0, arguments));
    };
  });
}

function getGenerator(func, params) {
  var generator = {};
  var size = params.length;
  var iter = 0;
  generator[Symbol.iterator] = regeneratorRuntime.mark(function iterGenerator() {
    return regeneratorRuntime.wrap(function iterGenerator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(iter < size)) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return func.call(null, params[iter]);

          case 3:
            iter += 1;
            _context.next = 0;
            break;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, iterGenerator);
  });
  return generator;
}

function pipeVal(func) {
  return function () {
    for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      params[_key4] = arguments[_key4];
    }

    return _toConsumableArray(getGenerator(func, params));
  };
}

function rmAttrFromObj(obj, keys) {
  var tmp = _objectSpread({}, obj);

  if (util.isString(keys)) {
    var _keys = keys.split('.');

    if (_keys.length === 1) {
      var _tmp = tmp,
          _keys$ = _keys[0],
          dropVar = _tmp[_keys$],
          rest = _objectWithoutProperties(_tmp, [_keys$].map(_toPropertyKey));

      tmp = rest;
    } else {
      var size = _keys.length - 1;

      var tmpObj = _objectSpread({}, obj);

      tmp = tmpObj;

      for (var iter = 0; iter < size; iter += 1) {
        if (iter === size - 1) {
          var _tmp$_keys$iter = tmp[_keys[iter]],
              _keys$size = _keys[size],
              _dropVar = _tmp$_keys$iter[_keys$size],
              _rest = _objectWithoutProperties(_tmp$_keys$iter, [_keys$size].map(_toPropertyKey));

          tmp[_keys[iter]] = _rest;
        } else {
          tmp = tmp[_keys[iter]];
        }
      }
    }
  } else if (util.isArray(keys)) {
    var _size = keys.length;

    for (var _iter = 0; _iter < _size; _iter += 1) {
      var _tmp2 = tmp,
          _keys$_iter = keys[_iter],
          _dropVar2 = _tmp2[_keys$_iter],
          _rest2 = _objectWithoutProperties(_tmp2, [_keys$_iter].map(_toPropertyKey));

      tmp = _rest2;
    }
  }

  return tmp;
}

module.exports = Object.freeze({
  upperParagraph: upperParagraph,
  rmAttrFromObj: rmAttrFromObj,
  camelCase: camelCase,
  compress: compress,
  compose: compose,
  obj2Arr: obj2Arr,
  pipeVal: pipeVal,
  clone: clone,
  pipe: pipe
});