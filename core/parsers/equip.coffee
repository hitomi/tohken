define ['cs!./update', 'lodash', 'cs!core/utils/websql'], (update, _, websql)->
  _equip = (data, target)->
    return if !data['equip']
    
    _.forEach data['equip'], (v)=>
      obj = v
      websql
        .upsert 'game_equip', obj
        .go (tx, data)-> console.log data.rows
    'done'

define -> _equip
