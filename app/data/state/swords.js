define((require, exports, module) => {
  const defaultSwordModel = require('../model/sword')
  return {
    namespaced: true,
    state () {
      return {
        serial: {},
        inBattleSwords: []
      }
    },
    mutations: {
      updateSword (state, payload) {
        let { serialId, updateData } = payload
        if (!state.serial[serialId]) {
          Vue.set(state.serial, serialId, defaultSwordModel())
        }
        mergeModel(state.serial[serialId], updateData)
      },
      clear (state) {
        state.serial = {}
        state.inBattleSwords = []
      },
      deleteSword (state, payload) {
        let {serialId} = payload
        Vue.delete(state.serial, serialId)
      }
    }
  }
})
