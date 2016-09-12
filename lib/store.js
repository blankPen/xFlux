/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:10:31
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 16:33:48
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globalStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListMethod = 'set,remove,insert,clear,push,pop,unshift,shift,merge,mergeWith,mergeDeep,mergeDeepWith,setSize,slice'.split(',');
var MapMethod = 'set,setIn,remove,deleteIn,update,updateIn,clear,merge,mergeWith,mergeIn,mergeDeep,mergeDeepWith,mergeDeepIn,sort,sortBy,withMutations,asMutable,asImmutable,wasAltered'.split(',');

var Store = function () {
    function Store(key, initail) {
        _classCallCheck(this, Store);

        this.name = null;
        this.store = null;

        this.name = key;
        this.store = (0, _immutable.fromJS)(initail);
        this._cloneMethod();
    }

    _createClass(Store, [{
        key: '_cloneMethod',
        value: function _cloneMethod() {
            var _this = this;

            var methods = methods = _immutable.List.isList(this.store) && ListMethod || _immutable.Map.isMap(this.store) && MapMethod || [];
            methods.forEach(function (key) {
                _this[key] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    _this.store = _this.store[key].apply(_this.store, args);
                    return _this;
                };
            });
            this['get'] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _this.store['get'].apply(_this.store, args);
            };
        }
    }, {
        key: 'sync',
        value: function sync() {
            _Emitter2.default.emit(this.name);
        }
    }]);

    return Store;
}();

var globalStore = exports.globalStore = {};
var createStore = function createStore(initail) {
    Object.keys(initail).forEach(function (key) {
        globalStore[key] = new Store(key, initail[key]);
    });
    return globalStore;
};
exports.default = createStore;