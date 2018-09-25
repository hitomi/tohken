define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      
        if (mutation.type === 'duty/updateDuty') {
          let { finished_at, horse_id2, horse_id1, field_id1, field_id2, bout_id1, bout_id2, param } = mutation.payload.updateData
          
          if(param){
          let paramResult = {
            horse_id1: '',
            horse_id2: '',
            field_id1: '',
            field_id2: '',
            bout_id1: '',
            bout_id2: ''
          }
          _.each(paramResult, (v, k)=>{
            if(mutation.payload.updateData[k]){
              up_type = param[mutation.payload.updateData[k]].up_type
              is_max = param[mutation.payload.updateData[k]].is_max
              up_value = param[mutation.payload.updateData[k]].up_value
              valueResult = is_max ? 'MAX' : '+'+ up_value
              typeResult = ['機動', '統率', '偵察', '生存', '打撃', '衝力'][up_type-1]
              paramResult[k]='('+typeResult+valueResult+')'
            }
          })
          if(finished_at){
          store.commit('log/addDutyLog', {
            logId: `${moment(parseValues(finished_at)).unix()}`,
            finished_at: finished_at,
            horse_id2: horse_id2,
            horse_id1: horse_id1,
            field_id1: field_id1,
            field_id2: field_id2,
            bout_id1: bout_id1,
            bout_id2: bout_id2,
            param: paramResult
          })}}else{
            if(finished_at){
            store.commit('log/addDutyLog', {
            logId: `${moment(parseValues(finished_at)).unix()}`,
            finished_at: finished_at,
            horse_id2: horse_id2,
            horse_id1: horse_id1,
            field_id1: field_id1,
            field_id2: field_id2,
            bout_id1: bout_id1,
            bout_id2: bout_id2
          })}}
            if (state.config.duty_notice == true) {
            if(_.every([horse_id1, horse_id2, field_id1, field_id2, bout_id1, bout_id2], _.isNull) || mutation.payload.updateData.length == 0) {
            store.dispatch('notice/addNotice', {
              title: `内番未放置`,
              context: '请安排刀刀们干活啦！',
              disableAutoClose: true,
              swordBaseId: state.config.secretary,
              icon: `static/sword/${state.config.secretary}.png`
            })
          } else if (!finished_at) {
            finished_at = state.duty.finished_at
          }
          if(state.duty.isIntervalSet == false || state.duty.isIntervalSet == null) {
            console.log("set interval")
            let check = setInterval(function isDutyFinished(){
              state.duty.isIntervalSet = true
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
                state.duty.isIntervalSet = false
              }
            }, 1000)
          }
        }
      }
    })
  }
})
