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
      if (mutation.type === 'swords/updateSword') {
        localforage.setItem('Swords', state.swords)
      }
      if (mutation.type === 'resource/updateResource'){
        localforage.setItem('Resource', state.resource)
      }
      if (mutation.type === 'party/updateParty'){
        localforage.setItem('Party', state.party)
      }
      if (mutation.type === 'equip/updateEquip'){
        localforage.setItem('Equip', state.equip)
      }
      if (mutation.type === 'player/updatePlayer'){
        localforage.setItem('Player', state.player)
      }
      if (mutation.type === 'item/updateItem'){
        localforage.setItem('Item', state.item)
      }
    })
  }
})
