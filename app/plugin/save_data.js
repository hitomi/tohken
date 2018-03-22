define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'log/addBattleLog':
          return localforage.setItem('BattleLog', state.log.battle)
        case 'log/addForgeLog':
          return localforage.setItem('ForgeLog', state.log.forge)
        case 'log/addPracticeLog':
          return localforage.setItem('PracticeLog', state.log.practice)
        case 'log/addDutyLog':
          return localforage.setItem('DutyLog', state.log.duty)
        case 'config/updateConfig':
          return localforage.setItem('Config', state.config)
        case 'swords/updateSword':
          return localforage.setItem('Swords', state.swords)
        case 'resource/updateResource':
          return localforage.setItem('Resource', state.resource)
        case 'party/updateParty':
          return localforage.setItem('Party', state.party)
        case 'equip/updateEquip':
          return localforage.setItem('Equip', state.equip)
        case 'player/updatePlayer':
          return localforage.setItem('Player', state.player)
        case 'item/updateItem':
          return localforage.setItem('Item', state.item)
        case 'duty/updateDuty':
          return localforage.setItem('Duty', state.duty)
        case 'evolution/updateEvolution':
          return localforage.setItem('Evolution',state.evolution)
      }
    })
  }
})
