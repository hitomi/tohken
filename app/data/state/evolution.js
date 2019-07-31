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
        console.log(payload)
        if (updateData.back && updateData.back.serial_id) {
          mergeModel(state, updateData)
        }
        else {
          updateData.back = {
            serial_id: 0,
            finished_at: 0,
            isIntervalSet: false
          }
          mergeModel(state, updateData)
        }
      }
    }
  }
})
