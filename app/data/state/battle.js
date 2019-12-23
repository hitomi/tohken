define((require, exports, module) => {
  const defaultBattlePlayerModel = require('../model/battle_player')
  const defaultBattleResultModel = require('../model/battle_result')
  const defaultBattleScoutModel = require('../model/battle_scout')
  const defaultBattleEnemyModel = require('../model/battle_enemy')
  return {
    namespaced: true,
    state () {
      return {
        player: defaultBattlePlayerModel(),
        result: defaultBattleResultModel(),
        scout: defaultBattleScoutModel(),
        enemy: defaultBattleEnemyModel()
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
      updateBattleEnemy (state, payload) {
        let { updateData } = payload
        mergeModel(state.enemy, updateData)
      },
      clearBattleEnemy (state) {
        state.enemy = defaultBattleEnemyModel()
        state.result = defaultBattleResultModel()
      },
      updateBattleScout (state, payload) {
        let { updateData } = payload
        mergeModel(state.scout, updateData)
      },
      clearBattleScout (state) {
        state.scout = defaultBattleScoutModel()
      },
      updateBattle (state, payload) {
        // Hook Only, Nothing To Do
      },
      updatePracticeBattle (state, payload) {
        // Hook Only, Nothing To Do
      }
    }
  }
})
