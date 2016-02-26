define (require, exports, module)->
  # require
  _   = require 'lodash'
  $   = require 'jquery'
  Vue = require 'vue'
  websql = require 'cs!core/utils/websql'
  
  # create vue
  vm = new Vue {
    el: "#swords"
    data: ->
      {
        order: '-exp'
        swords: []
        equips: []
        define: {
          group: require 'cs!core/defines/sword/group'
          type: require 'cs!core/defines/sword/type'
          area: require 'cs!core/defines/sword/area'
          sword: require 'cs!core/defines/sword/sword'
          equip: require 'cs!core/defines/equip/equip'
          flower: ["一", "二", "三", "四", "五"]
          evol: ["普通", "特", "特二", "特三"]
        }
      }
    ready: ->
      websql.init()
      @load()
    methods:
      load:
        # load sword
        websql
          .select()
          .from('game_sword')
          .go (tx, data)=>
            @swords = _.values(data.rows)
        #load equip
        websql
          .select()
          .from('game_equip')
          .go (tx, data)=>
            @equips = _.values(data.rows)
      e2n: (equip_serial)->
        return '无' if equip_serial == 0
        sid = _.result(_.find(@equips, 'serial_id', equip_serial), 'equip_id')
        @define['equip'][sid].name if sid
  }
  