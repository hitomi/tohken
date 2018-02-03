define((require, exports, module) => {
  const defaultEquipModel = require('../model/equip')
  return {
    namespaced: true,
    state () {
      return {
        serial: {}
      }
    },
    mutations: {
      updateEquip (state, payload) {
        let {serialId, updateData} = payload
        if (!state.serial[serialId]) {
          Vue.set(state.serial, serialId, defaultEquipModel())
        }
        mergeModel(state.serial[serialId], updateData)
      },
      clear (state) {
        state.serial = {}
      },
      deleteEquip (state, payload) {
        let {serialId} = payload
        Vue.delete(state.serial, serialId)
      }
    }
  }
})
