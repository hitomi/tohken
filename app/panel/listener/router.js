define((require, exports, module) => {
  const store = require('app/data/index')
  return class TRHRequestRouter {
    static route (action, content) {
      // Log
      console.log(action)
      console.log(content)
      // Route
      if (_.isFunction(this[action])) {
        this[action](content)
      }
      // Common
      //if(action!='party/list')
      this.common(content)
    }

    static updatePartyBattleStatus (partyNo, inBattle) {

    }

    static common (content) {
      if (content.sword) {
        if(!content.sword.serial_id){
        _.each(content.sword, (v, k) => {
          if(v.serial_id){
          v.inBattle = false
          if (v.battleStatus) {
            v.status = v.battleStatus
            delete v.battleStatus
          }
          store.commit('swords/updateSword', {
            serialId: k,
            updateData: v
          })}
        })}
      }
      if (content.resource) {
        store.commit('resource/updateResource', {
          updateData: content.resource
        })
      }
      if (content.currency) {
        store.commit('resource/updateResource', {
          updateData: content.currency
        })
      } else if (content.money) {
        store.commit('resource/updateResource', {
          updateData: _.pick(content, ['money'])
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
          if (!v.serial_id) return
          store.commit('equip/updateEquip', {
            serialId: v.serial_id,
            updateData: v
          })
        })
      }
      if (content.item_list) {
        _.each(content.item_list, (v, k) => {
          store.commit('item/updateItem', {
            consumableId: k,
            updateData: v
          })
        })
      } else if(content.item) {
        _.each(content.item_list, (v, k) => {
          store.commit('item/updateItem', {
            consumableId: k,
            updateData: v
          })
        })
      }
    }
    static ['party/list'](content){
      store.commit('swords/clear')
      store.commit('equip/clear')
      store.commit('item/clear')
    }

    static ['forge'](content){
      store.commit('forge/clear')
    }

    static ['repair'](content){
      store.commit('repair/clear')
    }

    static ['practice/offer'](content){
      _.each(content.enemy_equip, (v,k) => {
        store.commit('practice_enemy/updatePracticeEquip', { 
          serialId: k, 
          updateData: v
        })
      })
      _.each(content.enemy_sword, (v,k) => {
        store.commit('practice_enemy/updatePracticeSword', {
          serialId: k, 
          updateData: v
        })
      })
      _.each(content.enemy_party, (v,k) => {
        store.commit('practice_enemy/updatePracticeParty', {
          partyNo: k, 
          updateData: v
        })
      })
    }

    static ['battle/practicescout'](content){
      store.commit('inBattle')
      store.commit('sally/updateSally', {
        updateData: content.postData
      })
    }

    static ['battle/practicebattle'](content){
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
      store.commit('battle/updatePracticeBattle', {
        updateData: content
      })
      _.each(_.values(_.get(content, ['result', 'player', 'party', 'slot'])), (v, k) => {
        v.inBattle = true
        if (v.status) {
          v.battleStatus = v.status
          delete v.status
        }
        v.battleFatigue = _.get(store, ['state', 'swords', 'serial', v.serial_id, 'vfatigue'])
        let rank = _.get(content, ['result', 'rank'])
        let mvp = _.get(content, ['result', 'mvp'])
        let leader = _.get(content, ['result', 'player', 'party', 'slot', '1', 'serial_id'])
        if(rank < 6){
          console.log("Rank Win")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          if(v.serial_id == mvp) {
            console.log("mvp calculate")
            v.battleFatigue += 10
          }
        }
        if(v.battleFatigue >= 100) {
          console.log(">= 100")
          v.battleFatigue = 100
        }
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

    static ['battle/alloutbattle'](content){
      this['battle/battle'] (content)
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
      store.commit('battle/updateBattleEnemy', {
        updateData: content.enemy
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
        v.battleFatigue = _.get(store, ['state', 'swords', 'serial', v.serial_id, 'battleFatigue'])
        let rank = _.get(content, ['result', 'rank'])
        let mvp = _.get(content, ['result', 'mvp'])
        let leader = _.get(content, ['result', 'player', 'party', 'slot', '1', 'serial_id'])
        if(rank == 1) {
          console.log("Rank ONE_ON_ONE")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          v.battleFatigue += 1
        }
        else if(rank == 2) {
          console.log("Rank S")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          v.battleFatigue += 1
        }
        else if(rank == 3) {
          console.log("Rank A")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          v.battleFatigue += 0
        }
        else if(rank == 4) {
          console.log("Rank B")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          v.battleFatigue -= 1
        }
        else if(rank == 5) {
          console.log("Rank C")
          if(v.serial_id == leader) {
            console.log("leader calculate")
            v.battleFatigue += 3
          }
          v.battleFatigue -= 2
        }
        else if(rank == 6) {
          console.log("Rank D")
          v.battleFatigue -= 3
        }
        if(v.serial_id == mvp) {
          console.log("mvp calculate")
          v.battleFatigue += 10
        }
        if(v.battleFatigue >= 100) {
          console.log(">= 100")
          v.battleFatigue = 100
        }
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
        updateData: content.postData
      })
      //console.log(content.postData)
      store.commit('sally/updateSally', {
        updateData: content
      })
    }
    static ['sally/eventsally'] (content) {
      this['sally/sally'] (content)
    }
    static ['sally/forward'] (content) {
      store.commit('sally/updateSally', {
        updateData: _.pick(content, ['square_id'])
      })
      store.commit('battle/clearBattleScout')
      store.commit('battle/updateBattleScout', {
        updateData: content.scout
      })
      store.commit('battle/clearBattleEnemy')
    }
    static ['sally/eventforward'] (content) {
      this['sally/forward'](content)
    }
    static ['forge/start'] (content) {
      store.commit('forge/updateForge', {
        slotNo: content.slot_no,
        updateData: _.extend(content, content.postData)
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

    static ['equip/removeall'] (content) {
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

    static ['user/profile'] (content) {
      store.commit('player/updatePlayer', {
          updateData: content
        })
    }

    static ['album/list'] (content) {
      _.each(content.sword, (v, k)=>{
        store.commit('album/updateAlbum', {
          swordId: v.sword_id,
          updateData: v
        })
      })
    }
  }
})
