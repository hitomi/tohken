define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'repair/updateRepair'){
        let slotNo = mutation.payload.updateData.slot_no
        let slot = _.get(state, ['repair', 'slot', mutation.payload.updateData.slot_no])
        let swordSerialId = mutation.payload.updateData.sword_serial_id
        let sword = _.get(state, ['swords', 'serial', swordSerialId])
        
        if(slot.isIntervalSet  == false || slot.isIntervalSet == null){
          let check = setInterval(function isRepairFinished(){
            if(state.repair.slot=={}){
              clearInterval(check)
            }else{
              slot.isIntervalSet = true
              slot.left_time = moment.utc(slot.finished_at-Date.now()).format('HH:mm:ss')
              if(moment(parseValues(slot.finished_at)).isBefore(Date.now())){
                slot.left_time = '00:00:00'
                if(slot.isNoticed == false || slot.isNoticed == null){
                  if(state.config.repair_notice == true){
                    store.dispatch('notice/addNotice', {
                      title: `手入刀剣：${sword.name} `,
                      message: `结束时间：${moment(parseValues(mutation.payload.updateData.finished_at)).format('MM/DD HH:mm:ss')}`,
                      context: moment(parseValues(mutation.payload.updateData.finished_at)).isBefore() ? '已经結束了呦！' : '请耐心等待哟（或者拍个加速？）',
                      tag: sword.sword_id,
                      renotify: true,
                      swordBaseId: sword.sword_id,
                      icon: `static/sword/${sword.sword_id}.png`
                    })
                  }
                  slot.isNoticed = true
                }
                clearInterval(check)
                slot.isIntervalSet = false
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
