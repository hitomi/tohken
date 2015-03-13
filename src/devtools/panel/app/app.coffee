((exports)->
  Vue.config.debug = true;
  exports.tohken = {} if !exports.tohken
  exports.tohken.control = new Vue {
    el: '#app'

    data: {
      version: '0.1.0'
      gaming: false
      tab: 1
      data: exports.tohken.data
      view: exports.tohken.view
      config: exports.tohken.config
      vdata: true
      square_id: 0
      dataExist: false
      status: {
        # 是否在战斗状态
        "in_battle": false
        # 当前所在地图
        "router": null
        # 上一次所在地图
        "last_router": null
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

    methods: {
      # Route the request
      route: (request, action)->
        exports.tohken.router.call this, request, action

      # Parse data to json
      parser: (request, callback)->
        request.getContent (content, encoding)->
          callback.call this, JSON.parse(content)

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

      # Send Message to background page
      sendMessage: (msg)->
        chrome.runtime.sendMessage(msg)
    }
  }
)(window)
