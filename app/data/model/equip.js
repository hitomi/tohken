define((require, exports, module) => {
  let equipMasterData = require('data/EquipMaster1507123959946')
  return () => {
    return {
      serial_id: null,
      equip_id: null,
      soldier: null,
      get name () {
        return _.get(equipMasterData, [this.equip_id, 'name'], '暂未获取')
      },
      get hp () {
        return this.soldier
      },
      get hp_max () {
        return _.get(equipMasterData, [this.equip_id, 'soldier'], 0)
      },
      get level () {
        return _.get(equipMasterData, [this.equip_id, 'rarity'], 0)
      }
    }
  }
})
