/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:03:44
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 16:19:25
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var Emitter = {
    stores: {},
    callers: {},
    register: function register(names, call) {
        var _this = this;

        var code = (0, _utils.hashCode)(call.toString() + call.name);
        this.callers[code] = call;
        names = typeof names === 'string' ? [names] : names;
        names.forEach(function (name) {
            _this.stores[name] = _this.stores[name] || [];
            _this.stores[name].push(code);
        });
        return this.remove.bind(this, code, names);
    },
    remove: function remove(code, names) {
        var _this2 = this;

        delete this.callers[code];
        names.forEach(function (name) {
            _this2.stores[name] = _this2.stores[name] && (0, _utils.arrayRemove)(_this2.stores[name], code);
        });
    },
    emit: function emit(name) {
        var _this3 = this;

        this.stores[name].forEach(function (key) {
            return _this3.callers[key]();
        });
    }
};
exports.default = Emitter;