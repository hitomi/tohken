define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return () => {
    return {
      // filling: false,
      name: null,
      level: null,
      // symbol: null,
      exp: null,
      next_exp: null,
      introduction: null,
      introduction_id: null,
      sword_num: null,
      max_sword: null,
      equip_max: null,
      // equip_now: null,
      // secretary: null,
      // secretary_serial_id: null,
      party_num: null,
      max_party: null,
      forge_slot: null,
      max_forge: null,
      repair_slot: null,
      max_repair: null,
      world: null,
      created_at: null,
      complete: {
        sword: null,
        dagger: null,
        short: null,
        normal: null,
        long: null,
        large: null,
        spear: null,
        partisan: null,
        equip: null,
        horse: null,
        scene: null,
        furniture: null
      },
      summary: {
        battle: null,
        battle_win: null,
        practice: null,
        practice_win: null,
        conquest: null,
        conquest_success: null
      },
      get format_created_at(){
        return new Date(this.created_at).toLocaleString()
      },
      get prev_exp(){
        return _.get(TRHMasterData.getMasterData('UserLevel'), [this.level, 'exp'], 0)
      }
    }
  }
})
