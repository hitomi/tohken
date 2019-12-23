define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      consumable_id: null,
      num: null,
      get name () {
        return _.get(TRHMasterData.getMasterData('Consumable'), [this.consumable_id, 'name'], '-')
      },
      get limitNum () {
        return _.get(TRHMasterData.getMasterData('Consumable'), [this.consumable_id, 'limitNum'], '-')
      },
      get value () {
        return _.get(TRHMasterData.getMasterData('Consumable'), [this.consumable_id, 'value'], 0)
      }
    }
  }
})