define((require, exports, module) => {
  const testData = require('data/DataRec1507216474423')
  const TRHRequestRouter = require('./router')
  return class TRHRequestListener {
    static init () {
      this.testDataCount = testData.length
      this.testDataIndex = 0
    }

    static nextData () {
      if (this.testDataIndex < this.testDataCount) {
        let data = testData[this.testDataIndex++]
        let pattern = data.url.match(/http:\/\/(.*?)\.touken-ranbu\.jp\/(.*)(?:\?uid=\d+)/)
        let path = pattern[2]
        console.log(path, data.content)
        TRHRequestRouter.route(path, data.content)
      }
    }

    static autoData () {
      while (this.testDataIndex < this.testDataCount) {
        this.nextData()
      }
    }
  }
})
