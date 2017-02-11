class TRHSwordManager {

  static load () {
    return localforage
      .getItem('SwordManager')
      .then((sm) => {
        TRHSwordManager._sword = _.isObject(sm) ? _.mapValues(sm, s => new TRHGameSword(s)) : {}
        // Wrapper
        _.each(TRHSwordManager._sword, (v, serial_id) => {
          if (_.isUndefined(TRHSwordManager[serial_id]))
            Object.defineProperty(TRHSwordManager, serial_id, {
              get () {
                return TRHSwordManager._sword[serial_id]
              }
            })
        })
      })
  }

  static update (data) {
    _.each(data, (v) => {
      // Drop useless data
      if (!_.has(v, 'sword_id')) return
      if (!_.has(v, 'serial_id')) return
      // Convert
      let serial_id = _.toInteger(v['serial_id'])
      // Find Object
      if (_.isUndefined(TRHSwordManager[serial_id])) {
        let sword = new TRHGameSword(v)
        // If success initialed
        if (_.isInteger(sword.baseId)) {
          // save
          TRHSwordManager._sword[serial_id] = sword
          // Wrapper
          Object.defineProperty(TRHSwordManager, serial_id, {
            get () {
              return TRHSwordManager._sword[serial_id]
            }
          })
        }
      } else {
        // Normal update
        TRHSwordManager[serial_id].update(v)
      }
    })
    return TRHSwordManager.save()
  }

  static save () {
    return localforage
      .setItem('SwordManager', _.mapValues(TRHSwordManager._sword, s => s._data))
      .then(function (value) {
        chrome.runtime.sendMessage({ updated: 'sword' })
      })
  }

}