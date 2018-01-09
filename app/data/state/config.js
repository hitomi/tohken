define((require, exports, module) => {
  const defaultConfig = require('../model/config')
  return {
    namespaced: true,
    state () {
      return defaultConfig()
    },
    mutations: {
      updateConfig (state, payload) {
        mergeModel(state, payload)
      }
    }
  }
})
