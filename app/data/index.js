define((require, exports, module) => {
  const Plugin = {
    PartyLevel: require('app/plugin/party_level'),
    RepairNotice: require('app/plugin/repair_notice'),
    ForgeNotice: require('app/plugin/forge_notice'),
    HurtNotice: require('app/plugin/hurt_notice'),
    DutyNotice: require('app/plugin/duty_notice'),
    ConquestNotice: require('app/plugin/conquest_notice'),
    SaveData: require('app/plugin/save_data'),
  }

  return new Vuex.Store({
    namespaced: true,
    state () {
      return {
        inBattle: false,
        secretary: 3,
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
        let swords = state.swords.serial
        for(let s in swords) {
          let sword = swords[s]
          sword.battleFatigue = sword.fatigue - 10
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
      notice: require('./state/notice'),
      log: require('./state/log'),
      config: require('./state/config')
    },
    plugins: _.values(Plugin)
  })
})
