/*
 * @Author: pengzhen
 * @Date:   2016-06-17 15:15:14
 * @Desc: todoList
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-12 09:50:42
 */

'use strict';
import React from 'react';
import {
    linkState
} from 'x-flux';
import store from '../store/';
const { TodoStore } = store;

@linkState(['TodoStore'], ({ TodoStore }) => {
    let type = TodoStore.get('type'),
        finish = TodoStore.get('finish');
    return {
        finish: finish,
        list: TodoStore.get('list').filter((item)=>{
            if(type == 'FINISH'){
                return finish.indexOf(item.get('id')) !== -1;
            }else if(type == 'TODO'){
                return finish.indexOf(item.get('id')) === -1;
            }
            return true;
        }),
        type: TodoStore.get('type')
    }
})
export default class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    itemChange(id) {
        TodoStore.update('finish', v => {
            let index = v.indexOf(id);
            return index === -1 && v.push(id) || v.remove(index);
        }).sync();
    }
    changeType(type){
        TodoStore.set('type',type).sync();
    }
    render() {
        let {
            finish,
            list,
            type
        } = this.props;
        return (
            <div style={{
                    width:300,
                    textAlign: 'center',
                    margin: '20px auto'
                }}>
                <h2>TODO LIST</h2>
                <div>
                    {['ALL','FINISH','TODO'].map(key=>
                        <a key={key}
                            href='#'
                            onClick={this.changeType.bind(this,key)}
                            style={{
                            background: key===type && '#6cf' || '#fff',
                            color: key===type && '#fff' || '#333',
                            margin: 10,
                            display: 'inline-block',
                            padding: '3px 8px'
                            }}
                        >{key}</a>
                    )}
                </div>
                <div>
                    {list.map(item=>
                        <TodoItem
                            key={item.get('id')}
                            text={item.get('text')}
                            id={item.get('id')}
                            onChange={this.itemChange.bind(this,item.get('id'))}
                            checked={finish.indexOf(item.get('id')) !== -1}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export class TodoItem extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <label
                htmlFor = {this.props.id}
                style = {{
                color: this.props.checked ? '#888' : '#333',
                background: this.props.checked ? '#eee' : undefined,
                lineHeight: '2em',
                display: 'block'
            }}>
                <input
                    id={this.props.id}
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                {this.props.text}
            </label>
        );
    }
}
