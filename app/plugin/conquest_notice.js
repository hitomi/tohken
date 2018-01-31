define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.conquest_notice == true) {
        if (mutation.type === 'party/updateParty') {
          let party_name = mutation.payload.updateData.party_name
          let status = mutation.payload.updateData.status
          let finished_at = mutation.payload.updateData.finished_at
          let party = _.get(state, ['party', 'parties', mutation.payload.updateData.party_no])
          if(party.isIntervalSet == false || party.isIntervalSet == null) {
            let check = setInterval(function isConquestFinished(){
              party.isIntervalSet = true
              if(status == 2 && moment(parseValues(finished_at)).isBefore(Date.now())) {
                if(party.isNoticed == false || party.isNoticed == null){
                store.dispatch('notice/addNotice', {
                  title: `${party_name}远征结束！`,
                  message: `结束时间：${moment(parseValues(finished_at)).format('HH:mm:ss')}`,
                  context: '请尽快收取！',
                  renotify: false,
                  disableAutoClose: true,
                  swordBaseId: state.config.secretary,
                  icon: `static/sword/${state.config.secretary}.png`
                })
                party.isNoticed = true
                }
                party.isIntervalSet = false
                clearInterval(check)
              } else if (status == 2) {
                party.isNoticed = false
              }
              if(status != 2){
                party.isNoticed = false
                party.isIntervalSet = false
                clearInterval(check)
              }
            }, 1000)
          }
        }
      }
    })
  }
})
