class TRHRequestRouter {

  static route (action, data) {
    // Log
    console.log(action)
    // Route
    if (_.isFunction(this[action])) {
      this[action].call(this, data)
    }
  }

  static ['party/list'] (data) {
    TRHSwordManager.update(data.sword)
  }

  static ['battle/battle'] (data) {
    TRHBattleManager.update(data)
  }

}