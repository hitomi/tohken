define((require, exports, module) => {
  const Plugin = {
    PartyLevel: require('app/plugin/party_level'),
    RepairNotice: require('app/plugin/repair_notice')
  }

  return new Vuex.Store({
    namespaced: true,
    state () {
      return {
        inBattle: false
      }
    },
    mutations: {
      inBattle (state) {
        state.inBattle = true
      },
      notInBattle (state) {
        state.inBattle = false
      }
    },
    modules: {
      swords: require('./state/swords'),
      resource: require('./state/resource'),
      duty: require('./state/duty'),
      party: require('./state/party'),
      repair: require('./state/repair'),
      player: require('./state/player'),
      equip: require('./state/equip'),
      battle_result: require('./state/battle_result'),
      battle_player: require('./state/battle_player'),
      sally: require('./state/sally'),
      notice: require('./state/notice')
    },
    plugins: _.values(Plugin)
  })
})
