SID = {"3": "叁日月宗近","5": "小狐丸","7": "石切丸","9": "岩融","11": "今剣","19": "にっかり青江","23": "鸣狐","25": "一期一振","27": "鲇尾藤四郎","29": "骨喰藤四郎","31": "平野藤四郎","33": "厚藤四郎","39": "前田藤四郎","41": "秋田藤四郎","45": "乱藤四郎","47": "五虎煺","49": "薬研藤四郎","55": "莺丸","59": "蛍丸","61": "爱染国俊","65": "蜻蛉切","73": "烛台切光忠","79": "江雪左文字","81": "宗叁左文字","83": "小夜左文字","85": "加州清光","87": "大和守安定","89": "歌仙兼定","91": "和泉守兼定","93": "陆奥守吉行","95": "山姥切国広","97": "山伏国広","99": "堀川国広","101": "蜂须贺虎彻","116": "大倶利伽罗","118": "へし切长谷部","122": "狮子王","128": "同田贯正国","130": "鹤丸国永","132": "太郎太刀","134": "次郎太刀","138": "御手杵"}
SEXP = [100,300,700,1300,2100,3100,4300,5700,7300,9100,11100,13300,15700,18300,21100,24100,27300,30700,34300,38200,42400,46900,51700,56800,62200,67900,73900,80200,86800,93700,100900,108400,116200,124300,132700,141400,150400,159700,169300,179300,189700,200500,211700,223300,235300,247700,260500,273700,287300,301300,315700,330500,345700,361300,377300,393700,410500,427700,445300,463400,482000,501100,520700,540800,561400,582500,604100,626200,648800,672000,695800,720200,745200,770800,797000,823800,851200,879200,907800,937200,967400,998400,1030200,1062800,1096200,1130400,1165400,1201200,1237800,1277800,1327800,1387800,1457800,1537800,1627800,1727800,1827800,1927800,0]

control = new Vue {
  el: '#app'

  data: {
    version: '0.1.0'
    gaming: false
    player: {
      "name": ""
      # 金坷垃（手伝い札）
      "bonemeal": ""
      "currency": ""
      "level": ""
      "max_sword": ""
      "next_exp": ""
    }
    tab: 0
    resource: {}
    sword: {}
    forge: {}
    equip: {}
    party: {}
    repair: []
    config: {
      "conquest_notify": 1
      "broken_on_battle_notify": 1
      "battle_new_notify": 0
    }
  }

  ready: ->
    # Config
    if typeof(localStorage["conquest_notify"]) != "undefined"
      @config["conquest_notify"] = parseInt(localStorage["conquest_notify"], 10)
    if typeof(localStorage["broken_on_battle_notify"]) != "undefined"
      @config["broken_on_battle_notify"] = parseInt(localStorage["broken_on_battle_notify"], 10)
    if typeof(localStorage["battle_new_notify"]) != "undefined"
      @config["battle_new_notify"] = parseInt(localStorage["battle_new_notify"], 10)
    console.log @config
    # Listen the network request
    chrome.devtools.network.onRequestFinished.addListener (request)=>
      # filter
      tohken = request.request.url.match /http:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/
      if tohken != null
        # throw static
        return if tohken[1] == "static"
        # pass
        @route(request, tohken[2])

  filters:
    # ID到名称
    i2n: (i)->
      SID[i]
    # 下一级经验
    exp2next: (i)->
      return 0 if parseInt(@sword[i].level, 10) == 99
      SEXP[parseInt(@sword[i].level, 10)-1]
      SEXP[parseInt(@sword[i].level, 10)-1] - parseInt(@sword[i].exp, 10)
    # 队伍平均等级
    p2alv: (i)->
      lv = 0
      amount = 6
      _.forEach i.slot, (v, k)=>
        if v.serial_id == null
          amount -= 1
          return
        lv += parseInt(@sword[v.serial_id]['level'], 10)
      if lv == 0
        return 0
      else
        return Math.round(lv/amount)

    # 队伍总等级
    p2lva: (i)->
      lv = 0
      _.forEach i.slot, (v, k)=>
        return if v.serial_id == null
        lv += parseInt(@sword[v.serial_id]['level'], 10)
      lv

  methods: {
    # Route the request
    route: (request, action)->
      @gaming = true if !@gaming
      switch action
        # 本丸
        when 'home'
          @parser request, (data)=>
            @resource        = data.resource
            @player.receive  = data.receive
        # 锻刀
        when 'forge'
          @parser request, (data)=>
            @resource = data.resource
            @sword    = data.sword
            @forge    = data.forge
            @equip    = data.equip
            @party    = data.party
        # 结成
        when 'party/list'
          @parser request, (data)=>
            @sword    = data.sword
            @equip    = data.equip
            @party    = data.party
            return if !@config["conquest_notify"]
            @sendMessage {
              type: 'conquest'
              msg:  {party: @party,now: data.now}
            }
        # 更新结成数据
        when 'party/setsword'
          @parser request, (data)=>
            @party = data
        # 启动
        when 'login/start'
          @parser request, (data)=>
            @player.currency = data.currency.money if data.currency
            @player.bonemeal = data.item["8"]["num"] if data.item["8"]
            @player.name = data.name
            @player.level = data.level
            @player.max_sword = data.max_sword
        # 修复
        # 出阵
        when 'sally'
          @parser request, (data)=>
            @party = data.party
            @sword = data.sword
        # 远征
        when 'conquest/start'
          @parser request, (data)=>
            @party = data.party
            return if !@config["conquest_notify"]
            @sendMessage {
              type: 'conquest'
              msg:  {party: @party,now: data.now}
            }
        # 出阵报告
        # TODO: 战斗报告解析，以便了解刀装破碎情况
        when 'battle/battle'
          @parser request, (data)=>
            result = data.result
            _.forEach result.player.party.slot, (v, k)=>
              # 经验值
              console.log v.serial_id
              @sword[v.serial_id]['exp'] = v.exp
              @sword[v.serial_id]['level'] = v.level
              # HP更新
              @sword[v.serial_id]['hp'] = v.hp
              if parseInt(v.hp, 10) < parseInt(@sword[v.serial_id]['hp_max'], 10)
                # 损坏提醒
                return if !@config["broken_on_battle_notify"]
                @sendMessage {
                  type: 'notify'
                  msg: {
                    title: "小心！"
                    message: "#{SID[v.sword_id]}已经受到了伤害！"
                    contextMessage: "请谨慎行动"
                  }
                }
            console.log parseInt(result.get_sword_id, 10)
            return if !@config["battle_new_notify"]
            return if parseInt(result.get_sword_id, 10) == 0
            # 新刀提醒
            @sendMessage {
              type: 'notify'
              msg: {
                title: "发现了一只新刀！"
                message: "#{SID[result.get_sword_id]}"
                contextMessage: "可以在设置里关闭提醒"
              }
            }

    # Parse data to json
    parser: (request, callback)->
      request.getContent (content, encoding)->
        callback JSON.parse(content)

    # Debug
    output: (obj)->
      document.write(obj + "<br>")

    # Apply Config
    applyConfig: (key, value)->
      localStorage[key] = value
      @config[key] = value

    # Send Message to background page
    sendMessage: (msg)->
      chrome.runtime.sendMessage(msg)
  }
}
