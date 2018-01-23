define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.hurt_notice == true) {
        if (mutation.type === 'battle/updateBattle') {
          let { updateData } = mutation.payload
          store.commit('log/addBattleLog', {
            logId: `${state.sally.party_no}#${state.sally.episode_id}-${state.sally.field_id}@${moment(updateData.now).unix()}`,
            party_no: state.sally.party_no,
            get_sword_id: updateData.result.get_sword_id,
            episode_id: state.sally.episode_id,
            field_id: state.sally.field_id,
            layer_num: state.sally.layer_num,
            square_id: state.sally.square_id,
            rank: updateData.result.rank,
            mvp: updateData.result.mvp,
          })
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
                battleStatusText: ['正常', '軽傷', '中傷', '重傷', '戰線崩壞', '破壞'][v.battleStatus]
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
              swordBaseId: getSwordId,
              icon: `static/sword/${getSwordId}.png`,
            })
          }
          else if (getSwordId !== 0) {
            let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
            store.dispatch('notice/addNotice', {
              title: `战斗报告`,
              message: '本场无受伤',
              context: `掉落：${swordName}！`,
              swordBaseId: getSwordId,
              icon: `static/sword/${getSwordId}.png`
            })
          }
        }
      }
    })
  }
})
