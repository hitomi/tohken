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
    console.log(data)
    TRHSwordManager.update(data.sword)
  }

}