_router = {

  # init network request listener
  init: (_target, _parser)->
    @target = _target
    @parser = _parser
    # Listen the network request
    chrome.devtools.network.onRequestFinished.addListener (request)=>
      # filter request
      tohken = request.request.url.match /http:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/
      if tohken != null
        # throw static resource
        return if tohken[1] == "static"
        # pass
        @parser.pass request, tohken[2]
        @route request, tohken[2]

  # route the data
  route: (request, action)->
    console.log action
    @target['history']['router'].push action
    switch action
      when 'home'
        'nothing'
      else
        'nothing'
}

define -> _router
