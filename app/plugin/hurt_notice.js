define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {

      
        if (mutation.type === 'battle/updateBattle' || mutation.type === 'battle/updatePracticeBattle') {
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
                battleStatusText: ['正常', '軽傷', '中傷', '重傷', '戰線崩壞', '破壞'][v.battleStatus]
              })
            })
            .values()
            .value()
          let getSwordId = _.get(updateData, ['result', 'get_sword_id'])
          let getInstrumentId = 0
          if(updateData.result.drop_reward.length!=0){
            getInstrumentId = _.get(updateData, ['result', 'drop_reward', '0', 'item_id'])
          }
          else{
            getInstrumentId = 0
          }
          if(getInstrumentId>29 || getInstrumentId<25){
            getInstrumentId = 0
          }
          let playerEquips = _(_.get(updateData, ['player', 'party']))
            .values()
            .keyBy(o => o.serial_id)
            .mapValues((v, k) => {
              let equip1 = null
              let equip2 = null
              let equip3 = null
              if(v.init_soldier1>0 && v.soldier1 == 0){
                equip1 = v.equip_id1
              }
              if(v.init_soldier2>0 && v.soldier2 == 0){
                equip2 = v.equip_id2
              }
              if(v.init_soldier3>0 && v.soldier3 == 0){
                equip3 = v.equip_id3
              }
              return {
                serial_id: v.serial_id,
                equip: {
                  1: equip1,
                  2: equip2,
                  3: equip3
                }
              }
            })
            .filter(o => {
              if(o.equip[1] != null || o.equip[2] != null || o.equip[3] != null)
                return o
            })
            .mapValues((v,k) => {
              let sword = _.get(state, ['swords', 'serial', v.serial_id], {})
              let equipstring = ''
              if(v.equip[1]!=null)
                equipstring += '['+_.get(TRHMasterData.getMasterData('Equip'), [v.equip[1], 'name'], '-') + '] '
              if(v.equip[2]!=null)
                equipstring += '['+_.get(TRHMasterData.getMasterData('Equip'), [v.equip[2], 'name'], '-') + '] '
              if(v.equip[3]!=null)
                equipstring += '['+_.get(TRHMasterData.getMasterData('Equip'), [v.equip[3], 'name'], '-') + '] '
              return {
                serial_id: v.serial_id,
                name: sword.name,
                equips: equipstring
              }
            })
            .values()
            .value()
          let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
          if (getInstrumentId!=0){
            if(getSwordId!=0){
              swordName+=" & "+ _.get(TRHMasterData.getMasterData('Consumable'), [getInstrumentId, 'name'], '-')
            }else{
              swordName= _.get(TRHMasterData.getMasterData('Consumable'), [getInstrumentId, 'name'], '-')
              getSwordId = 'item'+getInstrumentId
            }
          }
          
          let timeout = _.get(state, ['config', 'timeout'], 3)*1000
          if (timeout<3000){
            timeout = 3000
          }
          if (state.config.hurt_notice == true) {
          if (playerParty.length) {
            if (swordName){
              if (playerEquips.length)
              store.dispatch('notice/addNotice', {
                title: `战斗报告`,
                message: _.map(playerEquips, o => `[刀装破坏] ${o.name} - ${o.equips}`).join('<br>')+'<br>'+_.map(playerParty, o => `[${o.battleStatusText}] ${o.name} HP -${o.hp}`).join('<br>'),
                context: `掉落：${swordName}！`,
                timeout: timeout,
                swordBaseId: getSwordId,
                icon: `static/sword/${getSwordId}.png`,
              })
              else
              store.dispatch('notice/addNotice', {
                title: `战斗报告`,
                message: _.map(playerParty, o => `[${o.battleStatusText}] ${o.name} HP -${o.hp}`).join('<br>'),
                context: `掉落：${swordName}！`,
                timeout: timeout,
                swordBaseId: getSwordId,
                icon: `static/sword/${getSwordId}.png`,
              })
            }
          }
          else if (playerEquips.length) {
            if (swordName)
            store.dispatch('notice/addNotice', {
              title: `战斗报告`,
              message: _.map(playerEquips, o => `[刀装破坏] ${o.name} - ${o.equips}`).join('<br>'),
              context: `掉落：${swordName}！`,
              timeout: timeout,
              swordBaseId: getSwordId,
              icon: `static/sword/${getSwordId}.png`,
            })
          }
          else if (getSwordId !== 0) {
            store.dispatch('notice/addNotice', {
              title: `战斗报告`,
              message: '本场无受伤',
              context: `掉落：${swordName}！`,
              timeout: timeout,
              swordBaseId: getSwordId,
              icon: `static/sword/${getSwordId}.png`
            })
          }
        }
      }
    })
  }
})
