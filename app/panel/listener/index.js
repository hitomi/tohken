define((require, exports, module) => {
  const TRHMasterData = require('app/core/master')
  const TRHRequestRouter = require('./router')
  let recData = []
  let recStatus = false
  return class TRHRequestListener {
    static init (store) {
      // Listen Response
      chrome.devtools.network.onRequestFinished.addListener((request) => {
        let tohken = request.request.url.match(/https?:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/)
        if (tohken != null) {
          let server = tohken[1]
          let path = tohken[2]
          if (server === 'static' && path.indexOf('.bin') > -1) {
            // Load Bin Data
            request.getContent((content, encoding) => {
              TRHMasterData.init(content, store)
            })
          } else if (path.indexOf('31de83dedee2de4024a974e0370676ea') > -1) {
            // swr_crest_s_000003u0xq7npke
            // 31de83dedee2de4024a974e0370676ea
            // data:image/png;base64,content
            request.getContent((content, encoding) => {
              console.log(content)
              console.log(encoding)
            })
          } else if (server !== 'static' && path.indexOf('?uid=') > -1) {
            let action = path.split('?')[0]
            let postData = _.isObject(request['request']['postData'])
              ? _(request['request']['postData']['text'])
                .replace(/%5F/g, '_')
                .split('&')
                .map(o => o.split('='))
              : {}
            request.getContent((content, encoding) => {
              let jsonObj = JSON.parse(content)
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
              if (recStatus) {
                recData.push({
                  url: request.request.url,
                  time: Date.now(),
                  content: _.omit(_.cloneDeep(jsonObj), ['data', 'iv'])
                })
              }
              // Route
              TRHRequestRouter.route(action, jsonObj)
            })
          }
        }
      })
    }
    static startRec () {
      recData = []
      recStatus = true
    }
    static stopRec () {
      recStatus = false
    }
    static exportRec () {
      let blob = new Blob([`define((require, exports, module) => { return ${JSON.stringify(recData)} })`], {
        type: 'text/plain;charset=utf-8'
      })
      saveAs(blob, 'DataRec' + (Date.now()) + '.js')
    }
  }
})
