define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')
  const TRHRequestListener = require('app/panel/listener/index')
  const defaultConfig = require('app/data/model/config')
  const filters = require('app/panel/util/filter')
  const router = require('app/panel/approuter')
  
  // Load Master Data
  TRHMasterData.load(store)

  // Start Request Listener
  TRHRequestListener.init(store)

  Vue.component('debug-tools', {
    template: '#debug-tools-template',
    computed: Vuex.mapState(['debug']),
    methods: {
      startRecord () {
        store.commit(this.debug.config.inRecordMode ? 'debug/stopRecord' : 'debug/startRecord')
      },
      loadMasterData (ev) {
        const file = ev.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = function(e) {
          let contents = e.target.result.replace('data:application/octet-stream;base64,', '')
          TRHMasterData.init(contents, store)
        }
        reader.readAsDataURL(file)
      },
      loadRecord (ev) {
        const file = ev.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = function(e) {
          let contents = e.target.result
          store.commit('debug/loadRecord', JSON.parse(contents))
        }
        reader.readAsText(file)
      },
      replayMode () {
        store.commit('debug/replayMode')
      },
      playNext () {
        store.commit('debug/nextRecord', TRHRequestListener)
      },
      autoPlay () {
        store.commit('debug/autoRecord', TRHRequestListener)
      }
    }
  })

  const Player = Vue.component('player',{
    template: '#player',
    computed: Vuex.mapState(['player','config'])
  })

  const Activity = Vue.component('activity',{
    template: '#activity',
    computed: Vuex.mapState(['player','config'])
  })

  Vue.component('conquest-item', {
    template: '#conquest-item',
    props: ['party-no'],
    computed: Vuex.mapState({
      party (state) {
        return _.get(state, ['party', 'parties', this.partyNo], {})
      }
    })
  })
  
  Vue.component('party-list', {
    template: '#party-list',
    props: ['party-no'],
    computed: Vuex.mapState({
      party (state) {
        return _.get(state, ['party', 'parties', this.partyNo], {})
      }
    })
  })

  Vue.component('sword-item', {
    template: '#sword-item',
    props: ['sword-serial-id'],
    computed: Vuex.mapState({
      sword (state) {
        return _.get(state, ['swords', 'serial', this.swordSerialId], {})
      }
    })
  })

  Vue.component('equip-item', {
    template: '#equip-item',
    props: ['equip-serial-id', 'in-battle'],
    computed: Vuex.mapState({
      equip (state) {
        return _.get(state, ['equip', 'serial', this.equipSerialId], {})
      }
    })
  })

  Vue.component('forge-item', {
    template: '#forge-item',
    props: ['slot-no'],
    computed: Vuex.mapState({
      forge (state) {
        return _.get(state, ['forge', 'slot', this.slotNo], {})
      }
    })
  })

  Vue.component('repair-item', {
    template: '#repair-item',
    props: ['slot-no'],
    computed: Vuex.mapState({
      repair (state) {
        return _.get(state, ['repair', 'slot', this.slotNo], {})
      }
    })
  })

  Vue.component('config-switch', {
    template: '#config-switch-template',
    props: ['attr'],
    computed: {
      attrValue () {
        return store.state.config[this.attr]
      }
    },
    methods: {
      on () {
        store.commit('config/updateConfig', { [this.attr]: true })
      },
      off () {
        store.commit('config/updateConfig', { [this.attr]: false })
      }
    }
  })

  return new Vue({
    el: '#app',
    store,
    router,
    data: {
      devtools: !!chrome.devtools
    },
    computed: {
      ...Vuex.mapState(['inBattle', 'dataLoaded', 'swords', 'party', 'config', 'debug'])
    },
    mounted () {
      localforage.getItem('Config').then((data) => {
        store.commit('config/updateConfig', data || {})
      })

      localforage.getItem('BattleLog').then((data) => {
        //console.log(data)
        if (data) _.each(data, (v,k) => store.commit('log/addBattleLog', v))
      })

      localforage.getItem('ForgeLog').then((data) => {
        //console.log(data)
        if (data) _.each(data, v => store.commit('log/addForgeLog', v))
      })

      localforage.getItem('PracticeLog').then((data) => {
        //console.log(data)
        if (data) _.each(data, v => store.commit('log/addPracticeLog', v))
      })

      localforage.getItem('DutyLog').then((data) => {
        //console.log(data)
        if (data) _.each(data, v => store.commit('log/addDutyLog', v))
      })

      localforage.getItem('Resource').then((data) => {
        if (data) store.commit('resource/updateResource', {
          updateData: data
        })
      })

      localforage.getItem('Equip').then((data) => {
        if (data && data.serial) _.each(data.serial, v => store.commit('equip/updateEquip', {
          serialId: v.serial_id,
          updateData: v
        }))
      })

      localforage.getItem('Swords').then((data) => {
        if (data && data.serial) _.each(data.serial, v => store.commit('swords/updateSword', {
          serialId: v.serial_id,
          updateData: v
        }))
      })

      localforage.getItem('Party').then((data) => {
        if (data && data.parties) _.each(data.parties, v => {
          v.isIntervalSet = false
          v.isNoticed = false
          store.commit('party/updateParty', {
            partyNo: v.party_no,
            updateData: v
          })
        })
      })

      localforage.getItem('Item').then((data) => {
        if(data && data.consumable) _.each(data.consumable, (v, k) => store.commit('item/updateItem', {
          consumableId: k,
          updateData: v
        }))
      })

      localforage.getItem('Player').then((data) => {
        if(data) store.commit('player/updatePlayer', {
          updateData: data
        })
      })

      localforage.getItem('Duty').then((data) => {
        if(data) {
          data.isIntervalSet = false
          store.commit('duty/updateDuty', {
            updateData: data
          })
        }
      })

      localforage.getItem('Evolution').then((data) => {
        if(data) {
          data.back.isIntervalSet = false
          store.commit('evolution/updateEvolution', {
            updateData: data
          })
        }
      })
    },
    methods: {
      scroll (name) {
        if (!$(`#${name}`).offset()) return
        window.scrollTo(0, $(`#${name}`).offset().top - 80)
      }
    }
  })
})
