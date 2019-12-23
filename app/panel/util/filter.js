define((require, exports, module) => {
  const store = require('app/data/index')
  const TRHMasterData = require('app/core/master')

  exports.battleStatusText = Vue.filter('battle-status-text', function (statusId) {
    return ['战斗', '轻伤', '中伤', '重伤', '破坏'][statusId]
  })

  exports.statusText = Vue.filter('status-text', function (statusId) {
    return ['-', '手入', '修行', '远征'][statusId]
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
    return name.replace('兵', '').split('･')[0]
  })

  exports.fatigueBuff = Vue.filter('fatigue-buff', function (fatigueFlag) {
    return ['-40%', '-20%', '+0%', '+20%'][fatigueFlag]
  })

  exports.fatigueBuffNum = Vue.filter('fatigue-buff-num', function (fatigueFlag) {
    return [0.6, 0.8, 1, 1.2][fatigueFlag]
  })

  exports.swordPattern = Vue.filter('sword-pattern', function (swordId) {
    return swordId ? '../../static/sword/' + swordId + '.png' : '../../static/sword/0.png'
  })

  exports.EnemySwordPattern = Vue.filter('enemy-sword-pattern', function (swordId) {
    let imageId = _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'imageId'], 0)
    let rarity = _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'rarity'], 0)
    return swordId ? '../../static/enemy/' + imageId + '_' + rarity + '.png' : '../../static/sword/0.png'
  })

  exports.MapPattern = Vue.filter('map-pattern', function (mapId) {
    let [episodeId , fieldId , layerNum] = mapId.split('_')
    if(episodeId > 0)
      return '../../static/map/' + episodeId + '_' + fieldId + '_' + layerNum + '.jpg'
    else if (episodeId < 0){
      let type = _.get(TRHMasterData.getMasterData('Event'), [episodeId, 'type'], 0)
      let map = _.get(TRHMasterData.getMasterData('EventLayer'), [episodeId, fieldId, layerNum, 'map'], 0)
      if(type == 4){
        map = fieldId
      }
      return '../../static/map/event' +  '_' + type + '_' + map + '.jpg'
    }
  })

  exports.swordObject = Vue.filter('sword-object', function (serialId) {
    return serialId
  })

  exports.partyStatus = Vue.filter('party-status', (status) => {
    return [
      'locked',
      'normal',
      'conquest',
      'sally'
    ][status] || ''
  })

  exports.amuletName = Vue.filter('amulet-name', (itemId) => {
    return [
    '-',
    '有',
    '極'
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

  exports.YYYYMMDDhhmmss = Vue.filter('YYYYMMDDhhmmss', (time) => {
    return moment(time).format('YYYY/MM/DD HH:mm:ss')
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
      '一骑S',
      'S',
      'A',
      'B',
      'C',
      '败北'
    ][rank] || '0'
  })

  exports.formationName = Vue.filter('formation-name', (formationId) => {
    return {
      0: '不明',
      1: '鱼鳞',
      2: '鹤翼',
      3: '方阵',
      4: '横队',
      5: '雁行',
      6: '逆行'
    }[formationId] || '未知'
  })

  exports.swordName = Vue.filter('sword-name', (swordId) => {
    return swordId ? _.get(TRHMasterData.getMasterData('Sword'), [swordId, 'name'], '未知') : '空'
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

  exports.swordSerialId = Vue.filter('sword-serial-swordid', (serialId) => {
    return _.get(store.state, ['swords', 'serial', serialId, 'sword_id'], 0)
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

  exports.itemNameFormat = Vue.filter('item-name-format', (ConsumableId) => {
    let name = _.get(TRHMasterData.getMasterData('Consumable'), [ConsumableId, 'name'], '-')
    return name.replace('御札・', '')
  })

  exports.realMobile = Vue.filter('real-mobile', (serialId) => {
    let mobile = 0
    let sword_mobile = _.get(store.state, ['swords', 'serial', serialId, 'mobile'], 0)
    mobile+=sword_mobile
    let equips = _.get(store.state, ['swords', 'serial', serialId, 'equips'], [])
    _.each(equips, equipSerialId=>{
      let equip_mobile = 0
      equip_mobile = _.get(store.state, ['equip', 'serial', equipSerialId, 'mobile'], 0)
      mobile+=equip_mobile
    })
    let level = _.get(store.state, ['swords', 'serial', serialId, 'level'], 0)
    let fatigue_flag = _.get(store.state, ['swords', 'serial', serialId, 'fatigueFlag'], 0)
    let fatigue_buff = [0.6, 0.8, 1, 1.2][fatigue_flag]
    return Math.floor(mobile*(level*0.039+1.03)*fatigue_buff)
  })

  exports.realMobileHorse = Vue.filter('real-mobile-horse', (serialId) => {
    let mobile = 0
    let sword_mobile = _.get(store.state, ['swords', 'serial', serialId, 'mobile'], 0)
    mobile+=sword_mobile
    let equips = _.get(store.state, ['swords', 'serial', serialId, 'equips'], [])
    _.each(equips, equipSerialId=>{
      let equip_mobile = _.get(store.state, ['equip', 'serial', equipSerialId, 'mobile'], 0)
      mobile+=equip_mobile
    })
    let horse_mobile = 0
    let horse_serial_id = _.get(store.state, ['swords', 'serial', serialId, 'horse_serial_id'], 0)
    horse_mobile = _.get(store.state, ['equip', 'serial', horse_serial_id, 'mobile'], 0)
    mobile+=horse_mobile
    let level = _.get(store.state, ['swords', 'serial', serialId, 'level'], 0)
    let fatigue_flag = _.get(store.state, ['swords', 'serial', serialId, 'fatigueFlag'], 0)
    let fatigue_buff = [0.6, 0.8, 1, 1.2][fatigue_flag]
    return Math.floor(mobile*(level*0.039+1.03)*fatigue_buff)
  })

  
})