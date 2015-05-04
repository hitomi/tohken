((exports)->
  Vue.config.debug = true;
  exports.tohken = {} if !exports.tohken
  exports.tohken.control = new Vue {
    el: '#app'

    data: {
      version: '0.1.0'
      gaming: false
      tab: 2
      data: exports.tohken.data
      view: exports.tohken.view
      config: exports.tohken.config
      vdata: true
      dataExist: false
      status: {
        # 是否在战斗状态
        "in_battle": false
        # 当前所在地图
        "router": null
        # 上一次所在地图
        "last_router": null
        # 战斗中的队伍ID
        "battle_id": null
        # 战斗中地图
        "battle_episode": null
        "battle_field": null
        # 战斗中位置
        "battle_pos": null
        # 显示锻刀结果
        "show_forge": false
        # 是否重伤刷新
        "need_reload": false
      }
    }

    ready: ->
      # Listen the network request
      chrome.devtools.network.onRequestFinished.addListener (request)=>
        # filter
        tohken = request.request.url.match /http:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/
        if tohken != null
          # throw static
          return if tohken[1] == "static"
          # pass
          @route(request, tohken[2])
      # loadData
      @loadData()
    filters: {
      conquest_time: (finished_at)->
        d = new Date()
        d.setTime(Date.parse("#{finished_at} GMT+0900"))
        d.toTimeString().slice(0, 8)
      e2n: (equip_id)->
        exports.tohken.define.equip[equip_id]['name']
      ls2t: (time)->
        date = new Date()
        date.setTime time
        year    = date.getFullYear()
        month   = if (date.getMonth() + 1) < 10 then "0#{(date.getMonth() + 1)}"   else (date.getMonth() + 1)
        day     = if date.getDate()        < 10 then "0#{date.getDate()}"          else date.getDate()
        hour    = if date.getHours()       < 10 then "0#{date.getHours()}"         else date.getHours()
        minute  = if date.getMinutes()     < 10 then "0#{date.getMinutes()}"       else date.getMinutes()
        second  = if date.getSeconds()     < 10 then "0#{date.getSeconds()}"       else date.getSeconds()
        "#{year}/#{month}/#{day} #{hour}:#{minute}:#{second}"
      tt2lt: (time)->
        date = new Date()
        date.setTime(Date.parse("#{time} GMT+0900"))
        year    = date.getFullYear()
        month   = if (date.getMonth() + 1) < 10 then "0#{(date.getMonth() + 1)}"   else (date.getMonth() + 1)
        day     = if date.getDate()        < 10 then "0#{date.getDate()}"          else date.getDate()
        hour    = if date.getHours()       < 10 then "0#{date.getHours()}"         else date.getHours()
        minute  = if date.getMinutes()     < 10 then "0#{date.getMinutes()}"       else date.getMinutes()
        second  = if date.getSeconds()     < 10 then "0#{date.getSeconds()}"       else date.getSeconds()
        "#{year}/#{month}/#{day} #{hour}:#{minute}:#{second}"
      ls2n: (sword_id)->
        if sword_id == null || parseInt(sword_id, 10) == 0
          return '未获得'
        exports.tohken.define.tohkens[sword_id]['name']
      fs2n: (sword_id)->
        return '???' unless @status['show_forge']
        if sword_id == null || parseInt(sword_id, 10) == 0
          return '未获得'
        exports.tohken.define.tohkens[sword_id]['name']
      r2r: (rank)->
        r = ['S', 'A', 'B', 'C']
        return r[rank-2]

      sid2n: (sid)->
        exports.tohken.define.tohkens[@data['sword']['data'][sid]['sword_id']]['name']
    }

    methods: {
      # Route the request
      route: (request, action)->
        exports.tohken.router.call this, request, action
        return if @config['dataCache'] == 0
        exports.tohken.store.set "TRH_DataCache", JSON.stringify(@data)

      # Parse data to json
      parser: (request, callback)->
        spost = request['request']['postData']['text'].replace(/%5F/g, '_').split('&')
        post = {}
        _.forEach spost, (n)->
          t = n.split('=')
          post[t[0]] = t[1]
        request.getContent (content, encoding)->
          con = JSON.parse(content)
          con['post_data'] = post
          callback.call this, con

      # Apply Config
      applyConfig: (key, value)->
        if key == 'dataCache' && value == -1
          exports.tohken.store.remove "TRH_DataCache"
          @dataExist = false
          return
        @config[key] = value
        exports.tohken.store.set "TRH_Config", JSON.stringify(@config)

      # Load Data
      loadData: ->
        # Config
        @config = exports.tohken.store.get "TRH_Config", exports.tohken.config, true
        # CheckData
        ex = exports.tohken.store.get "TRH_DataCache", "nil", true
        @dataExist = true if ex != "nil"
        # Data
        return if @config['dataCache'] == 0
        if @dataExist
          @data = exports.tohken.store.get "TRH_DataCache", exports.tohken.data, true
          exports.tohken.parse.view.call this, 'player'
          exports.tohken.parse.view.call this, 'resource'
          exports.tohken.parse.view.call this, 'equip'
          exports.tohken.parse.view.call this, 'party'
          exports.tohken.parse.conquest.call this, @data['party']['data']
        'done'
      # Send Message to background page
      sendMessage: (msg)->
        chrome.runtime.sendMessage(msg)

      grouter: (s)->
        @status['router'] == s

      in_battle: (p)->
        @status['in_battle'] && (parseInt(@status['battle_id']) == parseInt(p, 10))

      t2t: (time)->
        date = new Date()
        date.setTime time
        year    = date.getFullYear()
        month   = if (date.getMonth() + 1) < 10 then "0#{(date.getMonth() + 1)}"   else (date.getMonth() + 1)
        day     = if date.getDate()        < 10 then "0#{date.getDate()}"          else date.getDate()
        hour    = if date.getHours()       < 10 then "0#{date.getHours()}"         else date.getHours()
        minute  = if date.getMinutes()     < 10 then "0#{date.getMinutes()}"       else date.getMinutes()
        second  = if date.getSeconds()     < 10 then "0#{date.getSeconds()}"       else date.getSeconds()
        "#{year}/#{month}/#{day} #{hour}:#{minute}:#{second}"

      s2n: (sword_id)->
        if sword_id == null || parseInt(sword_id, 10) == 0
          return '未获得'
        exports.tohken.define.tohkens[sword_id]['name']

      r2r: (rank)->
        r = ['S', 'A', 'B', 'C']
        return r[rank-2]

      checkout: (type)->
        console.log @data['repair']['data']
        switch type
          when 'repair'
            r = 0
            _.forEach @data['repair']['data'], (v)->
              r = r + 1
            return r
          when 'forge'
            r = 0
            _.forEach @data['forge']['data'], (v)->
              r = r + 1
            return r
        'done'

      toggleForge: ->
        @status['show_forge'] = !@status['show_forge']

      saveLogs: ->
        blob = new Blob([JSON.stringify(@data['logs'])], {type: "text/plain;charset=utf-8"})
        saveAs(blob, "TRHData#{Date.now()}.json")
        # 生成 CSV
        forge = "\"时间\",\"结果\",\"耗时\",\"木炭\",\"玉鋼\",\"冷却材\",\"砥石\""
        _.forEach @data['logs']['forge'], (v, k)=>
          if v['resource']
            forge += "\n\"'#{@t2t(v['finish_at'])}\",\"'#{@s2n(v['sword_id'])}\",\"'#{v['times']}\",\"'#{v['charcoal']}\",\"'#{v['steel']}\",\"'#{v['coolant']}\",\"'#{v['file']}\""
          else
            forge += "\n\"'#{@t2t(v['finish_at'])}\",\"'#{@s2n(v['sword_id'])}\",\"-\",\"-\",\"-\",\"-\",\"-\""
        blob = new Blob([forge], {type: "text/plain;charset=utf-8"})
        saveAs(blob, "TRHForge#{Date.now()}.csv")
        # 战斗
        battle = "\"时间\",\"队伍\",\"评分\",\"获得\",\"地图\",\"位置\""
        _.forEach @data['logs']['battle'], (v, k)=>
          battle += "\n\"'#{@t2t(v['time'])}\",\"'#{v['party_no']}\",\"'#{@r2r(v['rank'])}\",\"'#{@s2n(v['get_sword_id'])}\",\"'#{v['battle_episode']}-#{v['battle_field']}\",\"'#{v['battle_pos']}\""
        blob = new Blob([battle], {type: "text/plain;charset=utf-8"})
        saveAs(blob, "TRHBattle#{Date.now()}.csv")
    }
  }
)(window)
