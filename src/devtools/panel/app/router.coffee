# 数据包路由
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.router = (request, action)->
    parse = exports.tohken.parse
    # 如果不处于游戏状态终止路由
    @gaming = true if !@gaming
    switch action
      # 本丸
      when 'home'
        @parser request, (data)=>
          # 更新资源信息
          parse.resource.call this, data['resource']
          exports.tohken.parse.view.call this, 'resource'
          # exports.tohken.event.start this if exports.tohken.event.handle == null
      # 锻刀
      when 'forge'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          parse.equip.call    this, data['equip']
          parse.sword.call    this, data['sword']
          parse.party.call    this, data['party']
          parse.forge.call    this, data['forge']
          exports.tohken.parse.view.call this, 'resource'
      # 结成
      when 'party/list'
        @parser request, (data)=>
          parse.equip.call    this, data['equip']
          parse.sword.call    this, data['sword']
          parse.party.call    this, data['party']
          # TODO：远征提醒
      # 更新结成数据
      when 'party/setsword'
        @parser request, (data)=>
          parse.party.call    this, data
      when 'party/removesword'
        @parser request, (data)=>
          parse.party.call    this, data
      # 启动
      when 'login/start'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          parse.equip.call    this, data['equip']
          parse.party.call    this, data['party']
          # 更新玩家数据
          # data.item["8"]["num"] if data.item["8"]
          @data['player']['name']                 = data['name']
          @data['player']['level']                = data['level']
          @data['player']['exp']                  = data['exp']
          @data['player']['max_sword']            = data['max_sword']
          @data['player']['secretary']            = data['secretary']
          @data['player']['secretary_serial_id']  = data['secretary_serial_id']
          @data['player']['max_party']            = data['max_party']
          @data['player']['forge_slot']           = data['forge_slot']
          @data['player']['repair_slot']          = data['repair_slot']
          # 手伝い札和小判
          @data['resource']['bonemeal']           = data['item']["8"]["num"] if data['item']["8"]
          @data['resource']['money']              = data['currency']['money']
          # 更新锻刀和手入位置数
          @data['forge']['open']                  = data['forge_slot']
          @data['repair']['open']                 = data['repair_slot']
          exports.tohken.parse.view.call this, 'player'
          exports.tohken.parse.view.call this, 'resource'
      # 修复
      when 'repair/repair'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          @data['repair']['data'] = data['repair']
          exports.tohken.parse.view.call this, 'resource'
      # 出阵
      when 'sally'
        @parser request, (data)=>
          parse.equip.call this, data['equip']
          parse.sword.call this, data['sword']
          parse.party.call this, data['party']
      # 出阵确认
      when 'sally/sally'
        partyno = request['request']['postData']['text'].match(/no=(\d)/)[1]
        _.forEach @data['party']['data'][partyno]['slot'], (v, k)=>
          return if v['serial_id'] == null
          v['fatigue'] = parseInt(v['fatigue'], 10) - 10
          @data['party']['data'][v['serial_id']]['vfatigue'] = parseInt(@data['party']['data'][v['serial_id']]['vfatigue'], 10) - 10
      # 远征
      when 'conquest/start'
        @parser request, (data)=>
          parse.party.call this, data['party']
          # TODO：远征提醒
      # 远征
      when 'battle/battle'
        @parser request, (data)=>
          parse.battle.call this, data
)(window)
