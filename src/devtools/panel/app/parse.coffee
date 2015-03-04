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
    @data['resource']['steel']        = 0
    @data['resource']['coolant']      = 0
    @data['resource']['file']         = 0
    'done'
  # 处理刀剑信息
  exports.tohken.parse.sword = (sword)->
    @data['sword']['filling'] = true unless @data['sword']['filling']
    # 准备一个空的分支
    branch = {}
    # 拆包循环
    _.forEach sword, (v, k)=>
      # 判断数据是否已经存在
      pre = if @data['sword']['data'][k] then @data['sword']['data'][k] else exports.tohken.data['sword']['template']
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
    'done'
  # 处理队伍信息
  exports.tohken.parse.party = (party)->
    @data['party']['filling'] = true unless @data['party']['filling']
    @data['party']['data'] = party
    # 记录更新时间
    @data['party']['last_update']  = Date.now()
    'done'
  # 处理刀装信息
  exports.tohken.parse.equip = (equip)->
    @data['equip']['filling'] = true unless @data['equip']['filling']
    @data['equip']['data'] = equip
    # 记录更新时间
    @data['equip']['last_update']  = Date.now()
    'done'
  # 处理锻造信息
  exports.tohken.parse.forge = (forge)->
    @data['forge']['filling'] = true unless @data['forge']['filling']
    @data['forge']['data'] = forge
    # 记录更新时间
    @data['forge']['last_update']  = Date.now()
    'done'
)(window)
