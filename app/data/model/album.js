define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      sword_id: null,
      image_flg: null,
      letter: null,
      bgm_flg: null,
      new_flg: null,
      flg_max: null,
      get name () {
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'name'], '-') + (_.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'symbol'], 0) === 2 ? '·極' : '')
      },
      
      get all_img_flg () {
        return this.image_flg==this.flg_max ? 1 : 0
      },

      get work_img_flg () {
        return parseInt(this.image_flg/16)%2 ? 1 : 0
      },
      get serious_img_flg () {
        return parseInt(this.image_flg/8)%2 ? 1 : 0
      }
    }
  }
})
