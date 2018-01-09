define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'log/addBattleLog') {
        localforage.setItem('BattleLog', state.log.battle)
      }
      if (mutation.type === 'log/addSallyLog') {
        localforage.setItem('SallyLog', state.log.sally)
      }
      if (mutation.type === 'config/updateConfig') {
        localforage.setItem('Config', state.config)
      }
    })
  }
})
