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
      }
    }

    static updatePartyBattleStatus (partyNo, inBattle) {

    }

    static common (content) {
      if (content.sword) {
        _.each(content.sword, (v, k) => {
          v.inBattle = false
          if (v.battleStatus) {
            v.status = v.battleStatus
            delete v.battleStatus
          }
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
      if (content.forge) {
        _.each(content.forge, (v, k) => {
          store.commit('forge/updateForge', {
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
      store.commit('party/updateParty', {
        partyNo: content.result.player.party.partyNo,
        updateData: { inBattle: true }
      })
      store.commit('battle/updateBattleResult', {
        updateData: content.result
      })
      store.commit('battle/updateBattlePlayer', {
        updateData: content.player
      })
      store.commit('battle/updateBattle', {
        updateData: content
      })
      _.each(_.values(_.get(content, ['result', 'player', 'party', 'slot'])), (v, k) => {
        v.inBattle = true
        if (v.status) {
          v.battleStatus = v.status
          delete v.status
        }
        // How to get vvfatigue
        v.vvfatigue = _.get(state, ['result', 'player', 'party', 'slot'])
        let rank = _.get(content, ['result', 'rank'])
        let mvp = _.get(content, ['result', 'mvp'])
        let leader = _.get(content, ['result', 'player', 'party', 'slot', '1', 'serial_id'])
        if(rank == 2) {
          console.log("Rank S")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.vvfatigue += 3
          }
          v.vvfatigue += 1
        }
        else if(rank == 3) {
          console.log("Rank A")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.vvfatigue += 3
          }
          v.vvfatigue += 0
        }
        else if(rank == 4) {
          console.log("Rank B")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.vvfatigue += 3
          }
          v.vvfatigue -= 1
        }
        else if(rank == 5) {
          console.log("Rank C")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.vvfatigue += 3
          }
          v.vvfatigue -= 2
        }
        if(v.serial_id == mvp) {
          console.log("mvp calculate")
          v.vvfatigue += 10
        }
        if(v.vvfatigue >= 100) {
          console.log(">= 100")
          v.vvfatigue = 100
        }
        console.log(v)
        store.commit('swords/updateSword', {
          serialId: v.serial_id,
          updateData: v
        })
      })
      _.each(_.values(_.get(content, ['player', 'party'])), (v, k) => {
        let equipUpdate = [{
          serial_id: v.equip_serial_id1,
          soldier: v.soldier1
        }, {
          serial_id: v.equip_serial_id2,
          soldier: v.soldier2
        }, {
          serial_id: v.equip_serial_id3,
          soldier: v.soldier3
        }]
        _.each(_.filter(equipUpdate, o => !isNaN(o.serial_id)), (v) => {
          store.commit('equip/updateEquip', {
            serialId: v.serial_id,
            updateData: v
          })
        })
      })
    }

    static ['home'] (content) {
      store.commit('notInBattle')
    }

    static ['sally/sally'] (content) {
      store.commit('inBattle')
      store.commit('fatigueToVV')
      store.commit('sally/updateSally', {
        updateData: content.post_data
      })
    }

    static ['login/start'] (content) {
      store.commit('player/updatePlayer', {
        updateData: _.pick(content, ['name', 'level'])
      })
    }

    static ['equip/setequip'] (content) {
      store.commit('swords/updateSword', {
        serialId: content.sword.serial_id,
        updateData: content.sword
      })
    }

    static ['equip/removeequip'] (content) {
      store.commit('swords/updateSword', {
        serialId: content.sword.serial_id,
        updateData: content.sword
      })
    }

    static ['equip/setitem'] (content) {
      store.commit('swords/updateSword', {
        serialId: content.sword.serial_id,
        updateData: content.sword
      })
    }

    static ['equip/removeitem'] (content) {
      store.commit('swords/updateSword', {
        serialId: content.sword.serial_id,
        updateData: content.sword
      })
    }

    static ['party/setsword'] (content) {
      _.each(_.pick(content, [1, 2, 3, 4]), (v, k) => {
        store.commit('party/updateParty', {
          partyNo: k,
          updateData: v
        })
      })
    }

    static ['party/removesword'] (content) {
      _.each(_.pick(content, [1, 2, 3, 4]), (v, k) => {
        store.commit('party/updateParty', {
          partyNo: k,
          updateData: v
        })
      })
    }
  }
})
