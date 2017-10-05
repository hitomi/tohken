define((require, exports, module) => {
  const defaultBattlePlayerModel = require('./model/battle_player')
  return {
    namespaced: true,
    state () {
      return defaultBattlePlayerModel()
    },
    mutations: {
      updateBattlePlayer(state, payload) {
        let {updateData} = payload
        mergeModel(state, updateData)
      }
    }
  }
})
