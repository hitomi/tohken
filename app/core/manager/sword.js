class TRHSwordManager {

  static load () {

  }

  static update (data) {
    _.each(data, (v) => {
      if (!_.has(v, 'serial_id')) return
      let serial_id = _.toInteger(v['serial_id'])
      if (_.isUndefined(TRHSwordManager[serial_id])) {
        if (!_.has(v, 'sword_id')) return
        let sword = new TRHGameSword(v)
        if (_.isInteger(sword.baseId)) {
          TRHSwordManager[serial_id] = sword
        }
      } else {
        TRHSwordManager[serial_id].update(v)
      }
    })
  }

  static save () {
    
  }

}