define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.duty_notice == true) {
        if (mutation.type === 'duty/updateDuty') {
          let { finished_at, horse_id2, horse_id1, field_id1, field_id2, bout_id1, bout_id2 } = mutation.payload.updateData
          if(_.every([horse_id1, horse_id2, field_id1, field_id2, bout_id1, bout_id2], _.isNull) || mutation.payload.updateData.length == 0) {
            store.dispatch('notice/addNotice', {
              title: `内番未放置`,
              context: '请安排刀刀们干活啦！',
              disableAutoClose: true,
              swordBaseId: state.secretary,
              icon: `static/sword/${state.secretary}.png`
            })
          }
          if(state.duty.duty.isIntervalSet == false || state.duty.duty.isIntervalSet == null) {
            console.log("set interval")
            let check = setInterval(function isDutyFinished(){
              state.duty.duty.isIntervalSet = true
              if(finished_at != null && moment(parseValues(finished_at)).isBefore(Date.now())) {
                store.dispatch('notice/addNotice', {
                  title: `内番结束！`,
                  message: `结束时间：${moment(parseValues(finished_at)).format('HH:mm:ss')}`,
                  context: '请尽快收取！',
                  renotify: true,
                  disableAutoClose: true,
                  swordBaseId: state.config.secretary,
                  icon: `static/sword/${state.config.secretary}.png`
                })
                clearInterval(check)
                state.duty.duty.isIntervalSet = false
              }
            }, 1000)
          }
        }
      }
    })
  }
})
