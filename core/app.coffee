define (require, exports, module)->
  # require
  _   = require 'lodash'
  $   = require 'jquery'
  Vue = require 'vue'

  config = require 'cs!core/config'
  data   = require 'cs!core/data'

  router = require 'cs!core/services/router'
  parser = require 'cs!core/parsers/index'

  # debug
  $console = $('#console')
  $console.log = (ctx)->
    $console.append("<div>#{ctx}</div>");
  $console.log "trh-x loaded core v#{config['verson']['core']} ui v#{config['verson']['ui']}"

  # init
  parser.init data
  router.init data, parser
