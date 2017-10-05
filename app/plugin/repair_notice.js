define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      function updateRepairTime (slotNo) {
        let slot = _.get(state, ['repair', slotNo])
        let sword = _(state.repair.slot)
          .values()
          .map(o => o.sword_serial_id)
          .filter(_.isNumber)
          .map(o => _.get(state, ['swords', 'serial', o, 'name']))
          .value()
        let time = _(state.repair.slot).finished_at.values()
        console.log(name + '手入开始，将于' + time + '完成')
      }
      if (mutation.type === 'repair/updateRepair') {
        let { slotNo } = mutation.payload
        updateRepairTime(slotNo)
      }
    })
  }
})
