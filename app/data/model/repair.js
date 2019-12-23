define((require, exports, module) => {
  return () => {
    return {
      slot_no: null,
      sword_serial_id: null,
      push_serial_id: null,
      finished_at: null,
      isIntervalSet: false,
      isNoticed: false,
      left_time: '',
      status: 2
    }
  }
})
