/*
* @Author: pengzhen
* @Date:   2016-09-09 14:05:04
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-09-09 14:05:36
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNull = isNull;
exports.hashCode = hashCode;
exports.intValue = intValue;
exports.arrayRemove = arrayRemove;
function isNull(str) {
    return str == null || str.value == "";
}

/**
 * java String hashCode 的实现
 * @param strKey
 * @return intValue
 */
function hashCode(strKey) {
    var hash = 0;
    if (!isNull(strKey)) {
        for (var i = 0; i < strKey.length; i++) {
            hash = hash * 31 + strKey.charCodeAt(i);
            hash = intValue(hash);
        }
    }
    return hash;
}

/**
 * 将js页面的number类型转换为java的int类型
 * @param num
 * @return intValue
 */
function intValue(num) {
    var MAX_VALUE = 0x7fffffff;
    var MIN_VALUE = -0x80000000;
    if (num > MAX_VALUE || num < MIN_VALUE) {
        return num &= 0xFFFFFFFF;
    }
    return num;
}

function arrayRemove(arr, obj) {
    var index = arr.indexOf(obj);
    if (index >= 0) {
        arr.splice(index, 1);
    }
    return arr;
}