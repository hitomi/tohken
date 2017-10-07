define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'battle/updateBattle') {
        let { updateData } = mutation.payload
        let resultParty = _(_.get(updateData, ['result', 'player', 'party', 'slot']))
          .values()
          .keyBy(o => o.serial_id)
          .value()
        let playerParty = _(_.get(updateData, ['player', 'party']))
          .values()
          .keyBy(o => o.serial_id)
          .mapValues((v, k) => {
            return {
              serial_id: v.serial_id,
              hp: _.toNumber(v.hp) - _.toNumber(_.get(resultParty, [k, 'hp'], 0)),
              battleStatus: _.toNumber(_.get(resultParty, [k, 'status'], 0))
            }
          })
          .filter(o => o.hp > 0)
          .mapValues((v, k) => {
            let sword = _.get(state, ['swords', 'serial', v.serial_id], {})
            return _.extend(v, {
              name: sword.name,
              injury: sword.injury,
              baseId: sword.baseId,
              battleStatusText: ['正常', '軽傷', '中傷', '重傷', 'RING_OUT', '破壞'][v.battleStatus]
            })
          })
          .values()
          .value()
        let getSwordId = _.get(updateData, ['result', 'get_sword_id'])
        if (playerParty.length) {
          let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
          store.dispatch('notice/addNotice', {
            title: `战斗报告`,
            message: _.map(playerParty, o => `[${o.battleStatusText}] ${o.name} HP -${o.hp}`).join('<br>'),
            context: `掉落：${swordName}！`,
            swordBaseId: playerParty[0].baseId,
            icon: `static/icon.png`,
          })
        }
        else if (!getSwordId) {
          let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
          store.dispatch('notice/addNotice', {
            title: `战斗报告`,
            message: '本场无受伤',
            context: `掉落：${swordName}！`,
            icon: `static/sword/${getSwordId}.png`
          })
        }
      }
    })
  }
})
