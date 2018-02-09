define((require, exports, module) => {
  const defaultResourceModel = require('../model/resource')
  return {
    namespaced: true,
    state () {
      return defaultResourceModel()
    },
    mutations: {
      updateResource (state, payload) {
        let { updateData } = payload
        mergeModel(state, updateData)
      },
      addMoney (state, payload) {
        let { updateData } = payload
        if (state.money) { updateData.money += state.money }
        mergeModel(state, updateData)
      }
    }
  }
})
