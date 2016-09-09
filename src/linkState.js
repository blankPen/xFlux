/*
 * @Author: pengzhen
 * @Date:   2016-09-09 14:08:09
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-09 16:36:41
 */

'use strict';
import React from 'react';
import Emitter from './Emitter';
import {
    globalStore
} from './store';

export default function(keys, mapStateToProps) {
    return function(Component) {
        return class extends React.Component {
            componentWillMount() {
                this.removeEvent = Emitter.register(keys, this.checkUpdate.bind(this));
                this.checkUpdate();
            }
            componentWillUnmount() {
                this.removeEvent && this.removeEvent();
            }
            checkUpdate() {
                let curState = mapStateToProps(getStore(keys));
                if (!this.prevState || contrastState(this.prevState, curState)) {
                    this.prevState = curState;
                    this.forceUpdate();
                }
            }
            render() {
                return <Component
                        ref='component'
                        {...this.prevState}
                    />
            }
        }
    }
}


function getStore(keys) {
    let store = {};
    keys.forEach(key => store[key] = globalStore[key]);
    return store;
}

function contrastState(prev, next) {
    if (prev === next) {
        return false;
    }
    let keys = Object.keys(next);
    if (Object.keys(prev).length !== keys.length) {
        return true;
    }
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (prev[key] !== next[key] || !Immutable.is(prev[key], next[key])) {
            return true;
        }
    }
    return false;
}
