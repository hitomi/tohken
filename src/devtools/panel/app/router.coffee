# 数据包路由
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.router = (request, action)->
    parse = exports.tohken.parse
    # 如果不处于游戏状态终止路由
    @gaming = true if !@gaming
    @status['last_router'] = @status['router']
    @status['router'] = action
    console.log @status['router']
    switch action
      # 本丸
      when 'home'
        @parser request, (data)=>
          # 更新资源信息
          parse.resource.call this, data['resource']
          exports.tohken.parse.view.call this, 'resource'
          @status['in_battle'] = false
          exports.tohken.event.fatigue.call this
          exports.tohken.event.start this if exports.tohken.event.handle == null
      when 'user/profile'
        @parser request, (data)=>
          @data['player']['world'] = data['world']
      # 锻刀
      when 'forge'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          parse.equip.call    this, data['equip']
          parse.sword.call    this, data['sword']
          parse.party.call    this, data['party']
          parse.forge.call    this, data['forge']
          exports.tohken.parse.view.call this, 'resource'
      # 锻刀提交
      when 'forge/start'
        @parser request, (data)=>
          @data['forge']['filling'] = true if !@data['forge']['filling']
          time = Date.parse "#{data['finished_at']} GMT+0900"
          id = "#{data['slot_no']}-#{time}"
          forge = {}
            # consumable_id
          forge['slot_no']            = data['slot_no']
          forge['finish_at']          = time
          forge['sword_id']           = data['sword_id']
          # 记录
          forge['resource']           = true
          forge['times']              = Math.ceil((time - Date.now()) / 1000 / 60)
          forge['charcoal']           = data['post_data']['charcoal']
          forge['coolant']            = data['post_data']['coolant']
          forge['file']               = data['post_data']['file']
          forge['steel']              = data['post_data']['steel']
          forge['secretary']          = if @data['player']['secretary'] == null then 0 else @data['player']['secretary']
          forge['upload']             = false
          @data['logs']['forge'][id]  = forge
          ''
      # 手入
      when 'repair'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          parse.sword.call    this, data['sword']
          parse.party.call    this, data['party']
          parse.repair.call   this, data['repair']
          exports.tohken.parse.view.call this, 'resource'
          exports.tohken.parse.check_repair.call　this, data['repair']
      # 手入
      when 'repair/repair'
        @parser request, (data)=>
          parse.resource.call this, data['resource']
          parse.repair.call   this, data['repair']
          exports.tohken.parse.view.call this, 'resource'
          exports.tohken.parse.check_repair.call　this, data['repair']
      # 结成
      when 'party/list'
        @parser request, (data)=>
          parse.equip.call    this, data['equip']
          parse.sword.call    this, data['sword']
          parse.party.call    this, data['party']
          parse.conquest.call this, data['party']
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
          parse.conquest.call this, data['party']
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
        @parser request, (data)=>
          exports.tohken.event.fatigue.call this
          @status['in_battle'] = true
          @status['battle_id'] = data['post_data']['party_no']
          @status['battle_episode'] = data['post_data']['episode_id']
          @status['battle_field'] = data['post_data']['field_id']
          _.forEach @data['party']['data'][@status['battle_id']]['slot'], (v, k)=>
            return if v['serial_id'] == null
            v['fatigue'] = parseInt(v['fatigue'], 10) - 10
            @data['sword']['data'][v['serial_id']]['vfatigue'] = parseInt(@data['sword']['data'][v['serial_id']]['vfatigue'], 10) - 10
      # 出阵确认
      when 'sally/forward'
        @parser request, (data)=>
          @status['battle_pos'] = data.square_id
          if @status['need_reload']
            chrome.devtools.inspectedWindow.reload()
            @status['need_reload'] = false
      # 远征
      when 'conquest/start'
        @parser request, (data)=>
          parse.party.call this, data['party']
          parse.conquest.call this, data['party']
          # TODO：远征提醒
      # 远征
      when 'battle/battle'
        @parser request, (data)=>
          parse.battle.call this, data

)(window)
