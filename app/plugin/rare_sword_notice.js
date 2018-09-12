define((require, exports, module) => {
  let TRHMasterData = require('app/core/master')
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.rare_sword_notice == true) {
        if (mutation.type === 'battle/updateBattle' || mutation.type === 'battle/updatePracticeBattle') {
          let { updateData } = mutation.payload
          let getSwordId = _.get(updateData, ['result', 'get_sword_id'])
          console.log(getSwordId)
          if ([3, 5, 9, 13, 15, 17, 25, 31, 33, 35, 37, 43, 51, 53, 55, 57, 59, 63, 67, 69, 71, 75, 77, 79, 103, 105, 107, 112, 120, 124, 130, 136, 140, 142, 144, 146, 148, 150, 152, 154, 156].indexOf(parseInt(getSwordId, 10)) == -1) {
            console.log("not rare!")
            return
          }
          let swordName = _.get(TRHMasterData.getMasterData('Sword'), [getSwordId, 'name'], '无')
          console.log(swordName)
          let timeout = _.get(state, ['config', 'timeout'], 3)*1000
          if (timeout<3000){
            timeout = 3000
          }
          if (swordName){
            store.dispatch('notice/addNotice', {
              title: `发现稀有刀！`,
              message: `恭喜！`,
              context: `掉落：${swordName}！`,
              renotify: true,
              timeout: timeout,
              swordBaseId: getSwordId,
              icon: `static/sword/${getSwordId}.png`,
            })
          }
        }
      }
    })
  }
})
