/**
 * QUARTZ.JS
 *
 * @file A very useful library with fancy small functions
 * @version 1.0.0
 * @author Diego Alberto Molina Vera <dracotm25@gmail.com>
 * @copyright Diego Alberto Molina Vera 2020.
 */

'use strict';
require('regenerator-runtime/runtime');

let tools = null;
let has = null;
let is = null;

if (!process.env.DEBUG) {
  tools = require('./tools');
  has = require('./has');
  is = require('./is');
} else {
  tools = require('./tools/index.min.js');
  has = require('./has/index.min.js');
  is = require('./is/index.min.js');
}

exports.tools = tools;
exports.has = has;
exports.is = is;
