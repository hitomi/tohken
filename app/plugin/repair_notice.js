define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'repair/updateRepair') {
        let swordSerialId = mutation.payload.updateData.sword_serial_id
        let sword = _.get(state, ['swords', 'serial', swordSerialId])
        store.dispatch('notice/addNotice', {
          title: `${sword.name} 手入开始`,
          message: `结束时间：${moment(sword.recovered_at).format('hh:mm:ss')}`,
          context: 'hahahaha',
          swordBaseId: sword.baseId,
          icon: `static/sword/${sword.baseId}.png`
        })
      }
    })
  }
})
