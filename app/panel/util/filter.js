
Vue.filter('status-text', function (status_id) {
  return ['通常', '手入', '軽傷', '中傷', '重傷'][status_id]
})

Vue.filter('status-class', function (status_id) {
  return ['normal', 'recovery', 'damaged', 'warning', 'danger'][status_id]
})

Vue.filter('figure-class', function (figure_flag) {
  return ['very-tired', 'tired', 'normal', 'perfect'][figure_flag]
})

Vue.filter('figure-text', function (figure_flag) {
  return ['过労', '疲労', '通常', '桜吹雪'][figure_flag]
})

Vue.filter('figure-buff', function (figure_flag) {
  return '(' + ['-40%', '-20%', '+0%', '+20%'][figure_flag] + ')'
})

Vue.filter('sword-pattern', function (sword_id) {
  return '../../static/sword/' + sword_id + '.png'
})

Vue.filter('sword-object', function (serial_id) {
  console.log(serial_id)
  return serial_id
})

Vue.filter('equip-level-class', function (level) {
  return ['destroyed', 'n', 'r', 'sr'][level]
})
