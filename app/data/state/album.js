define((require, exports, module) => {
  const defaultAlbumModel = require('../model/album')
  return {
    namespaced: true,
    state () {
      return {
        serial: {}
      }
    },
    mutations: {
      updateAlbum (state, payload) {
        let {swordId, updateData} = payload
        if (!state.serial[swordId]) {
          Vue.set(state.serial, swordId, defaultAlbumModel())
        }
        mergeModel(state.serial[swordId], updateData)
      }
    }
  }
})
