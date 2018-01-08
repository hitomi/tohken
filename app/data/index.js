define((require, exports, module) => {
  const Plugin = {
    PartyLevel: require('app/plugin/party_level'),
    RepairNotice: require('app/plugin/repair_notice'),
    ForgeNotice: require('app/plugin/forge_notice'),
    HurtNotice: require('app/plugin/hurt_notice'),
    DutyNotice: require('app/plugin/duty_notice'),
    ConquestNotice: require('app/plugin/conquest_notice'),
  }

  return new Vuex.Store({
    namespaced: true,
    state () {
      return {
        inBattle: false,
        dataLoaded: {}
      }
    },
    mutations: {
      inBattle (state) {
        state.inBattle = true
      },
      notInBattle (state) {
        state.inBattle = false
      },
      fatigueToVV (state) {
        let swords = state.swords
        for(let sword in swords) {
          sword.vvfatigue = sword.fatigue - 10
          console.log(sword.serial_id + "   " + sword.vvfatigue)
        }
      },
      loadData (state, payload) {
        let { key, loaded } = payload
        Vue.set(state.dataLoaded, key, loaded)
      }
    },
    modules: {
      swords: require('./state/swords'),
      resource: require('./state/resource'),
      duty: require('./state/duty'),
      party: require('./state/party'),
      repair: require('./state/repair'),
      forge: require('./state/forge'),
      player: require('./state/player'),
      equip: require('./state/equip'),
      battle: require('./state/battle'),
      sally: require('./state/sally'),
      notice: require('./state/notice')
    },
    plugins: _.values(Plugin)
  })
})
