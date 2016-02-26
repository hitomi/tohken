define ['cs!./update', 'lodash', 'cs!core/utils/websql'], (update, _, websql)->
  _sword = (data, target)->
    return if !data['sword']
    
    _.forEach data['sword'], (v)=>
      obj = v
      
      obj['recovered_at'] = Date.parse(obj['recovered_at'] + " GMT+0900")
      obj['created_at'] = Date.parse(obj['created_at'] + " GMT+0900")
      _.forEach obj, (_v, _k)->
        obj[_k] = 0 if obj[_k] == null
      websql
        .upsert 'game_sword', obj
        .go (tx, data)-> console.log data.rows

    update data['sword'], target['preprocess']['sword'], true
    console.log target['preprocess']['sword']

    'done'

define -> _sword
