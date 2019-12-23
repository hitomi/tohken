define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      
        if (mutation.type === 'duty/updateDuty') {

          let { finished_at, horse_id2, horse_id1, field_id1, field_id2, bout_id1, bout_id2, param} = mutation.payload.updateData
          
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
          })
          }}
          //if (state.config.duty_notice == true) {
          if(_.every([horse_id1, horse_id2, field_id1, field_id2, bout_id1, bout_id2], _.isNull) || JSON.stringify(mutation.payload.updateData)=="{}" || JSON.stringify(mutation.payload.updateData)=="[]") {
            state.duty['status']=1
          } else if (!finished_at) {
            finished_at = state.duty.finished_at
            state.duty['status']=2
          } else{
            state.duty['status']=2
          }
          if(state.duty.isIntervalSet == false || state.duty.isIntervalSet == null) {
            //console.log("set interval")
            
            let check = setInterval(function isDutyFinished(){

              state.duty.isIntervalSet = true
              state.duty.left_time = moment.utc(state.duty.finished_at-Date.now()).format('HH:mm:ss')

              
              if(finished_at != null && moment(parseValues(finished_at)).isBefore(Date.now()) && state.duty.status==2) {
                state.duty.left_time = '00:00:00'
                if (state.config.duty_notice == true) {
                store.dispatch('notice/addNotice', {
                  title: `内番结束！`,
                  message: `结束时间：${moment(parseValues(finished_at)).format('HH:mm:ss')}`,
                  context: '请尽快收取！',
                  renotify: true,
                  disableAutoClose: true,
                  swordBaseId: state.swords.serial[state.party.parties[1].slot[1].serial_id].sword_id,
                  icon: `static/sword/${state.swords.serial[state.party.parties[1].slot[1].serial_id].sword_id}.png`
                })}
                state.duty.isIntervalSet = false
                clearInterval(check)
              } 
              if(state.duty['status'] != 2){
                state.duty.isNoticed = false
                state.duty.isIntervalSet = false
                clearInterval(check)
              }
            }, 1000)
          }
        //}
      }
    })
  }
})
