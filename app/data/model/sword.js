define((require, exports, module) => {
  const SwordMasterData = require('data/SwordMaster1507123959937')
  const TRH = require('app/core/const/index')
  return () => {
    return {
      serial_id: null,
      sword_id: null,
      rarity: null,
      level: null,
      exp: null,
      next_exp: null,
      evol_num: null,
      hp: null,
      hp_max: null,
      atk: null,
      def: null,
      mobile: null,
      back: null,
      scout: null,
      hide: null,
      hp_up: null,
      atk_up: null,
      def_up: null,
      mobile_up: null,
      back_up: null,
      scout_up: null,
      hide_up: null,
      loyalties: null,
      fatigue: null,
      equip_serial_id1: null,
      equip_serial_id2: null,
      equip_serial_id3: null,
      horse_serial_id: null,
      item_id: null,
      protect: null,
      status: null,
      recovered_at: null,
      created_at: null,
      get name () {
        return this.sword_id ? SwordMasterData[this.sword_id].name : '空'
      },
      get vfatigue () {
        let fatigue = this.fatigue
        if (fatigue < TRH.FATIGUE.VALUE.NOMAL && !_.isUndefined(this.recovered_at)) {
          let now = Math.floor(Date.now() / 1000)
          let recovered = Math.floor(this.recovered_at / 1000)
          fatigue = Math.floor((now - recovered) / 180) * 3
          fatigue = fatigue > TRH.FATIGUE.VALUE.NOMAL ? TRH.FATIGUE.VALUE.NOMAL : fatigue
        }
        return fatigue
      },
      get hana () {
        // let words = ['一', '二', '三', '四', '五']
        return '❀'.repeat(this.rarity) // words[this.rarity - 1] + 
      },
      get typeName () {
        return TRH.SwordType[this.type]
      },
      get styleName () {
        return TRH.SwordStyle[this.styleId] ? TRH.SwordStyle[this.styleId] : '-'
      },
      get rangeName () {
        return TRH.SwordRange[this.type]
      },
      get protectName () {
        return this.protect ? '锁' : '-'
      },
      get evoName () {
        return ['普通', '特', '特二', '特三'][this.evol_num]
      }
    }
  }
})
