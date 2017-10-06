define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'forge/updateForge') {
        let { updateData } = mutation.payload
        let getSwordId = updateData.sword_id
        let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
        store.dispatch('notice/addNotice', {
          title: `锻刀剧透： ${swordName}`,
          message: `结束时间：${moment(mutation.payload.updateData.finished_at).format('hh:mm:ss')}`,
          context: '请耐心等待哟（或者拍个加速？）',
          tag: getSwordId,
          renotify: true,
          swordBaseId: getSwordId,
          icon: `static/sword/${getSwordId}.png`
        })
      }
    })
  }
})
