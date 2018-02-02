define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.repair_notice == true) {
        if (mutation.type === 'repair/updateRepair') {
          let swordSerialId = mutation.payload.updateData.sword_serial_id
          let sword = _.get(state, ['swords', 'serial', swordSerialId])
          store.dispatch('notice/addNotice', {
            title: `${sword.name} 手入中`,
            message: `结束时间：${moment(parseValues(mutation.payload.updateData.finished_at)).format('MM/DD HH:mm:ss')}`,
            context: '请耐心等待哟（或者拍个加速？）',
            tag: sword.baseId,
            renotify: true,
            swordBaseId: sword.baseId,
            icon: `static/sword/${sword.baseId}.png`
          })
        }
      }
    })
  }
})
