define((require, exports, module) => {
  const defaultSwordModel = require('../model/sword')
  return {
    namespaced: true,
    state () {
      return {
        serial: {}
      }
    },
    mutations: {
      updateSword (state, payload) {
        let { serialId, updateData } = payload
        if (!state.serial[serialId]) {
          Vue.set(state.serial, serialId, defaultSwordModel())
        }
        mergeModel(state.serial[serialId], updateData)
      }
    }
  }
})
