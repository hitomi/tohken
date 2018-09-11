define((require, exports, module) => {
  const Plugin = {
    PartyLevel: require('app/plugin/party_level'),
    RepairNotice: require('app/plugin/repair_notice'),
    ForgeNotice: require('app/plugin/forge_notice'),
    HurtNotice: require('app/plugin/hurt_notice'),
    RareSwordNotice: require('app/plugin/rare_sword_notice'),
    DutyNotice: require('app/plugin/duty_notice'),
    ConquestNotice: require('app/plugin/conquest_notice'),
    SaveData: require('app/plugin/save_data'),
    EvolutionNotice: require('app/plugin/evolution_notice')
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
      fatigueToV (state) {
        let swords = state.swords.serial
        for(let s in swords) {
          let sword = swords[s]
          sword.battleFatigue = Math.max(sword.vfatigue, 0)
        }
      },
      fatigueToVV (state) {
        let swords = state.swords.serial
        for(let s in swords) {
          let sword = swords[s]
          sword.battleFatigue = Math.max(sword.vfatigue - 10, 0)
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
      config: require('./state/config'),
      item: require('./state/item'),
      album: require('./state/album'),
      practice_enemy: require('./state/practice_enemy'),
      evolution: require('./state/evolution'),
      debug: require('./state/debug')
    },
    plugins: _.values(Plugin)
  })
})
