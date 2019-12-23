define((require, exports, module) => {
  return () => {
    return {
      party_no: null,
      status: null,
      party_name: null,
      finished_at: null,
      totalLevel: null,
      averageLevel: null,
      inBattle: null,
      isIntervalSet: false,
      isNoticed: false,
      left_time: '',
      slot: {
        1: {
          serial_id: null,
          sword_id: null
        },
        2: {
          serial_id: null,
          sword_id: null
        },
        3: {
          serial_id: null,
          sword_id: null
        },
        4: {
          serial_id: null,
          sword_id: null
        },
        5: {
          serial_id: null,
          sword_id: null
        },
        6: {
          serial_id: null,
          sword_id: null
        }
      }
    }
  }
})
