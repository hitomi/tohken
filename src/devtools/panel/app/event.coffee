# 事件控制器
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.event = {} if !exports.tohken.event
  # 用来模拟数据的恢复
  exports.tohken.event.handle = null
  # 启动
  exports.tohken.event.start = (environment)->
    exports.tohken.event.fatigue.call(environment)
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
    exports.tohken.event.fatigue.call this
    'done'
  # 疲劳演算
  exports.tohken.event.fatigue = ->
    # 自然恢复，每分钟+3，上限为49，在出阵和远征时不进行回复
    # 因为战斗后会返回新的数据所以跳过
    return if @status['in_battle']
    return if @status['last_router'] == 'battle/battle'
    return if @status['last_router'] == 'sally/forward'
    if @config['cadOffList'] == 1
      return if @status['router'] == 'party/list'
    change = false
    # 开始循环增加
    _.forEach @data['sword']['data'], (v, k)=>
      # 换一种科学的计算方式…
      sword   = @data['sword']['data'][k]
      status  = parseInt(sword['status'], 10)
      return if status == 3
      fatigue = parseInt(sword['fatigue'], 10)
      return if fatigue >= 49
      last    = Date.parse "#{sword['recovered_at']} GMT+0900"
      now     = Date.now()
      time    = now - last
      vfatigue = Math.floor(time / 60000)
      if (fatigue + vfatigue) >= 49
        vfatigue = 49 - fatigue
      # 合并数据
      if parseInt(sword['vfatigue'], 10) != parseInt(vfatigue, 10)
        #三分钟三点
        vfix = vfatigue - (vfatigue % 3)
        # 合并数据
        if (fatigue + vfatigue) >= 49
          change = true
          sword['vfatigue'] = vfatigue
        else
          change = true
          sword['vfatigue'] = vfix
      'done'
    if change
      exports.tohken.parse.view.call this, 'party'
)(window)
