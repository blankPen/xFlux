/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:10:31
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 16:33:48
 */

'use strict';
import {
    List,
    Map,
    fromJS
} from 'immutable';
import Emitter from './Emitter';

const ListMethod = 'set,remove,insert,clear,push,pop,unshift,shift,merge,mergeWith,mergeDeep,mergeDeepWith,setSize,slice'.split(',');
const MapMethod = 'set,setIn,remove,deleteIn,update,updateIn,clear,merge,mergeWith,mergeIn,mergeDeep,mergeDeepWith,mergeDeepIn,sort,sortBy,withMutations,asMutable,asImmutable,wasAltered'.split(',');

class Store {
    name = null;
    store = null;
    constructor(key, initail) {
        this.name = key;
        this.store = fromJS(initail);
        this._cloneMethod();
    }
    _cloneMethod() {
        let methods = methods = List.isList(this.store) && ListMethod || Map.isMap(this.store) && MapMethod || [];
        methods.forEach(key => {
            this[key] = (...args) => {
                this.store = this.store[key].apply(this.store,args);
                return this;
            }
        });
        this['get'] = (...args)=>{
            return this.store['get'].apply(this.store,args);
        };
    }
    sync() {
        Emitter.emit(this.name);
    }
}

export let globalStore = {};
const createStore = function(initail) {
    Object.keys(initail).forEach(key => {
        globalStore[key] = new Store(key,initail[key]);
    });
    return globalStore;
};
export default createStore;
