define ['cs!./update'], (update)->
  _resource = (data, target)->
    return if !data['resource']

    update data['resource'], target['preprocess']['resource']
    console.log target['preprocess']['resource']

    'done'

define -> _resource
