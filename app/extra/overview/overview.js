
let vm = null

// Load Master Data
TRHMasterData
  .load()
  .then(() => {
    return TRHSwordManager.load()
  })
  .then(() => {
    vm = new Vue({
      el: '#swords',
      data: {
        swords: _.values(TRHSwordManager._sword),
        option: {
          info: true,
          value: true,
          equip: true
        }
      },
      mounted () {
        console.log(chrome)
        chrome.runtime.onMessage.addListener((msg) => {
          console.log(msg)
          switch (msg.updated) {
            case 'sword':
              TRHSwordManager.load().then(() => { this.swords = _.values(TRHSwordManager._sword) })
              break;
          }
        })
      }
    })
  })


  
