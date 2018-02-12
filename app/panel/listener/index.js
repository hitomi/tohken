define((require, exports, module) => {
  const TRHMasterData = require('app/core/master')
  const TRHRequestRouter = require('./router')
  return class TRHRequestListener {
    static init (store) {
      // Listen Response
      chrome.devtools && chrome.devtools.network.onRequestFinished.addListener((request) => {
        if (store.state.debug.config.replayMode) {
          return
        }
        let tohken = request.request.url.match(/https?:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/)
        if (tohken != null) {
          let server = tohken[1]
          let path = tohken[2]
          if (server  !== 'static' && path.indexOf('?uid') > -1) {
            let action = path.split('?')[0]
            let postData = _.isObject(request['request']['postData'])
              ? _(request['request']['postData']['text'])
                .replace(/%5F/g, '_')
                .split('&')
                .map(o => o.split('='))
              : {}
            request.getContent((content, encoding) => {
              let jsonObj = JSON.parse(content) || {}
              jsonObj['postData'] = _.isArray(postData) ? _.fromPairs(postData) : postData
              if (_(jsonObj).pick(['iv', 'data']).keys().value().length === 2) {
                // Need decrypt
                let iv = jsonObj.iv
                let inflatedData = jsonObj.data
                let decryptData = CryptoJS.AES.decrypt(
                  {
                    ciphertext: CryptoJS.enc.Hex.parse(inflatedData)
                  },
                  CryptoJS.enc.Utf8.parse('9ij8pNKv7qVJnpj4'),
                  {
                    iv: CryptoJS.enc.Hex.parse(iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.NoPadding
                  }
                )
                let textData = CryptoJS.enc.Utf8.stringify(decryptData)
                // Magic ?
                let jsonText = textData.substr(0, textData.lastIndexOf('}') + 1)
                // To Object
                let dataObj = JSON.parse(jsonText)
                // Assign
                _.assign(jsonObj, dataObj)
              }
              if (store.state.debug.config.inRecordMode) {
                store.commit('debug/addRecord', {
                  url: request.request.url,
                  time: Date.now(),
                  content: _.omit(_.cloneDeep(jsonObj), ['data', 'iv'])
                })
              }
              // Route
              TRHRequestRouter.route(action, jsonObj)
            })
          }
        } else {
          if(request.request.url.match(/1f1fa3d5e6cdc140f3c493457940e761\.bin/)) {
            request.getContent((content, encoding) => {
              TRHMasterData.init(content, store)
            })
          }
        }
      })
    }
    static runDebugData (data) {
      let tohken = data.url.match(/https?:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/)
      let path = tohken[2]
      if (path.indexOf('?uid') > -1) {
        let action = path.split('?')[0]
        TRHRequestRouter.route(action, data.content)
      }
    }
  }
})
