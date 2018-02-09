define((require, exports, module) => {
  const defaultEvolutionModel = require('../model/evolution')
  return {
    namespaced: true,
    state () {
      return defaultEvolutionModel()
    },
    mutations: {
      updateEvolution (state, payload) {
        let {updateData} = payload
        mergeModel(state, updateData)
      }
    }
  }
})
