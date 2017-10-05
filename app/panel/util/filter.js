
Vue.filter('status-text', function (statusId) {
  return ['通常', '手入', '軽傷', '中傷', '重傷'][statusId]
})

Vue.filter('status-cname', function (statusId) {
  return ['normal', 'recovery', 'damaged', 'warning', 'danger'][statusId]
})

Vue.filter('fatigue-cname', function (fatigueFlag) {
  return ['very-tired', 'tired', 'normal', 'perfect'][fatigueFlag]
})

Vue.filter('fatigue-text', function (fatigueFlag) {
  return ['过労', '疲労', '通常', '桜吹雪'][fatigueFlag]
})

Vue.filter('equipName', (name) => {
  return name.replace('兵', '').replace('特上', '特')
})

Vue.filter('fatigue-buff', function (fatigueFlag) {
  return '(' + ['-40%', '-20%', '+0%', '+20%'][fatigueFlag] + ')'
})

Vue.filter('sword-pattern', function (swordId) {
  return swordId ? '../../static/sword/' + swordId + '.png' : '../../static/sword/0.png'
})

Vue.filter('sword-object', function (serialId) {
  return serialId
})

Vue.filter('equip-level-cname', function (level) {
  return {
    0: 'destroyed',
    1: 'n',
    3: 'r',
    5: 'sr'
  }[level]
})