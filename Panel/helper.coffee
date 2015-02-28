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
    exp2next: (i)->
      SEXP[parseInt(@sword[i].level, 10)-1]
      SEXP[parseInt(@sword[i].level, 10)-1] - parseInt(@sword[i].exp, 10)

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

