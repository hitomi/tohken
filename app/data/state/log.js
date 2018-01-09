define((require, exports, module) => {
  const defaultBattleLog = require('../model/battle_log')
  const defaultForgeLog = require('../model/forge_log')
  return {
    namespaced: true,
    state () {
      return {
        battle: [],
        sally: []
      }
    },
    mutations: {
      addBattleLog (state, payload) {
        let { updateData } = payload
        let log = defaultBattleLog()
        mergeModel(log, updateData)
        state.battle.push(log)
      },
      addForgeLog (state, payload) {
        let { updateData } = payload
        let log = defaultForgeLog()
        mergeModel(log, updateData)
        state.battle.push(log)
      }
    }
  }
})
