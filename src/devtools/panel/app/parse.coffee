# 数据处理器
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.parse = {} if !exports.tohken.parse
  # 处理资源
  exports.tohken.parse.resource = (resource)->
    @data['resource']['filling']      = true unless @data['resource']['filling']
    @data['resource']['charcoal']     = resource['charcoal']
    @data['resource']['steel']        = resource['steel']
    @data['resource']['coolant']      = resource['coolant']
    @data['resource']['file']         = resource['file']
    @data['resource']['bill']         = resource['bill']
    @data['resource']['max_resource'] = resource['max_resource']
    # 记录更新时间
    @data['resource']['last_update']  = Date.now()
    # 清除虚拟数据
    @data['resource']['vcharcoal']    = 0
    @data['resource']['vsteel']       = 0
    @data['resource']['vcoolant']     = 0
    @data['resource']['vfile']        = 0
    'done'
  # 处理刀剑信息
  exports.tohken.parse.sword = (sword)->
    @data['sword']['filling'] = true unless @data['sword']['filling']
    # 准备一个空的分支
    branch = {}
    # 拆包循环
    _.forEach sword, (v, k)=>
      # 判断数据是否已经存在
      pre = if @data['sword']['data'][k] then _.clone(@data['sword']['data'][k]) else _.clone(exports.tohken.data['sword']['template'])
      # 填充数据
      _.forEach pre, (vi, ki)->
        # 向目标合并数据
        if _.has(v, ki)
          pre[ki] = v[ki]
        # 清空模拟数据
        if ki == 'vfatigue'
          pre[ki] = 0
      # 向分支合并数据
      branch[k] = pre
    # 用分支替换主线
    @data['sword']['data'] = branch
    # 记录更新时间
    @data['sword']['last_update']  = Date.now()
    exports.tohken.parse.view.call this, 'party'
    'done'
  # 处理队伍信息
  exports.tohken.parse.party = (party)->
    @data['party']['filling'] = true unless @data['party']['filling']
    @data['party']['data'] = party
    # 记录更新时间
    @data['party']['last_update']  = Date.now()
    exports.tohken.parse.view.call this, 'party'
    'done'
  # 处理刀装信息
  exports.tohken.parse.equip = (equip)->
    @data['equip']['filling'] = true unless @data['equip']['filling']
    @data['equip']['data'] = equip
    # 记录更新时间
    @data['equip']['last_update']  = Date.now()
    exports.tohken.parse.view.call this, 'party'
    'done'
  # 处理锻造信息
  exports.tohken.parse.forge = (forge)->
    @data['forge']['filling'] = true unless @data['forge']['filling']
    @data['forge']['data'] = forge
    # 记录更新时间
    @data['forge']['last_update']  = Date.now()
    'done'
  # 向视图填充数据
  exports.tohken.parse.view = (type)->
    switch type
      when 'player'
        # 填充数据
        source = @data['player']
        target = @view['player']
        exports.tohken.parse.fill target, source
      when 'resource'
        # 填充数据
        source = @data['resource']
        target = @view['resource']
        exports.tohken.parse.fill target, source
        # 追加模拟运算数据
        target['charcoal']  = target['charcoal'] + source['vcharcoal']
        target['steel']     = target['steel']    + source['vsteel']
        target['coolant']   = target['coolant']  + source['vcoolant']
        target['file']      = target['file']     + source['vfile']
        # 返回设置状态
        target['set'] = true
      when 'party'
        return if @data['equip']['filling'] == false
        return if @data['sword']['filling'] == false
        return if @data['party']['filling'] == false
        # 向队伍数据中合并刀与刀装数据
        source = @data['party']
        # 准备一个分支
        target = _.clone @data['party']['data']
        _.forEach target, (v, k)=>
          # 循环及替换与追加数据
          lvs = 0
          eqs = 0
          ths = 0
          # 首先替换slot里的数据为实际数据
          slot = _.clone v['slot']
          _.forEach v['slot'], (vi, ki)=>
            soldiers = 0
            if vi['serial_id'] != null
              ths += 1
              slot[ki] = _.clone @data['sword']['data'][vi['serial_id']]
              # 更新刀装
              if slot[ki]['equip_serial_id1'] != null
                slot[ki]['equip_1'] = _.clone @data['equip']['data'][slot[ki]['equip_serial_id1']]
                # 向刀装中追加现存兵力和名称的字段
                slot[ki]['equip_1']['name'] = exports.tohken.define['equip'][slot[ki]['equip_1']['equip_id']]['name']
                slot[ki]['equip_1']['sname'] = exports.tohken.define.equiptype_s[exports.tohken.define['equip'][slot[ki]['equip_1']['equip_id']]['type']]

                slot[ki]['equip_1']['soldier_now'] = slot[ki]['equip_1']['soldier']
                slot[ki]['equip_1']['level'] = parseInt(slot[ki]['equip_1']['equip_id'], 10) % 3
                soldiers += parseInt slot[ki]['equip_1']['soldier'], 10
              if slot[ki]['equip_serial_id2'] != null
                slot[ki]['equip_2'] = _.clone @data['equip']['data'][slot[ki]['equip_serial_id2']]
                # 向刀装中追加现存兵力和名称的字段
                slot[ki]['equip_2']['name'] = exports.tohken.define['equip'][slot[ki]['equip_2']['equip_id']]
                slot[ki]['equip_2']['sname'] = exports.tohken.define.equiptype_s[exports.tohken.define['equip'][slot[ki]['equip_2']['equip_id']]['type']]
                slot[ki]['equip_2']['soldier_now'] = slot[ki]['equip_2']['soldier']
                slot[ki]['equip_2']['level'] = parseInt(slot[ki]['equip_2']['equip_id'], 10) % 3
                soldiers += parseInt slot[ki]['equip_2']['soldier'], 10
              if slot[ki]['equip_serial_id3'] != null
                slot[ki]['equip_3'] = _.clone @data['equip']['data'][slot[ki]['equip_serial_id3']]
                # 向刀装中追加现存兵力和名称的字段
                slot[ki]['equip_3']['name'] = exports.tohken.define['equip'][slot[ki]['equip_3']['equip_id']]
                slot[ki]['equip_3']['sname'] = exports.tohken.define.equiptype_s[exports.tohken.define['equip'][slot[ki]['equip_3']['equip_id']]['type']]
                slot[ki]['equip_3']['soldier_now'] = slot[ki]['equip_3']['soldier']
                slot[ki]['equip_3']['level'] = parseInt(slot[ki]['equip_3']['equip_id'], 10) % 3
                soldiers += parseInt slot[ki]['equip_3']['soldier'], 10
              # 追加兵力和名称与类型数据
              slot[ki]['name'] = exports.tohken.define['tohkens'][slot[ki]['sword_id']]['name']
              slot[ki]['type'] = exports.tohken.define['type'][exports.tohken.define['tohkens'][slot[ki]['sword_id']]['type']]
              slot[ki]['max_equip'] = exports.tohken.define['tohkens'][slot[ki]['sword_id']]['equip']
              slot[ki]['soldiers'] = soldiers
              # 合并等级和兵力数据
              lvs += parseInt slot[ki]['level'], 10
              eqs += soldiers
              # 合并虚拟疲劳
              slot[ki]['fatigue'] = parseInt(slot[ki]['fatigue'], 10) + parseInt(slot[ki]['vfatigue'],10)

          # 合并数据
          target[k]['slot'] = slot
          target[k]['amount_lv'] = lvs
          target[k]['avearge_lv'] = if lvs then (lvs / ths).toFixed(2) else 0
          target[k]['soldiers'] = eqs
        @view['party']['set'] = true
        @view['party']['data'] = target
    @$log @data
  # 数据填充工具
  exports.tohken.parse.fill = (target, source)->
    _.forEach target, (vi, ki)->
      # 向目标合并数据
      if _.has(source, ki)
        target[ki] = source[ki]
)(window)
