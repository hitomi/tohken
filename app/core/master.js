define((require, exports, module) => {
  return class TRHMasterData {
    static getMasterData (k) {
      return TRHMasterData[k]
    }
    // Load data from local cache
    static load (store) {
      if (!chrome.devtools) {
        // TRHMasterData.UserLevel = require('data/UserLevelMaster1507123959917')
        // TRHMasterData.SwordLevel = require('data/SwordLevelMaster1507123959924')
        // TRHMasterData.Sword = require('data/SwordMaster1507123959937')
        // TRHMasterData.Equip = require('data/EquipMaster1507123959946')
        _.each(['UserLevel', 'SwordLevel', 'Sword', 'Equip', 'Consumable', 'FieldSquare', "EventSquare"], k => {
          store.commit('loadData', {
            key: k,
            loaded: true
          })
        })
      }
      return Promise.props({
        UserLevel: localforage.getItem('UserLevelMaster'),
        SwordLevel: localforage.getItem('SwordLevelMaster'),
        Sword: localforage.getItem('SwordMaster'),
        Equip: localforage.getItem('EquipMaster'),
        Consumable: localforage.getItem('ConsumableMaster'),
        FieldSquare: localforage.getItem('FieldSquareMaster'),
        EventSquare: localforage.getItem('EventSquareMaster')
      }).then((saved) => {
        console.log('loadLocal')
        _.each(saved, (v, k) => {
          TRHMasterData[k] = v
          console.log(TRHMasterData[k])
          store.commit('loadData', {
            key: k,
            loaded: !_.isNull(v)
          })
        })
      })
    }
    // Init data from Game Resource
    static init (content, store) {
      TRHMasterData.masterData = null
      // Convert data type
      let encodeData = atob(content)
      let convertTemp = encodeData.split('').map(x => x.charCodeAt(0))
      let originData = new Uint8Array(convertTemp)
      // Pack Zlib inflate
      let inflatedData = pako.inflate(originData)
      // Decrypt
      let decryptData = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.lib.WordArray.create(inflatedData)
      },
        CryptoJS.enc.Utf8.parse('xTs|0dw2swypRrry'), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.NoPadding
        }
      )
      // Magic ?
      let jsonText = CryptoJS.enc.Utf8.stringify(decryptData)
      jsonText = jsonText.substr(0, jsonText.lastIndexOf('}') + 1)
      // To Object
      let dataObj = JSON.parse(jsonText)
      console.log(dataObj);
      // Take useful part
      TRHMasterData.masterData = dataObj
      // level_master
      TRHMasterData.UserLevel = null
      // sword_level_master
      TRHMasterData.SwordLevel = null
      // sword_master
      TRHMasterData.Sword = null
      // equip_master
      TRHMasterData.Equip = null
      // consumable_master
      TRHMasterData.Consumable = null
      // field_square_master
      TRHMasterData.FieldSquare = null
      // event_square_master
      TRHMasterData.EventSquare = null
      // wait promise
      return Promise.all([
        TRHMasterData.initUserLevelMaster(store),
        TRHMasterData.initSwordLevelMaster(store),
        TRHMasterData.initSwordMaster(store),
        TRHMasterData.initEquipMaster(store),
        TRHMasterData.initConsumableMaster(store),
        TRHMasterData.initFieldSquareMaster(store),
        TRHMasterData.initEventSquareMaster(store)
      ]).then(() => {
        console.log('done', store)
      })
    }
    // Init User Level Data
    static initUserLevelMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.UserLevel = _(TRHMasterData.masterData.level_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['level'] = _.toInteger(arr[0])
          obj['exp'] = _.toInteger(arr[1])
          obj['maxResource'] = _.toInteger(arr[2])
          obj['money'] = _.toInteger(arr[3])
          return obj
        })
        .keyBy('level')
        .value()
      return localforage.setItem('UserLevelMaster', TRHMasterData.UserLevel)
        .then(() => {
          console.log(TRHMasterData.UserLevel)
          store.commit('loadData', {
            key: 'UserLevel',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'UserLevel',
            loaded: false
          })
        })
    }

    // Init Sword Level Data
    static initSwordLevelMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.SwordLevel = _(TRHMasterData.masterData.sword_level_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['type'] = _.toInteger(arr[0])
          obj['level'] = _.toInteger(arr[1])
          obj['exp'] = _.toInteger(arr[2])
          return obj
        })
        .groupBy('type')
        .mapValues((val) => {
          return _(val).keyBy('level').mapValues(v => v.exp).value()
        })
        .value()
      return localforage.setItem('SwordLevelMaster', TRHMasterData.SwordLevel)
        .then(() => {
          console.log(TRHMasterData.SwordLevel)
          store.commit('loadData', {
            key: 'SwordLevel',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'SwordLevel',
            loaded: false
          })
        })
    }

    // Init Sword Data
    static initSwordMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.Sword = _(TRHMasterData.masterData.sword_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['swordId'] = _.toInteger(arr[0])
          obj['baseId'] = _.toInteger(arr[1])
          obj['name'] = arr[2]
          obj['alias'] = arr[3]
          obj['symbol'] = _.toInteger(arr[4])
          obj['styleId'] = _.toInteger(arr[5])
          obj['type'] = _.toInteger(arr[6])
          obj['realType'] = _.toInteger(arr[7])
          obj['rarity'] = _.toInteger(arr[8])
          obj['maxLevel'] = _.toInteger(arr[9])
          obj['hp'] = _.toInteger(arr[10])
          obj['atk'] = _.toInteger(arr[11])
          obj['def'] = _.toInteger(arr[12])
          obj['mobile'] = _.toInteger(arr[13])
          obj['back'] = _.toInteger(arr[14])
          obj['scout'] = _.toInteger(arr[15])
          obj['hide'] = _.toInteger(arr[16])
          obj['hpUp'] = _.toInteger(arr[17])
          obj['atkUp'] = _.toInteger(arr[18])
          obj['defUp'] = _.toInteger(arr[19])
          obj['mobileUp'] = _.toInteger(arr[20])
          obj['backUp'] = _.toInteger(arr[21])
          obj['scoutUp'] = _.toInteger(arr[22])
          obj['hideUp'] = _.toInteger(arr[23])
          obj['getCharcoal'] = _.toInteger(arr[24])
          obj['getSteel'] = _.toInteger(arr[25])
          obj['getCoolant'] = _.toInteger(arr[26])
          obj['getFile'] = _.toInteger(arr[27])
          obj['careCharcoal'] = _.toInteger(arr[28])
          obj['careSteel'] = _.toInteger(arr[29])
          obj['careCoolant'] = _.toInteger(arr[30])
          obj['careFile'] = _.toInteger(arr[31])
          obj['equipSlot'] = _.toInteger(arr[32])
          obj['loyalties'] = _.toInteger(arr[33])
          obj['artist'] = arr[34]
          obj['voiceActor'] = arr[35]
          obj['imageId'] = _.toInteger(arr[36])
          obj['shareWord'] = _.toInteger(arr[37])
          return obj
        })
        .keyBy('swordId')
        .value()
      return localforage.setItem('SwordMaster', TRHMasterData.Sword)
        .then(() => {
          console.log(TRHMasterData.Sword)
          store.commit('loadData', {
            key: 'Sword',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'Sword',
            loaded: false
          })
        })
    }

    // Init Equip Data
    static initEquipMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.Equip = _(TRHMasterData.masterData.equip_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['equipId'] = _.toInteger(arr[0])
          obj['name'] = arr[1]
          obj['description'] = arr[2]
          obj['type'] = _.toInteger(arr[3])
          obj['rarity'] = _.toInteger(arr[4])
          obj['atk'] = _.toInteger(arr[5])
          obj['def'] = _.toInteger(arr[6])
          obj['mobility'] = _.toInteger(arr[7])
          obj['back'] = _.toInteger(arr[8])
          obj['scout'] = _.toInteger(arr[9])
          obj['hide'] = _.toInteger(arr[10])
          obj['soldier'] = _.toInteger(arr[11])
          obj['disposeCharcoal'] = _.toInteger(arr[12])
          obj['disposeSteel'] = _.toInteger(arr[13])
          obj['disposeCoolant'] = _.toInteger(arr[14])
          obj['disposeFile'] = _.toInteger(arr[15])
          return obj
        })
        .keyBy('equipId')
        .value()
      return localforage.setItem('EquipMaster', TRHMasterData.Equip)
        .then(() => {
          console.log(TRHMasterData.Equip)
          store.commit('loadData', {
            key: 'Equip',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'Equip',
            loaded: false
          })
        })
    }

    //Init Consumable Data
    static initConsumableMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.Consumable = _(TRHMasterData.masterData.consumable_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['consumableId'] = _.toInteger(arr[0])
          obj['baseId'] = _.toInteger(arr[1])
          obj['name'] = arr[2]
          obj['description'] = arr[3]
          obj['type'] = _.toInteger(arr[4])
          obj['value'] = _.toInteger(arr[5])
          obj['limitNum'] = _.toInteger(arr[6])
          //flg of available?
          obj['flg'] = _.toInteger(arr[7])
          //abandoned but exist??
          obj['unknown'] = _.toInteger(arr[8])
          return obj
        })
        .keyBy('consumableId')
        .value()
      return localforage.setItem('ConsumableMaster', TRHMasterData.Consumable)
        .then(() => {
          console.log(TRHMasterData.Consumable)
          store.commit('loadData', {
            key: 'Consumable',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'Consumable',
            loaded: false
          })
        })
    }

    //Init Square Data
    static initFieldSquareMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.FieldSquare = _(TRHMasterData.masterData.field_square_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['episodeId'] = _.toInteger(arr[0])
          obj['fieldId'] = _.toInteger(arr[1])
          obj['layerNum'] = _.toInteger(arr[2])
          obj['squareId'] = _.toInteger(arr[3])
          obj['category'] = _.toInteger(arr[4])
          obj['itemType'] = _.toInteger(arr[5])
          obj['itemId'] = _.toInteger(arr[6])
          obj['itemNum'] = _.toInteger(arr[7])
          obj['bgmId'] = _.toInteger(arr[8])
          return obj
        })
        .groupBy('episodeId')
        .mapValues((val) => {
          return _(val)
            .groupBy('fieldId')
            .mapValues((v) => {
              return _(v)
                .groupBy('layerNum')
                .mapValues((vv) =>{
                  return _(vv)
                    .keyBy('squareId')
                    .value()
                })
                .value()
            })
            .value()
        })
        .value()
      return localforage.setItem('FieldSquareMaster', TRHMasterData.FieldSquare)
        .then(() => {
          console.log(TRHMasterData.FieldSquare)
          store.commit('loadData', {
            key: 'FieldSquare',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'FieldSquare',
            loaded: false
          })
        })
    }

    //Init Event Square Data
    static initEventSquareMaster (store) {
      if (TRHMasterData.masterData === null) return
      TRHMasterData.EventSquare = _(TRHMasterData.masterData.event_square_master)
        .split('\n')
        .map((line) => {
          let arr = line.split(',')
          let obj = {}
          obj['episodeId'] = _.toInteger(arr[0])*(-1)
          obj['fieldId'] = _.toInteger(arr[1])
          obj['layerNum'] = _.toInteger(arr[2])
          obj['squareId'] = _.toInteger(arr[3])
          obj['category'] = _.toInteger(arr[4])
          obj['itemType'] = _.toInteger(arr[5])
          obj['itemId'] = _.toInteger(arr[6])
          obj['itemNum'] = _.toInteger(arr[7])
          obj['bgmId'] = _.toInteger(arr[8])
          return obj
        })
        .groupBy('episodeId')
        .mapValues((val) => {
          return _(val)
            .groupBy('fieldId')
            .mapValues((v) => {
              return _(v)
                .groupBy('layerNum')
                .mapValues((vv) =>{
                  return _(vv)
                    .keyBy('squareId')
                    .value()
                })
                .value()
            })
            .value()
        })
        .value()
      return localforage.setItem('EventSquareMaster', TRHMasterData.EventSquare)
        .then(() => {
          console.log(TRHMasterData.EventSquare)
          store.commit('loadData', {
            key: 'EventSquare',
            loaded: true
          })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loadData', {
            key: 'EventSquare',
            loaded: false
          })
        })
    }
  }
})
