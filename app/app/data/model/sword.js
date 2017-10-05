define((require, exports, module) => {
  const SwordMasterData = require('data/SwordMaster1507123959937')
  const SwordLevelMasterData = require('data/SwordLevelMaster1507123959924')
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
      inBattle: false,
      get name () {
        return _.get(SwordMasterData, [this.sword_id, 'name'], '暂未获取')
      },
      get baseId () {
        return _.get(SwordMasterData, [this.sword_id, 'baseId'], 0)
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
      get fatigueFlag () {
        let fatigue = this.fatigue
        if (fatigue <= TRH.FATIGUE.VALUE.VERY_TIERD) {
          return 0
        } else if (fatigue <= TRH.FATIGUE.VALUE.TIERD) {
          return 1
        } else if (fatigue <= TRH.FATIGUE.VALUE.NOMAL) {
          return 2
        } else if (fatigue <= TRH.FATIGUE.VALUE.MAX) {
          return 3
        }
      },
      get shareWord () {
        return _.get(SwordMasterData, [this.sword_id, 'shareWord'], 0)
      },
      get nextExp () {
        let expMaster = SwordLevelMasterData[this.shareWord]
        return Math.max(expMaster[Math.min(this.level + 1, 99)] - this.exp, 0)
      },
      get hana () {
        return '❀'.repeat(this.rarity)
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
      },
      get equips () {
        return [
          this.equip_serial_id1,
          this.equip_serial_id2,
          this.equip_serial_id3
        ].splice(0, _.get(SwordMasterData, [this.sword_id, 'equipSlot'], 3))
      }
    }
  }
})
