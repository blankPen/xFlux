xFlux
=========================
一个极简的React状态管理方案

## Installation

xFlux requires **immutable 3.8.1 or later.**

```
npm install --save x-flux
```

## API

### `import`

```js
var { linkState,createStore } = require('x-flux'); // es5
import { linkState,createStore } from 'x-flux'; //es6
```

### `linkState(stores,mapStateToProps)`

将状态树Store里的数据和组件关联

@param  {[Array]} stores             [要关联的状态分支]
@param  {[function]} mapStatetoPorps [返回筛选后的关联值]
@return {[function]}                 [绑定方法]

```js
// es7 decorator
@linkState(['TodoStore'], ({ TodoStore }) => {
    return {
        list: TodoStore.get('list'),
    }
})
export default class Container extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        let {
            list,
        } = this.props;
        return (
            <div >
                {list.map( item=> <TodoItem key={item.get('id')} /> )}
            </div>
        );
    }
}
// or
Container = linkState(['TodoStore'], ({ TodoStore }) => {
    return {
        list: TodoStore.get('list'),
    }
})(Container);

```

### `createStore(initalState)`

创建状态树及其分支
```js
// 创建状态树
const store = createStore({
    TodoStore: {
        type: 'ALL',
        finish: [1],
        list: [
            { id: 1,text:'TODO ITEM 1' },
            { id: 2,text:'TODO ITEM 2' },
            //...
        ]
    },
    OtherStore: {
        //...
    }
});
export default store;
// 更新状态树

import { TodoStore,OtherStore } from './store';

// TodoStore是一个类似Immutable对象，
// 修改内容操作方法与Immutable对象基本一致，不过不会返回新对象，而在原对象上直接修改，返回Store对象实例本身
// TodoStore内部属性均为Immutable对象，与Immutable完全一致
TodoStore.set('type','TODO')
    .update('finish',v=>{
        return v.push(2);
    })
    .sync(); // 最后一定要进行同步才会重新渲染关联组件

```


## Example

building...
