define ['cs!./update', 'lodash'], (update, _)->
  _party = (data, target)->
    return if !data['party']
    
    update data['party'], target['preprocess']['party'], true
    console.log target['preprocess']['party']

    'done'

define -> _party
