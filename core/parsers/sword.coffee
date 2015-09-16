define ['cs!./update'], (update)->
  _sword = (data, target)->
    return if !data['sword']

    update data['sword'], target['preprocess']['sword'], true
    console.log target['preprocess']['sword']

    'done'

define -> _sword
