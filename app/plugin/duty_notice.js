define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'duty/updateDuty') {
        let finished_at = mutation.payload.updateData.finished_at
        let horse_id2 = mutation.payload.updateData.horse_id2
        let horse_id1 = mutation.payload.updateData.horse_id1
        let field_id1 = mutation.payload.updateData.field_id1
        let field_id2 = mutation.payload.updateData.field_id2
        let bout_id1 = mutation.payload.updateData.bout_id1 
        let bout_id2 = mutation.payload.updateData.bout_id2
        if(horse_id1 == null && horse_id2 == null && field_id1 == null && field_id2 == null && bout_id1 == null && bout_id2 == null ) {
          store.dispatch('notice/addNotice', {
            title: `内番未放置`,
            context: '请安排刀刀们干活啦！',
            disableAutoClose: true,
            swordBaseId: 50,
            icon: `static/sword/50.png`
          })
        }
        if(state.duty.duty.isIntervalSet == false || state.duty.duty.isIntervalSet == null) {
          console.log("set interval")
          let check = setInterval(function isDutyFinished(){
            state.duty.duty.isIntervalSet = true
            if(finished_at != null && moment(finished_at).subtract(1, 'h').isBefore(Date.now())) {
              store.dispatch('notice/addNotice', {
                title: `内番结束！`,
                message: `结束时间：${moment(finished_at).subtract(1, 'h').format('hh:mm:ss')}`,
                context: '请尽快收取！',
                renotify: true,
                disableAutoClose: true,
                swordBaseId: 50,
                icon: `static/sword/50.png`
              })
              clearInterval(check)
              state.duty.duty.isIntervalSet = false
            }
          }, 1000)
        }
      }
    })
  }
})
