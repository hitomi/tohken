define((require, exports, module) => {
  const defaultPlayerModel = require('./model/player')
  return {
    namespaced: true,
    state () {
      return defaultPlayerModel()
    },
    mutations: {
      updatePlayer (state, payload) {
        let {updateData} = payload
        mergeModel(state, updateData)
      }
    }
  }
})
