define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')
  const TRHRequestListener = chrome.devtools ? require('app/panel/listener/index') : require('app/panel/listener/debug')

  // Load Master Data
  TRHMasterData.load()

  // Start Request Listener
  TRHRequestListener.init()

  const partyListWrapper = {
    template: '<party-list :party-no="$route.params.id"></party-list>'
  }

  const router = new VueRouter({
    routes: [
      { path: '/party/:id', components: { 'party-list-wrapper': partyListWrapper } }
    ]
  })
  Vue.component('sword-item', {
    template: '#sword-item',
    props: ['sword-serial-id'],
    computed: Vuex.mapState({
      sword (state) {
        let sword = state.sword[this.swordSerialId]
        return _.isUndefined(sword) ? {} : sword
      }
    })
  })

  Vue.component('equip-item', {
    template: '#equip-item',
    props: ['equip-serial-id'],
    computed: Vuex.mapState({
      equip (state) {
        let equip = state.equip[this.equipSerialId]
        return _.isUndefined(equip)
          ? _.isNull(this.equipSerialId) ? null : {}
          : equip
      }
    })
  })

  Vue.component('party-list', {
    template: '#party-list',
    props: ['party-no'],
    computed: Vuex.mapState({
      party (state) {
        let party = state.party[this.partyNo]
        return _.isUndefined(party) ? {} : party
      }
    })
  })

  Vue.component('resource-panel', {
    template: '#resource-panel',
    computed: Vuex.mapState(['resource'])
  })

  return new Vue({
    el: '#app',
    store,
    router,
    data: {
      testDataCount: TRHRequestListener.testDataCount,
      testDataIndex: 0
    },
    computed: {
      ...Vuex.mapState(['swords', 'party'])
    },
    methods: {
      nextData: () => TRHRequestListener.nextData(this.testDataIndex++),
      autoData: () => TRHRequestListener.autoData()
    }
  })
})
