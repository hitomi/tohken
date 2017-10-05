define((require, exports, module) => {
  const store = require('app/data/index')
  return class TRHRequestRouter {
    static route (action, content) {
      // Log
      console.log(action)
      // Common
      this.common(content)
      // Route
      if (_.isFunction(this[action])) {
        this[action](content)
      } else {
        this.default(content)
      }
    }

    static common (content) {
      if (content.sword) {
        _.each(content.sword, (v, k) => {
          store.commit('swords/updateSword', {
            serialId: k,
            updateData: v
          })
        })
      }
      if (content.resource) {
        store.commit('resource/updateResource', {
          updateData: content.resource
        })
      }
      if (content.party) {
        _.each(content.party, (v, k) => {
          store.commit('party/updateParty', {
            partyNo: k,
            updateData: v
          })
        })
      }
      if (content.player) {
        store.commit('player/updatePlayer', {
          updateData: content.player
        })
      }
      if (content.repair) {
        _.each(content.repair, (v, k) => {
          store.commit('repair/updateRepair', {
            slotNo: k,
            updateData: v
          })
        })
      }
      if (content.duty) {
        store.commit('duty/updateDuty', {
          updateData: content.duty
        })
      }
      if (content.equip) {
        _.each(content.equip, (v, k) => {
          store.commit('equip/updateEquip', {
            serialId: k,
            updateData: v
          })
        })
      }
    }

    static ['battle/battle'] (content) {
      store.commit('inBattle')
      store.commit('battle_result/updateBattleResult', {
        updateData: content.result
      })
      store.commit('battle_player/updateBattlePlayer', {
        updateData: content.player
      })
    }

    static ['sally/sally'] (content) {
      store.commit('inBattle')
      store.commit('sally/updateSally', {
        updateData: content.post_data
      })
    }

    static default (content) {
      store.commit('notInBattle')
    }
  }
})
