define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
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
      battleFatigue: null,
      equip_serial_id1: null,
      equip_serial_id2: null,
      equip_serial_id3: null,
      horse_serial_id: null,
      item_id: null,
      protect: null,
      status: null,
      battleStatus: null,
      recovered_at: null,
      created_at: null,
      inBattle: false,
      get name () {
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'name'], '暂未获取') + (_.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'symbol'], 0) === 2 ? '·极' : '')
      },
      get baseId () {
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'baseId'], 0)
      },
      get injury () {
        let hpp = (this.hp / this.hp_max)
        if (hpp >= TRH.SwordInjury.MINOR_INJURY_PERCENTAGE) {
          return (TRH.SwordInjury.NONE)
        }
        if (hpp >= TRH.SwordInjury.MEDIUM_INJURY_PERCENTAGE) {
          return (TRH.SwordInjury.MINOR_INJURY)
        }
        if (hpp >= TRH.SwordInjury.SERIOUS_INJURY_PERCENTAGE) {
          return (TRH.SwordInjury.MEDIUM_INJURY)
        }
        if (hpp > 0) {
          return (TRH.SwordInjury.SERIOUS_INJURY)
        }
        return (TRH.SwordInjury.DEATH)
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
        let fatigue = this.vfatigue
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
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'shareWord'], 0)
      },
      get nextExp () {
        let expMaster = TRHMasterData.getMasterData('SwordLevel')[this.shareWord]
        return Math.max(expMaster[Math.min(this.level + 1, 99)] - this.exp, 0)
      },
      get hana () {
        return '❀'.repeat(this.rarity)
      },
      get typeName () {
        let type = _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'type'], 0)
        return TRH.SwordType[type]
      },
      get styleName () {
        let styleId = _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'styleId'], 0)
        return TRH.SwordStyle[styleId] ? TRH.SwordStyle[styleId] : '-'
      },
      get rangeName () {
        let type = _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'type'], 0)
        return TRH.SwordRange[type]
      },
      get protectName () {
        return this.protect ? '锁' : '-'
      },
      get evoName () {
        return ['普通', '特', '特二', '特三'][this.evol_num]
      },
      get equipSlot () {
        return _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'equipSlot'], 3)
      },
      get equips () {
        return [
          this.equip_serial_id1,
          this.equip_serial_id2,
          this.equip_serial_id3
        ].splice(0, _.get(TRHMasterData.getMasterData('Sword'), [this.sword_id, 'equipSlot'], 3))
      }
    }
  }
})
