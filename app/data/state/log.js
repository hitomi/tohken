define((require, exports, module) => {
  const defaultBattleLog = require('../model/battle_log')
  const defaultForgeLog = require('../model/forge_log')
  return {
    namespaced: true,
    state () {
      return {
        battle: {},
        forge: {}
      }
    },
    mutations: {
      addBattleLog (state, payload) {
        let { logId } = payload
        if (!logId) return
        if (!state.battle[logId]) {
          Vue.set(state.battle, logId, defaultBattleLog())
        }
        mergeModel(state.battle[logId], payload)
      },
      addForgeLog (state, payload) {
        let { logId } = payload
        if (!logId) return
        if (!state.forge[logId]) {
          Vue.set(state.forge, logId, defaultForgeLog())
        }
        mergeModel(state.forge[logId], payload)
      }
    }
  }
})
