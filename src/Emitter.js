/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:03:44
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 16:19:25
 */

'use strict';
import {
    hashCode,
    arrayRemove
} from './utils';
const Emitter = {
    stores: {},
    callers: {},
    register(names, call) {
        let code = hashCode(call.toString() + call.name);
        this.callers[code] = call;
        names = typeof names === 'string' ? [names] : names;
        names.forEach(name => {
            this.stores[name] = this.stores[name] || [];
            this.stores[name].push(code);
        });
        return this.remove.bind(this, code, names);
    },
    remove(code, names) {
        delete this.callers[code];
        names.forEach(name => {
            this.stores[name] = this.stores[name] && arrayRemove(this.stores[name], code);
        });
    },
    emit(name) {
        this.stores[name].forEach(key => this.callers[key]());
    }
};
export default Emitter;
