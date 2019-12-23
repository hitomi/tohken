define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      serial_id: null,
      equip_id: null,
      soldier: null,
      get name () {
        return _.get(TRHMasterData.getMasterData('Equip'), [this.equip_id, 'name'], '-')
      },
      get hp () {
        return this.soldier
      },
      get hp_max () {
        return _.get(TRHMasterData.getMasterData('Equip'), [this.equip_id, 'soldier'], 0)
      },
      get level () {
        return _.get(TRHMasterData.getMasterData('Equip'), [this.equip_id, 'rarity'], 0)
      },
      get mobile () {
        return _.get(TRHMasterData.getMasterData('Equip'), [this.equip_id, 'mobility'], 0)
      }
    }
  }
})
