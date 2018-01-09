define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'log/addBattleLog') {
        console.log(state.log.battle)
        localforage.setItem('BattleLog', state.log.battle)
      }
      if (mutation.type === 'log/addForgeLog') {
        console.log(state.log.forge)
        localforage.setItem('ForgeLog', state.log.forge)
      }
      if (mutation.type === 'config/updateConfig') {
        localforage.setItem('Config', state.config)
      }
    })
  }
})
