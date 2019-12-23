define((require, exports, module) => {
  return () => {
    return {
      secretary: 3,
      conquest_notice: true,
      duty_notice: true,
      forge_notice: true,
      hurt_notice: false,
      repair_notice: true,
      evolution_notice: true,
      debug_mode: false,
      timeout: 3,
      partySelected: 1,
      info_hide:{
        user_name: false,
        user_level: false,
        created_at: false
      },
      activityShow: 'default'
    }
  }
})
