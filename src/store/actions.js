import * as types from './types'

export default {
	[types.SET_ORDER_ONESELF]({ commit, state }, params){
	    commit(types.GET__ORDER_ONESELF, params)
	},
	[types.SET_ITEM_OBJ]: ({commit},params) => {
		commit(types.SET_ITEM_OBJ,params)
	},
	[types.GET_ITEM_OBJ]: ({commit}) => {
		commit(types.GET_ITEM_OBJ)
	},
}