define (require, exports, module)->
  _parser = {
    # load parsers
    parsers: [
      'resource': require 'cs!./resource'

    ]

    init: (_target)-> @target = _target

    # pass
    pass: (request, action)->
      # split post
      spost = request['request']['postData']['text'].replace(/%5F/g, '_').split('&')
      post = {}
      _.forEach spost, (n)->
        t = n.split('=')
        post[t[0]] = t[1]
      # get resource content
      request.getContent (content, encoding)=>
        # add post data
        con = JSON.parse(content)
        con['post_data'] = post
        # process
        @target['history']['runtime'][action] = con
        @process.call this, con
      'done'

    # split data, distribute and parse it
    process: (content)->
      for parser in @parsers
        parser.call this, content, @target
      'done'
  }

  module.exports = _parser
