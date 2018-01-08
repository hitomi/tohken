define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')
  const TRHRequestListener = chrome.devtools
    ? require('app/panel/listener/index')
    : {} // require('app/panel/listener/debug')

  // Load Master Data
  TRHMasterData.load(store)

  // Start Request Listener
  TRHRequestListener.init(store)

  const partyListWrapper = {
    template: `
      <div class="party-list-wrapper">
      <party-list v-for="i in 4" :key="i" :party-no="i"></party-list>
      </div>
    `
  }

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
    }),
    methods: {
      swordSerialName (serialId) {
        return serialId ? _.get(store.state, ['swords', 'serial', serialId, 'name'], '未获取').replace(/\d+/, '') : '无'
      }
    }
  })

  Vue.filter('sword-name', (status) => {
    return _.get(TRHMasterData.getMasterData('Sword'), [status, 'name'], '空')
  })

  Vue.filter('equip-name', (status) => {
    return _.get(TRHMasterData.getMasterData('Equip'), [status, 'name'], '空')
  })

  const Other = Vue.component('other', {
    template: '#other',
    computed: {
      ...Vuex.mapState(['swords', 'party', 'equip', 'forge', 'repair']),
      equipList () {
        return _(this.equip.serial)
          .groupBy(o => o.equip_id)
          .mapValues((v, k) => {
            return {
              equipId: k,
              count: v.length
            }
          })
          .values()
          .value()
      }
    }
  })

  const Extra = Vue.component('extra', {
    template: '#extra'
  })

  const Setting = Vue.component('setting', {
    template: '#setting'
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
      },
      partyScroll (i) {
        if (!$(`#party-${i}`).offset()) return
        window.scrollTo(0, $(`#party-${i}`).offset().top - 80)
      },
      otherScroll (name) {
        if (!$(`#${name}`).offset()) return
        window.scrollTo(0, $(`#${name}`).offset().top - 80)
      }
    }
  })
})
