define ['cs!./websql'], (websql)->
  _gameLogs = {
    init: ->
      websql.init()
      # test data
      websql.insert 'map', {
        "sword_id": 1
        "episode": 1
        "field": 1
        "pos": 1
        "rank": 1
        "time": Date.now()
        "upload": 0
      }
      websql
        .select()
        .from 'map'
        .go (tx, data)-> console.log data.rows
  }
