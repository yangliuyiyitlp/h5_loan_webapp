import * as types from './types'


export default {
    [types.SET_ITEM_OBJ](state, newData) {
        localStorage.setItem("custItem",JSON.stringify(newData))
    },
    [types.GET_ITEM_OBJ](state, newData) {
        state.custItem = JSON.parse(localStorage.getItem("custItem"))        
    },
    [types.GET__ORDER_ONESELF](state,newData) {
		state.selectOrder = newData
	},
}