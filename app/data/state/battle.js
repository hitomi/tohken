define((require, exports, module) => {
  const defaultBattlePlayerModel = require('../model/battle_player')
  const defaultBattleResultModel = require('../model/battle_result')
  return {
    namespaced: true,
    state () {
      return {
        player: defaultBattlePlayerModel(),
        result: defaultBattleResultModel()
      }
    },
    mutations: {
      updateBattlePlayer (state, payload) {
        let { updateData } = payload
        mergeModel(state.player, updateData)
      },
      updateBattleResult (state, payload) {
        let { updateData } = payload
        mergeModel(state.result, updateData)
      },
      updateBattle (state, payload) {
        // Hook Only, Nothing To Do
      }
    }
  }
})
