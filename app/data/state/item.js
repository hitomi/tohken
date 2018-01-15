define((require, exports, module) => {
  const defaultItemModel = require('../model/item')
  return {
    namespaced: true,
    state () {
      return {
        consumable: {}
      }
    },
    mutations: {
      updateItem (state, payload) {
        let {consumableId, updateData} = payload
        if (!state.consumable[consumableId]) {
          Vue.set(state.consumable, consumableId, defaultItemModel())
        }
        mergeModel(state.consumable[consumableId], updateData)
      }
    }
  }
})