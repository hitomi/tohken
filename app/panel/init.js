define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')
  const TRHRequestListener = chrome.devtools
    ? require('app/panel/listener/index')
    : require('app/panel/listener/debug')

  // Load Master Data
  TRHMasterData.load(store)

  // Start Request Listener
  TRHRequestListener.init(store)

  const partyListWrapper = {
    template: '<party-list :party-no="$route.params.id"></party-list>'
  }

  const router = new VueRouter({
    routes: [
      { path: '/party/:id', components: { 'party-list-wrapper': partyListWrapper } }
    ]
  })

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
    }),
    methods: {
      equipSerialName (serialId) {
        return serialId ? _.get(store.state, ['equip', 'serial', serialId, 'name'], '未获取').replace(/\d+/, '') : '无'
      }
    }
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
      testDataCount: TRHRequestListener.testDataCount,
      testDataIndex: 0,
      devtools: !!chrome.devtools,
      rec: false
    },
    computed: {
      ...Vuex.mapState(['inBattle', 'dataLoaded', 'swords', 'party'])
    },
    methods: {
      nextData () {
        TRHRequestListener.nextData(this.testDataIndex++)
      },
      autoData: () => TRHRequestListener.autoData(),
      dataRec () {
        this.rec ? TRHRequestListener.stopRec() : TRHRequestListener.startRec()
        this.rec = !this.rec
      },
      dataExport () {
        this.rec = !this.rec
        TRHRequestListener.stopRec()
        TRHRequestListener.exportRec()
      }
    }
  })
})
