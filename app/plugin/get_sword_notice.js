define((require, exports, module) => {
  const SwordMasterData = require('data/SwordMaster1507123959937')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'battle_result/updateBattleResult') {
        let swordId = mutation.payload.updateData.get_sword_id
        if (!swordId) return
        let swordName = _.get(SwordMasterData, [swordId, 'name'], '未知') // 如何用sword id获取sword
        if (swordId !== null) {
          store.dispatch('notice/addNotice', {
            title: `${swordName} 入手！`,
            message: `恭喜！`,
            tag: swordId,
            renotify: true,
            swordBaseId: swordId,
            icon: `static/sword/${swordId}.png`
          })
        }
      }
    })
  }
})
