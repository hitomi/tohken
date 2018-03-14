define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      logId: null,
      party_no: null,
      get: null,
      episode_id: null,
      field_id: null,
      square_id: null,
      layer_num: null,
      rank: null,
      mvp: null,
      now: null,
      get category(){
        if(this.episode_id>0)
          return _.get(TRHMasterData.getMasterData('FieldSquare'),[this.episode_id, this.field_id, this.layer_num, this.square_id, 'category'],0)
        else
          return _.get(TRHMasterData.getMasterData('EventSquare'),[this.episode_id, this.field_id, this.layer_num, this.square_id, 'category'],0)
      }
    }
  }
})
