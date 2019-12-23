define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'forge/updateForge'){
        let slotNo = mutation.payload.updateData.slot_no
        let slot = _.get(state, ['forge', 'slot', slotNo])
        let getSwordId = mutation.payload.updateData.sword_id
        let time = moment(parseValues(mutation.payload.updateData.finished_at))
        let swordName = '尚未获取'
        swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '尚未获取')
        let logId = `${slotNo}#${time.unix()}`
        store.commit('log/addForgeLog', {
          logId,
          ...mutation.payload.updateData
        })
        if(slot.isIntervalSet == false || slot.isIntervalSet == null){
          let check = setInterval(function isForgeFinished(){
            if(state.forge.slot=={}){
              clearInterval(check)
            }else{
              slot.isIntervalSet = true
              slot.left_time = moment.utc(slot.finished_at-Date.now()).format('HH:mm:ss')
              if(moment(parseValues(slot.finished_at)).isBefore(Date.now())){
                slot.left_time = '00:00:00'
                if(slot.isNoticed == false || slot.isNoticed == null){
                  if(getSwordId && getSwordId!='unknown'){
                    if(state.config.forge_notice == true){
                      store.dispatch('notice/addNotice', {
                        title: `锻刀剧透： ${swordName}`,
                        message: `结束时间：${time.format('HH:mm:ss')}`,
                        context: time.isBefore() ? '已经结束了呦！' : '请耐心等待哟（或者拍个加速？）',
                        tag: getSwordId,
                        renotify: true,
                        swordBaseId: getSwordId,
                        icon: `static/sword/${getSwordId}.png`
                      })
                    }
                    slot.isNoticed = true
                  }
                }
                clearInterval(check)
                slot.isIntervalSet=false
              }
            }
            if(slot.status != 2){
              slot.isNoticed = false
              slot.isIntervalSet = false
              clearInterval(check)
            }
          },1000)
        }
      }
    })
  }
})
