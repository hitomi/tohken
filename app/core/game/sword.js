class TRHGameSword {

  constructor (data) {
    this._save_prefix = 'trh_sword_'
    this.init(data.sword_id, data.serial_id)
    this.update(data)
    this.bind()
  }

  init (_sword_id, _serial_id) {
    let sword_id = _.toInteger(_sword_id)
    let serial_id = _.toInteger(_serial_id)
    this._data = { serial_id }
    _.assign(this._data, TRHMasterData.Sword[sword_id])
  }

  update (data) {
    // base info
    _.assign(this._data, _(data).pick([
      'symbol',    'rarity',
      'level',     'exp',       'evol_num',
      'hp',        'hp_max',    'hp_up',
      'atk',       'atk_up',
      'def',       'def_up',
      'mobile',    'mobile_up',
      'back',      'back_up',
      'scout',     'scout_up',
      'hide',      'hide_up',
      'loyalties', 'fatigue',
      'protect',   'status'
    ]).mapValues(_.toInteger).value())

    // equip and items
    _.assign(this._data, _(data).pick([
      'equip_serial_id1',
      'equip_serial_id2',
      'equip_serial_id3',
      'horse_serial_id',
      'item_id'
    ]).mapValues(o => _.isNull(o) ? null : _.toInteger(o)).value())

    // time need parse
    _.assign(this._data, _(data).pick([
      'recovered_at',
      'created_at'
    ]).mapValues(o => new Date(o + " GMT+0900")).value())
    
  }

  get fatigue () {
    let fatigue = this._data['fatigue']
    if (fatigue < TRH.FATIGUE.VALUE.NOMAL && !_.isUndefined(this.recovered_at)) {
      let now = Math.floor(Date.now() / 1000)
      let recovered = Math.floor(this.recovered_at.getMilliseconds() / 1000)
      fatigue = Math.floor((now - recovered) / 180) * 3
      fatigue = fatigue > TRH.FATIGUE.VALUE.NOMAL ? TRH.FATIGUE.VALUE.NOMAL : fatigue
    }
    return fatigue
  }

  set fatigue(newValue) {
    this._data['fatigue'] = newValue
  }

  bind () {
    _.each(this._data, (v, k) => {
      if (!_.isUndefined(this[k])) return
      Object.defineProperty(this, k, {
        get () {
          return this._data[k]
        },
        set (newValue) {
          this._data[k] = newValue
        }
      })
    })
  }

}