define((require, exports, module) => {
  const defaultSallyModel = require('../model/sally')
  return {
    namespaced: true,
    state () {
      return defaultSallyModel()
    },
    mutations: {
      updateSally(state, payload) {
        let { updateData } = payload
        mergeModel(state, updateData)
      }
    }
  }
})
