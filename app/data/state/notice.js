define((require, exports, module) => {
  return {
    namespaced: true,
    state () {
      return {
        timeout: 3000,
        count: 0,
        history: {}
      }
    },
    mutations: {
      updateNotice (state, payload) {
        if (!payload._id) return
        Vue.set(state.history, payload._id, payload)
      }
    },
    actions: {
      addNotice (context, payload) {
        if (!payload._id) {
          payload._id = ++context.state.count
        }
        context.commit('updateNotice', _.extend({ hidden: false }, payload))
        /*if (!payload.disableAutoClose) {
          setTimeout(() => {
            context.commit('updateNotice', _.extend(payload, { hidden: true }))
          }, payload.timeout || context.state.timeout)
        }*/
      }
    }
  }
})
