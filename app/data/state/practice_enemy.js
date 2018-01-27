define((require, exports, module) => {
  const defaultEquipModel = require('../model/equip')
  const defaultSwordModel = require('../model/sword')
  const defaultPartyModel = require('../model/party')
  return {
    namespaced: true,
    state () {
      return {
        enemy_equip: {},
        enemy_sword: {},
        enemy_party: {}
      }
    },
    mutations: {
      updatePracticeEquip(state,payload){
        let {serialId, updateData} = payload
        if (!state.enemy_equip[serialId]) {
          Vue.set(state.enemy_equip, serialId, defaultEquipModel())
        }
        mergeModel(state.enemy_equip[serialId], updateData)
      },
      updatePracticeSword(state,payload){
        let {serialId, updateData} = payload
        if (!state.enemy_sword[serialId]) {
          Vue.set(state.enemy_sword, serialId, defaultSwordModel())
        }
        mergeModel(state.enemy_sword[serialId], updateData)
      },
      updatePracticeParty(state,payload){
        let {partyNo, updateData} = payload
        if (!state.enemy_party[partyNo]) {
          Vue.set(state.enemy_party, partyNo, defaultPartyModel())
        }
        mergeModel(state.enemy_party[partyNo], updateData)
      }
    }
  }
})