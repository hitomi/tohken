define((require, exports, module) => {
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
      swords: require('./swords'),
      resource: require('./resource'),
      duty: require('./duty'),
      party: require('./party'),
      repair: require('./repair'),
      player: require('./player'),
      equip: require('./equip'),
      battle_result: require('./battle_result'),
      battle_player: require('./battle_player'),
      sally: require('./sally')
    }
  })
})
