define (require, exports, module)->
  # require
  _   = require 'lodash'
  $   = require 'jquery'
  Vue = require 'vue'

  config = require 'cs!core/config'
  data   = require 'cs!core/data'

  router = require 'cs!core/services/router'
  parser = require 'cs!core/parsers/index'

  gamelogs = require 'cs!core/utils/gamelogs'

  # debug
  $console = $('#console')
  $console.log = (ctx)->
    $console.append("<div>#{ctx}</div>");
  $console.log "trh-x loaded core v#{config['verson']['core']} ui v#{config['verson']['ui']} build 4"
  $console.log "#{new Date()}"

  # init
  gamelogs.init()

  # start event listener
  parser.init data
  router.init data, parser

  # init views
  vm = new Vue {
    el: "#trhv4",
    data: data
  }
