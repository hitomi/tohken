((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.control = new Vue {
    el: '#app'

    data: {
      version: '0.1.0'
      gaming: false
      tab: 1
      data: exports.tohken.data
      view: exports.tohken.view
      vdata: true
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

    methods: {
      # Route the request
      route: (request, action)->
        exports.tohken.router.call this, request, action

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
