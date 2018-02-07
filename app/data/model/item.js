define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      consumable_id: null,
      num: null,
      get name () {
        return _.get(TRHMasterData.getMasterData('Consumable'), [this.consumable_id, 'name'], '暂未获取')
      },
      get limitNum () {
        return _.get(TRHMasterData.getMasterData('Consumable'), [this.consumable_id, 'limitNum'], '暂未获取')
      }
    }
  }
})