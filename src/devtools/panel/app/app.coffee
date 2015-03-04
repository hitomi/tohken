((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.control = new Vue {
    el: '#app'

    data: {
      version: '0.1.0'
      gaming: false
      data: exports.tohken.data
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
        exports.tohken.router.call this, request, action
        console.log @data

      # Debug
      output: (obj)->
        document.write(obj + "<br>")

      # Parse data to json
      parser: (request, callback)->
        request.getContent (content, encoding)->
          callback JSON.parse(content)

      # Apply Config
      applyConfig: (key, value)->
        localStorage[key] = value
        @config[key] = value

      # Send Message to background page
      sendMessage: (msg)->
        chrome.runtime.sendMessage(msg)
    }
  }
)(window)
