SID = {
  "3": "叁日月宗近"
  "5": "小狐丸"
  "7": "石切丸"
  "9": "岩融"
  "11": "今剣"
  "19": "にっかり青江"
  "23": "鸣狐"
  "25": "一期一振"
  "27": "鲇尾藤四郎"
  "29": "骨喰藤四郎"
  "31": "平野藤四郎"
  "33": "厚藤四郎"
  "39": "前田藤四郎"
  "41": "秋田藤四郎"
  "45": "乱藤四郎"
  "47": "五虎煺"
  "49": "薬研藤四郎"
  "55": "莺丸"
  "59": "蛍丸"
  "61": "爱染国俊"
  "65": "蜻蛉切"
  "73": "烛台切光忠"
  "79": "江雪左文字"
  "81": "宗叁左文字"
  "83": "小夜左文字"
  "85": "加州清光"
  "87": "大和守安定"
  "89": "歌仙兼定"
  "91": "和泉守兼定"
  "93": "陆奥守吉行"
  "95": "山姥切国広"
  "97": "山伏国広"
  "99": "堀川国広"
  "101": "蜂须贺虎彻"
  "116": "大倶利伽罗"
  "118": "へし切长谷部"
  "122": "狮子王"
  "128": "同田贯正国"
  "130": "鹤丸国永"
  "132": "太郎太刀"
  "134": "次郎太刀"
  "138": "御手杵"
}

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
    resource: {}
    sword: {}
    forge: {}
    equip: {}
    party: {}
    repair: []
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

  filters:
    i2n: (i)->
      SID[i]

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
        # 启动
        when 'login/start'
          @parser request, (data)=>
            @player.currency = data.currency.money if data.currency
            @player.bonemeal = data.item["8"]["num"] if data.item["8"]
            @player.name = data.name
            @player.level = data.level
            @player.max_sword = data.max_sword
        # 修复

    # Parse data to json
    parser: (request, callback)->
      request.getContent (content, encoding)->
        callback JSON.parse(content)

    # Debug
    output: (obj)->
      document.write(obj + "<br>")
  }
}

