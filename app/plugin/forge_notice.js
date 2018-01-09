define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'forge/updateForge') {
        let { updateData } = mutation.payload
        let getSwordId = updateData.sword_id
        let time = moment(mutation.payload.updateData.finished_at)
        let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
        let logId = `${updateData.slot_no}#${time.unix()}`
        store.commit('log/addForgeLog', {
          logId,
          ...mutation.payload.updateData
        })
        if (getSwordId) {
          store.dispatch('notice/addNotice', {
            title: `锻刀剧透： ${swordName}`,
            message: `结束时间：${time.subtract(1, 'h').format('hh:mm:ss')}`,
            context: time.isBefore() ? '已经結束了呦！' : '请耐心等待哟（或者拍个加速？）',
            tag: getSwordId,
            renotify: true,
            swordBaseId: getSwordId,
            icon: `static/sword/${getSwordId}.png`
          })
        } else {
          store.dispatch('notice/addNotice', {
            title: `锻刀剧透等待中`,
            message: `结束时间：${time.subtract(1, 'h').format('hh:mm:ss')}`,
            context: '需要重新进入锻刀页面才能看到呦',
            tag: getSwordId,
            renotify: true,
            swordBaseId: getSwordId,
            icon: `static/sword/${getSwordId}.png`
          })
        }
      }
    })
  }
})
