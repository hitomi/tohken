define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')

  exports.battleStatusText = Vue.filter('battle-status-text', function (statusId) {
    return ['战斗', '軽傷', '中傷', '重傷', '破壞'][statusId]
  })

  exports.statusText = Vue.filter('status-text', function (statusId) {
    return ['通常', '手入', 'ADSENCE', '远征'][statusId]
  })

  exports.statusCname = Vue.filter('status-cname', function (statusId) {
    return ['normal', 'recovery', 'damaged', 'warning', 'danger'][statusId]
  })

  exports.fatigueCname =  Vue.filter('fatigue-cname', function (fatigueFlag) {
    return ['very-tired', 'tired', 'normal', 'perfect'][fatigueFlag]
  })

  exports.fatigueText = Vue.filter('fatigue-text', function (fatigueFlag) {
    return ['过労', '疲労', '通常', '桜吹雪'][fatigueFlag]
  })

  exports.equipNameFormat = Vue.filter('equip-name-format', (name) => {
    return name.replace('兵', '').replace('特上', '特')
  })

  exports.fatigueBuff = Vue.filter('fatigue-buff', function (fatigueFlag) {
    return '(' + ['-40%', '-20%', '+0%', '+20%'][fatigueFlag] + ')'
  })

  exports.swordPattern = Vue.filter('sword-pattern', function (swordId) {
    return swordId ? '../../static/sword/' + swordId + '.png' : '../../static/sword/0.png'
  })

  exports.EnemySwordPattern = Vue.filter('enemy-sword-pattern', function (swordId) {
    let imageId = _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'imageId'], 0)
    let rarity = _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'rarity'], 0)
    return swordId ? '../../static/enemy/' + imageId + '_' + rarity + '.png' : '../../static/sword/0.png'
  })

  exports.swordObject = Vue.filter('sword-object', function (serialId) {
    return serialId
  })

  exports.partyStatus = Vue.filter('party-status', (status) => {
    return [
      '未开放',
      '正常',
      '远征'
    ][status] || ''
  })

  exports.amuletName = Vue.filter('amulet-name', (itemId) => {
    return [
    '-',
    '守',
    '极守'
    ][itemId] || ''
  })

  exports.getNotFlg = Vue.filter('not-flg', (flg) =>{
    return ['○', ''][flg]
  })

  exports.hhmmss = Vue.filter('hhmmss', (time) => {
    return moment(time).format('HH:mm:ss')
  })

  exports.MMDDhhmmss = Vue.filter('MMDDhhmmss', (time) => {
    return moment(time).format('MM/DD HH:mm:ss')
  })

  exports.equipLevelName = Vue.filter('equip-level-name', function (equip_id) {
    let level = _.get(TRHMasterData.getMasterData('Equip'), [equip_id, 'rarity'], 0)
    return {
      0: 'destroyed',
      1: 'n',
      3: 'r',
      5: 'sr'
    }[level]
  })

  exports.equipLevelCname = Vue.filter('equip-level-cname', function (level) {
    return {
      0: 'destroyed',
      1: 'n',
      3: 'r',
      5: 'sr'
    }[level]
  })

  exports.rankName = Vue.filter('rank-name', (rank) => {
    return [
      '0',
      '一騎',
      'S',
      'A',
      'B',
      'C',
      '敗北'
    ][rank] || ''
  })

  exports.swordName = Vue.filter('sword-name', (swordId) => {
    return swordId ? _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'name'], '-') : '空'
  })

  exports.swordHp = Vue.filter('sword-hp', (swordId) => {
    return swordId ? _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'hp'], '-') : '0'
  })

  exports.equipName = Vue.filter('equip-name', (equipId) => {
    return equipId ? _.get(TRHMasterData.getMasterData('Equip'), [equipId, 'name'], '-').replace(/\d+/, '') : '空'
  })

  exports.swordSerialName = Vue.filter('sword-serial-name', (serialId) => {
    return _.get(store.state, ['swords', 'serial', serialId, 'name'], '-')
  })

  exports.equipSerialName = Vue.filter('equip-serial-name', (serialId) => {
    return _.get(store.state, ['equip', 'serial', serialId, 'name'], '-').replace(/\d+/, '')
  })

  exports.PracticeEnemyEquipName = Vue.filter('practice-enemy-equip-serial-name', (serialId) => {
    return _.get(store.state, ['practice_enemy', 'enemy_equip', serialId, 'name'], '-').replace(/\d+/, '')
  })

  exports.allEquipSerialName = Vue.filter('all-equip-serial-name', (serialIds) => {
    return _.map(serialIds, (serialId) => _.get(store.state, ['equip', 'serial', serialId, 'name'], '-').replace(/\d+/, '')).join(' / ')
  })
})