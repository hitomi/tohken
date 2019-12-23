define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
       //{
        if (mutation.type === 'party/updateParty') {
          let party_name = mutation.payload.updateData.party_name
          let status = mutation.payload.updateData.status
          
          let party = _.get(state, ['party', 'parties', mutation.payload.updateData.party_no])
          let finished_at = party.finished_at
          if (!party) return
          if(party.isIntervalSet == false || party.isIntervalSet == null) {
            let check = setInterval(function isConquestFinished(){
              //store.commit('')
              party.isIntervalSet = true
              party.left_time = moment.utc(finished_at-Date.now()).format('HH:mm:ss')
              if(status == 2 && moment(parseValues(finished_at)).isBefore(Date.now())) {
                party.left_time = '00:00:00'
                if(party.isNoticed == false || party.isNoticed == null){
                  if (state.config.conquest_notice == true){
                store.dispatch('notice/addNotice', {
                  title: `${party_name}遠征完成！`,
                  message: `结束时间：${moment(parseValues(finished_at)).format('HH:mm:ss')}`,
                  context: '请尽快收取！',
                  renotify: false,
                  disableAutoClose: true,
                  swordBaseId: state.swords.serial[state.party.parties[party.party_no].slot[1].serial_id].sword_id,
                  icon: `static/sword/${state.swords.serial[state.party.parties[party.party_no].slot[1].serial_id].sword_id}.png`
                })}
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
      //}
    })
  }
})
