define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.evolution_notice == true) {
        if (mutation.type === 'evolution/updateEvolution') {
          let serial_id = mutation.payload.updateData.back && mutation.payload.updateData.back.serial_id
          if (!serial_id) return
          let finished_at = moment(parseValues(mutation.payload.updateData.back.finished_at))
          let sword_id = _.get(state, ['swords', 'serial', serial_id, 'sword_id'], 0)
          let sword_name = _.get(state, ['swords', 'serial', serial_id, 'name'], '-')
          if(state.evolution.back.isIntervalSet == false || state.evolution.back.isIntervalSet == null){
            let check = setInterval(function isEvolutionFinished(){
              state.evolution.back.isIntervalSet = true
              if(finished_at != null) {
                if(finished_at.isBefore(Date.now())){
                  store.dispatch('notice/addNotice', {
                    title: `${sword_name}修行结束！`,
                    message: `结束时间：${finished_at.format('HH:mm:ss')}`,
                    context: '记得及时刷新游戏接他回本丸哦！',
                    renotify: true,
                    disableAutoClose: true,
                    swordBaseId: sword_id,
                    icon: `static/sword/${sword_id}.png`
                  })
                  clearInterval(check)
                  state.evolution.back.isIntervalSet = false
                  console.log(finished_at.format())
                }
              } else {
                clearInterval(check)
                state.evolution.back.isIntervalSet = false
              }
            }, 1000)
          }
        }
      }
    })
  }
})