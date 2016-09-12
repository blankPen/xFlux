/*
 * @Author: pengzhen
 * @Date:   2016-09-08 16:23:05
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 17:59:26
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = exports.linkState = undefined;

var _linkState2 = require('./linkState');

var _linkState3 = _interopRequireDefault(_linkState2);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.linkState = _linkState3.default;
exports.createStore = _store2.default;