/**
 * 负责更新战斗状态的类
 */
class TRHBattleManager {

  static update (data) {
    TRHBattleManager.pickPlayerData(data)
    TRHBattleManager.pickSwordData(data)
    TRHBattleManager.pickBattleData(data)
  }

  static pickPlayerData (data) {
    // pick
    let playerObj = _(data.result.player)
      .pick([
        'level',
        'exp'
      ])
      .mapValues(_.toInteger)
      .value()
    // patch
    console.log(playerObj)
    // cast
    // TODO: cast data
  }

  static pickSwordData(data) {
    // pick
    let resultSwordObj = _(data.result.player.party.slot)
      .values()
      .keyBy('serial_id')
      .value()
    let swordObj = _(data.player.party)
      .values()
      .keyBy('serial_id')
      .mapValues((v, k) => {
        return _.assign(v, resultSwordObj[k])
      })
      .value()
    // patch
    TRHSwordManager.update(swordObj)
    // alert

    // cast
    
  }

  static pickBattleData(data) {

  }


}