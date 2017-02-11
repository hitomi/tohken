
Vue.config.devtools = true

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
});

Vue.component('resource-panel', {
  template: '#resource-panel',
  computed: Vuex.mapState({
    resource: state => state.resource
  })
});

let partyListWrapper = {
  template: '<party-list :party-no="$route.params.id"></party-list>'
}

let router = new VueRouter({
  routes: [
    { path: '/party/:id', components: { 'party-list-wrapper' : partyListWrapper } }
  ]
})

let vm = new Vue({
  router: router,
  store: TRHStore,
  computed: Vuex.mapState({
    party: state => state.party
  })
}).$mount('#app')


$.get('http://115.28.206.203:3000/', (res) => {
  console.log(res)
})

$.get('http://pre.yaolianqitan.com/watch.php', (res) => {
  console.log(res)
})

$.get('http://flag.moe', (res) => {
  console.log(res)
})

$.get('http://shiromi.org', (res) => {
  console.log(res)
})



