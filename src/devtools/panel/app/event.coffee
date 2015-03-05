# 事件控制器
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.event = {} if !exports.tohken.event
  # 用来模拟数据的恢复
  exports.tohken.event.handle = null
  # 启动
  exports.tohken.event.start = (environment)->
    # 按三分钟更新的定时器
    exports.tohken.event.handle = setInterval( ->
      exports.tohken.event.action.call(environment)
    , 1000)
  # 终止
  exports.tohken.event.stop = ->
    return if exports.tohken.event.handle == null
    clearInterval(exports.tohken.event.handle)
  # 进程
  exports.tohken.event.action = ->
    # 资源每三分钟增加三点
    max = @data['resource']['max_resource']
    @data['resource']['vcharcoal'] += 3 if @data['resource']['charcoal'] + @data['resource']['vcharcoal'] + 3 <= max
    @data['resource']['vsteel']    += 3 if @data['resource']['steel']    + @data['resource']['vsteel']    + 3 <= max
    @data['resource']['vcoolant']  += 3 if @data['resource']['coolant']  + @data['resource']['vcoolant']  + 3 <= max
    @data['resource']['vfile']     += 3 if @data['resource']['file']     + @data['resource']['vfile']     + 3 <= max
    # 自然恢复，每分钟+3，上限为49，在出阵和远征时不进行回复
    # 因为战斗后会返回新的数据所以跳过
    return if @data['status']['in_battle']
    conquest_list = []
    # 检定远征
    _.forEach @data['party']['data'], (v, k)=>
      if v['finished_at'] != null
        _.forEach v['slot'], (vi, ki)=>
          conquest_list.push vi['serial_id'] if vi['serial_id'] != null
      'done'
    # 开始循环增加
    _.forEach @data['sword']['data'], (v, k)=>
      if _.findIndex v['serial_id'] == -1
        if parseInt(@data['sword']['data'][k]['fatigue'], 10) + parseInt(@data['sword']['data'][k]['vfatigue'], 10) + 3 < 49
          @data['sword']['data'][k]['vfatigue'] = parseInt(@data['sword']['data'][k]['vfatigue'], 10) + 3
        else if Math.abs(49 - (parseInt(@data['sword']['data'][k]['fatigue'], 10) + parseInt(@data['sword']['data'][k]['vfatigue'], 10))) <= 3
          @data['sword']['data'][k]['vfatigue'] = parseInt(@data['sword']['data'][k]['vfatigue'], 10) + (49 - (parseInt(@data['sword']['data'][k]['fatigue'], 10) + parseInt(@data['sword']['data'][k]['vfatigue'], 10)))

      'done'
    # 更新视图数据
    exports.tohken.parse.view.call this, 'resource'
    exports.tohken.parse.view.call this, 'party'
    'done'
)(window)
