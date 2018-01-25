define((require, exports, module) => {
  const defaultRepairModel = require('../model/repair')
  return {
    namespaced: true,
    state () {
      return {
        slot: {}
      }
    },
    mutations: {
      updateRepair (state, payload) {
        let {slotNo, updateData} = payload
        if (!state.slot[slotNo]) {
          Vue.set(state.slot, slotNo, defaultRepairModel())
        }
        mergeModel(state.slot[slotNo], updateData)
      },
      clear (state) {
        state.slot = {}
      }
    }
  }
})
