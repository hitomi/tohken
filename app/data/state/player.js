define((require, exports, module) => {
  const defaultPlayerModel = require('../model/player')
  return {
    namespaced: true,
    state () {
      return defaultPlayerModel()
    },
    mutations: {
      updatePlayer (state, payload) {
        let {updateData} = payload
        if (state.name && !updateData.name) updateData.name = state.name
        mergeModel(state, updateData)
      }
    }
  }
})
