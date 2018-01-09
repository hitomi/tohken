define((require, exports, module) => {
  const defaultBattleLog = require('../model/battle_log')
  const defaultSallyLog = require('../model/sally_log')
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
      addSallyLog (state, payload) {
        let { updateData } = payload
        let log = defaultSallyLog()
        mergeModel(log, updateData)
        state.battle.push(log)
      }
    }
  }
})
