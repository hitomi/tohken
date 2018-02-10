define((require, exports, module) => {
  return {
    namespaced: true,
    state () {
      return {
        records: [],
        config: {
          localMode: !chrome.devtools,
          inRecordMode: false,
          replayMode: !chrome.devtools
        },
        control: {
          playIndex: 0,
          playing: false,
        }
      }
    },
    mutations: {
      startRecord (state, payload) {
        state.config.inRecordMode = true
        state.records = []
      },
      stopRecord (state, payload) {
        state.config.inRecordMode = false
        let blob = new Blob([JSON.stringify(state.records)], {
          type: 'text/plain;charset=utf-8'
        })
        saveAs(blob, 'DataRec' + (Date.now()) + '.json')
        state.records = []
      },
      replayMode (state, payload) {
        state.config.replayMode = true
      },
      addRecord (state, payload) {
        state.records.push(payload)
      },
      loadRecord (state, payload) {
        state.records = payload
      },
      nextRecord (state, listener) {
        if (state.records.length) {
          listener.runDebugData(state.records.shift())
        }
      },
      autoRecord (state, listener) {
        while (state.records.length) {
          listener.runDebugData(state.records.shift())
        }
      }
    }
  }
})
