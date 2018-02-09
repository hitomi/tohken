define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (state.config.evolution_notice == true) {
        if (mutation.type === 'evolution/updateEvolution') {
          let serial_id = mutation.payload.updateData.back[0] && mutation.payload.updateData.back[0].serial_id
          if (!serial_id) return
          let finished_at = moment(parseValues(mutation.payload.updateData.back[0].finished_at))
          let sword_id = _.get(state, ['swords', 'serial', serial_id, 'sword_id'], 0)
          let sword_name = _.get(state, ['swords', 'serial', serial_id, 'name'], '-')
          if(state.evolution.back[0].isIntervalSet == false || state.evolution.back[0].isIntervalSet == null){
            let check = setInterval(function isEvolutionFinished(){
              state.evolution.back[0].isIntervalSet = true
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
                  state.evolution.back[0].isIntervalSet = false
                } else if (finished_at.add(-1,'days').isBefore(Date.now())) {
                  store.dispatch('notice/addNotice', {
                    title: `${sword_name}的第三封修行书信已经收到！`,
                    message: `收取时间：${finished_at.format('HH:mm:ss')}`,
                    context: '记得及时阅读哦！',
                    renotify: true,
                    disableAutoClose: true,
                    swordBaseId: sword_id,
                    icon: `static/sword/${sword_id}.png`
                  })
                } else if (finished_at.add(-2,'days').isBefore(Date.now())) {
                  store.dispatch('notice/addNotice', {
                    title: `${sword_name}的第二封修行书信已经收到！`,
                    message: `收取时间：${finished_at.format('HH:mm:ss')}`,
                    context: '记得及时阅读哦！',
                    renotify: true,
                    disableAutoClose: true,
                    swordBaseId: sword_id,
                    icon: `static/sword/${sword_id}.png`
                  })
                } else if (finished_at.add(-3,'days').isBefore(Date.now())) {
                  store.dispatch('notice/addNotice', {
                    title: `${sword_name}的第一封修行书信已经收到！`,
                    message: `收取时间：${finished_at.format('HH:mm:ss')}`,
                    context: '记得及时阅读哦！',
                    renotify: true,
                    disableAutoClose: true,
                    swordBaseId: sword_id,
                    icon: `static/sword/${sword_id}.png`
                  })
                }
              } else {
                clearInterval(check)
                state.evolution.back[0].isIntervalSet = false
              }
            }, 1000)
          }
        }
      }
    })
  }
})