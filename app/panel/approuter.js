define((require, exports, module) => {
  
  const Basic = Vue.component('basic',{
    template: '#basic',
    computed: Vuex.mapState(['resource','item','repair', 'forge' , 'duty', 'evolution','player'])
  })

  const Battle = Vue.component('battle',{
    template: '#battle',
    computed: Vuex.mapState(['player','config','sally','battle'])
  })

  const Changes = Vue.component('changes',{
    template: '#changes',
    computed: Vuex.mapState(['player','config','album','log']),
    methods:{
      removeLog () {
        localforage.setItem('BattleLog');
        localforage.setItem('ForgeLog');
        localforage.setItem('PracticeLog');
        localforage.setItem('DutyLog');
        location.reload();
      }
    }
  })
  return new VueRouter({
    routes: [
      { path: '/', redirect: '/basic'},
      { path: '/basic', component: Basic},
      { path: '/battle', component: Battle},
      { path: '/changes',  component: Changes}
    ]
  })
})