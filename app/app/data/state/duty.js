define((require, exports, module) => {
  const defaultDutyModel = require('../model/duty')
  return {
    namespaced: true,
    state () {
      return defaultDutyModel()
    },
    mutations: {
      updateDuty (state, payload) {
        let {updateData} = payload
        mergeModel(state, updateData)
      }
    }
  }
})
