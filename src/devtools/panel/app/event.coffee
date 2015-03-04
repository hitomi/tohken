# 事件控制器
((exports)->
  # 用来模拟数据的恢复
  exports.tohken.event.handle = null
  # 启动
  exports.tohken.event.start = (environment)->
    # 按三分钟更新的定时器
    exports.tohken.event.handle = setInterval(function() {
      exports.tohken.event.action.call(environment)
    }, 180000)
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
    # 出阵时 -10
    # 开始战斗 -3
    # MVP +10
    # 胜利时队长+3，失败不增加
    # S时+4(不含MVP)  A时+3  B时+2  C时+1，败北不增加
    # 待验证
    return if @data['status']['in_battle']
    conquest_list = []
    # 检定远征
    _.forEach @data['party']['data'], (v, k)=>
      if v['finished_at'] != null
        _.forEach v['slot'], (vi, ki)=>
          conquest_list.push vi['serial_id'] if vi['serial_id'] != null
    # 开始循环增加
    _.forEach @data['sword']['data'], (v, k)=>
      if _.findIndex v['serial_id'] == -1
        @data['sword']['data'][k]['vfatigue'] +3 if @data['sword']['data'][k]['fatigue'] + @data['sword']['data'][k]['vfatigue'] <= 49
)(window)
