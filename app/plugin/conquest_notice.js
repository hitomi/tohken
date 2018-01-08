define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'party/updateParty') {
        let party_name = mutation.payload.updateData.party_name
        let status = mutation.payload.updateData.status
        let finished_at = mutation.payload.updateData.finished_at
        let party = _.get(state, ['party', 'parties', mutation.payload.updateData.party_no])
        if(party.isIntervalSet == false || party.isIntervalSet == null) {
          let check = setInterval(function isConquestFinished(){
            party.isIntervalSet = true
            if(status == 2 && moment(finished_at).subtract(1, 'h').isBefore(Date.now())) {
              store.dispatch('notice/addNotice', {
                title: `${party_name}远征结束！`,
                message: `结束时间：${moment(finished_at).subtract(1, 'h').format('hh:mm:ss')}`,
                context: '请尽快收取！',
                renotify: false,
                disableAutoClose: true,
                swordBaseId: 50,
                icon: `static/sword/50.png`
              })
              clearInterval(check)
              party.isIntervalSet = false
            }
            if(status != 2) {
              clearInterval(check)
              party.isIntervalSet = false
            }
          }, 1000)
        }
      }
    })
  }
})
