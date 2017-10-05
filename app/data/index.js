define((require, exports, module) => {
  const createPartyLevelPlugin = (store) => {
    store.subscribe((mutation, state) => {
      function updatePartyLevel (partyNo) {
        let party = _.get(state, ['party', 'parties', partyNo])
        let swordLevels = _(party.slot)
          .values()
          .map(o => o.serial_id)
          .filter(_.isNumber)
          .map(o => _.get(state, ['swords', 'serial', o, 'level']))
          .filter(_.isNumber)
          .value()
        let totalLevel = Math.floor(_.sum(swordLevels))
        let averageLevel = Math.floor(_.mean(swordLevels))
        store.commit('party/updateLevel', {
          partyNo,
          totalLevel,
          averageLevel
        })
      }
      if (mutation.type === 'party/updateParty') {
        let { partyNo } = mutation.payload
        updatePartyLevel(partyNo)
      }
    })
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
    },
    plugins: [createPartyLevelPlugin]
  })
})
