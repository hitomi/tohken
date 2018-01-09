define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')
  const TRHRequestListener = require('app/panel/listener/index')
  const defaultConfig = require('app/data/model/config')
  const filters = require('app/panel/util/filter')

  // Load Master Data
  TRHMasterData.load(store)

  // Start Request Listener
  TRHRequestListener.init(store)

  Vue.component('notice-content', {
    template: '#notice-template',
    computed: Vuex.mapState(['notice']),
    methods: {
      close (n) {
        n.hidden = true
      }
    }
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

  const partyListWrapper = {
    template: `
      <div class="party-list-wrapper">
      <party-list v-for="i in 4" :key="i" :party-no="i"></party-list>
      </div>
    `
  }

  const Other = Vue.component('other', {
    template: '#other',
    data () {
      return {
        option: {
          info: false,
          value: false,
          equip: false
        }
      }
    },
    computed: {
      ...Vuex.mapState(['swords', 'party', 'equip', 'forge', 'repair']),
      equipList () {
        let allEquips = _(this.equip.serial)
          .mapValues((v, k) => {
            let sword = _.find(store.state.swords.serial, o => o.horse_serial_id == k)
            return _.extend(v, {
              owner: sword ? sword.name : '-'
            })
          })
          .groupBy(o => o.equip_id)
          .mapValues((v, k) => {
            let owners = _(v).map(o => o.owner).filter(o => o != '-').value().join(',')
            return _.extend({
              count: v.length,
              owner: owners
            }, _.get(TRHMasterData.getMasterData('Equip'), [k], {}))
          })
          .values()
          .value()
        let equip = _.filter(allEquips, o => o.equipId < 10000)
        let horse = _.filter(allEquips, o => o.equipId >= 10000)
        return { equip , horse }
      }
    }
  })

  const Extra = Vue.component('extra', {
    template: '#extra'
  })

  const Setting = Vue.component('setting', {
    template: '#setting',
    computed: {
      ..._.mapValues(store.state.config, (v, k) => {
          console.log(v, k)
          return {
            get () {
              return store.state.config[k]
            },
            set (value) {
              store.commit('config/updateConfig', { [k]: value })
            }
          }
        })
    }
  })

  const router = new VueRouter({
    routes: [
      { path: '/', redirect: '/party' },
      { path: '/party', components: { 'party-list-wrapper': partyListWrapper } },
      { path: '/other', component: Other },
      { path: '/extra', component: Extra },
      { path: '/setting', component: Setting }
    ]
  })

  Vue.filter('averageLevel', (party) => {
    return 0
  })

  Vue.filter('totalLevel', (party) => {
    return 0
  })

  Vue.component('resource-panel', {
    template: '#resource-panel',
    computed: Vuex.mapState(['resource', 'player'])
  })

  return new Vue({
    el: '#app',
    store,
    router,
    data: {
      devtools: !!chrome.devtools
    },
    computed: {
      ...Vuex.mapState(['inBattle', 'dataLoaded', 'swords', 'party'])
    },
    mounted () {
      localforage.getItem('Config').then((data) => {
        store.commit('config/updateConfig', data || {})
      })

      localforage.getItem('BattleLog').then((data) => {
        if (!data) _.each(v => store.commit('log/addBattleLog', v))
      })

      localforage.getItem('SallyLog').then((data) => {
        if (!data) _.each(v => store.commit('log/addSallyLog', v))
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
