/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:08:09
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-12 09:18:02
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (keys, mapStateToProps) {
    return function (Component) {
        return function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    this.removeEvent = _Emitter2.default.register(keys, this.checkUpdate.bind(this));
                    this.checkUpdate();
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.removeEvent && this.removeEvent();
                }
            }, {
                key: 'checkUpdate',
                value: function checkUpdate() {
                    var curState = mapStateToProps(getStore(keys));
                    if (!this.prevState || contrastState(this.prevState, curState)) {
                        this.prevState = curState;
                        this.forceUpdate();
                    }
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(Component, _extends({
                        ref: 'component'
                    }, this.prevState));
                }
            }]);

            return _class;
        }(_react2.default.Component);
    };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStore(keys) {
    var store = {};
    keys.forEach(function (key) {
        return store[key] = _store.globalStore[key];
    });
    return store;
}

function contrastState(prev, next) {
    if (prev === next) {
        return false;
    }
    var keys = Object.keys(next);
    if (Object.keys(prev).length !== keys.length) {
        return true;
    }
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (prev[key] !== next[key] || !_immutable2.default.is(prev[key], next[key])) {
            return true;
        }
    }
    return false;
}