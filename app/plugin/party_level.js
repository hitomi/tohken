define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      function updatePartyLevel (partyNo) {
        let party = _.get(state, ['party', 'parties', partyNo])
        let swordLevels = _(party.slot)
          .values()
          .map(o => o.serial_id)
          .filter(_.isNumber)
          .map(o => _.get(state, ['swords', 'serial', o, 'level']))
          .filter(_.isNumber)
          .filter(o => {
            if(o==0)
              return false
            else return true
          })
          .value()
        let totalLevel = Math.floor(_.sum(swordLevels))
        let averageLevel = 0
        if(totalLevel!=0){
          averageLevel = Math.ceil(_.mean(swordLevels))
        }
        store.commit('party/updateLevel', {
          partyNo,
          totalLevel,
          averageLevel
        })
      }
      if (mutation.type === 'party/updateParty') {
        let { partyNo } = mutation.payload
        updatePartyLevel(partyNo)
      }
    })
  }
})
