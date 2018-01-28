define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      sword_id: null,
      image_flg: null,
      letter: null,
      bgm_flg: null,
      new_flg: null,
      get name () {
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'name'], '暂未获取') + (_.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'symbol'], 0) === 2 ? '·極' : '')
      },
      get all_img_flg () {
        return this.image_flg==31 ? 1 : 0
      },
      get work_img_flg () {
        return this.image_flg>=16 ? 1 : 0
      },
      get serious_img_flg () {
        return (this.image_flg==15)||(this.image_flg==31) ? 1 : 0
      }
    }
  }
})
