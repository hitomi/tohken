define((require, exports, module) => {
  return {
    SwordStyle: require('./sword/style'),
    SwordType: require('./sword/style'),
    SwordRange: require('./sword/range'),
    SwordInjury: require('./sword/injury'),
    FATIGUE: {
      STATUS: {
        NONE: 0,
        TIERD: 1,
        VERY_TIERD: 2
      },
      VALUE: {
        VERY_TIERD: 8,
        TIERD: 20,
        NOMAL: 49,
        MAX: 100
      }
    }
  }
})
