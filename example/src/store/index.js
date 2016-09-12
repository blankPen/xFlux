/*
* @Author: pengzhen
* @Date:   2016-09-09 14:41:27
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-09-12 09:50:53
*/

'use strict';
import { createStore } from 'x-flux';
const store = createStore({
    TodoStore: {
        type: 'ALL',
        finish: [1],
        list: [
            { id: 1,text:'TODO ITEM 1' },
            { id: 2,text:'TODO ITEM 2' },
            { id: 3,text:'TODO ITEM 3' },
            { id: 4,text:'TODO ITEM 4' },
            { id: 5,text:'TODO ITEM 5' },
            { id: 6,text:'TODO ITEM 6' },
            { id: 7,text:'TODO ITEM 7' },
            { id: 8,text:'TODO ITEM 8' }
        ]
    }
});
export default store;
