define((require, exports, module) => {
  const defaultForgeModel = require('../model/forge')
  return {
    namespaced: true,
    state () {
      return {
        slot: {}
      }
    },
    mutations: {
      updateForge (state, payload) {
        let {slotNo, updateData} = payload
        if (!state.slot[slotNo]) {
          Vue.set(state.slot, slotNo, defaultForgeModel())
        }
        if(!updateData.sword_id){
          updateData.sword_id='unknown'
        }
        mergeModel(state.slot[slotNo], updateData)
      },
      clear (state) {
        state.slot = {}
      }
    }
  }
})
