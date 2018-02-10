define((require, exports, module) => {
  const defaultEvolutionModel = require('../model/evolution')
  return {
    namespaced: true,
    state () {
      return defaultEvolutionModel()
    },
    mutations: {
      updateEvolution (state, payload) {
        console.log(payload)
        if (payload.back == null) {
          Vue.set(state, defaultEvolutionModel())
        }
        else {
        let {updateData} = payload
        mergeModel(state, updateData)
        }
      }
    }
  }
})
