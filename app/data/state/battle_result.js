define((require, exports, module) => {
  const defaultBattleResultModel = require('../model/battle_result')
  return {
    namespaced: true,
    state () {
      return defaultBattleResultModel()
    },
    mutations: {
      updateBattleResult (state, payload) {
        let {updateData} = payload
        mergeModel(state, updateData)
      }
    }
  }
})
