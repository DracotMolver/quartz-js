/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.1.5
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2021.
 */

'use strict';

const { addArrayMethods, BETWEEN, UNION } = require('./arr');
const tools = require('./tools');
const has = require('./has');
const is = require('./is');

exports.ARRAY_METHOD = {
  BETWEEN,
  UNION
};
exports.addArrayMethods = addArrayMethods;
exports.tools = tools;
exports.has = has;
exports.is = is;
