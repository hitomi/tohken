define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'party/updateParty') {
        let party_name = mutation.payload.updateData.party_name
        let status = mutation.payload.updateData.status
        let finished_at = mutation.payload.updateData.finished_at
        let party = _.get(state, ['party', 'parties', mutation.payload.updateData.party_no])

        //party.isIntervalSet = false
        if(party.isIntervalSet == false || party.isIntervalSet == null) {
          let check = setInterval(function isConquestFinished(){
            party.isIntervalSet = true
            if(status == 2 && moment(finished_at).subtract(1, 'h').isBefore(Date.now())) {
              if(party.isNoticed == false || party.isNoticed == null){
              store.dispatch('notice/addNotice', {
                title: `${party_name}远征结束！`,
                message: `结束时间：${moment(finished_at).subtract(1, 'h').format('hh:mm:ss')}`,
                context: '请尽快收取！',
                renotify: false,
                disableAutoClose: true,
                swordBaseId: state.config.secretary,
                icon: `static/sword/${state.config.secretary}.png`
              })
              party.isNoticed = true
              //console.log(party)
              }
              clearInterval(check)
              party.isIntervalSet = false
            } else {
              clearInterval(check)
              party.isIntervalSet = false
              party.isNoticed = false
              //console.log(party)
            }
          }, 1000)
        }
      }
    })
  }
})
