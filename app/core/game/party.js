class TRHGameParty {

  constructor (data) {
    this.init(data.party_no)
    this.update(data)
    this.bind()
  }

  init (_party_no) {
    let party_no = _.toInteger(_party_no)
    this._data = { party_no }
  }

  update (data) {
    // base info
    _.assign(this._data, _(data).pick([
      'status',    'rarity',
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

  bind () {
    _.each(this._data, (v, k) => {
      if (!_.isUndefined(this[k])) return
      Object.defineProperty(this, k, {
        get () {
          return this._data[k]
        }
      })
    })
  }

}