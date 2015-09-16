define (require, exports, module)->

  _ = require 'lodash'

  _update = (data, target, with_template = false)->
    # each and fill data to match key
    _.forEach target, (v, k)->
      if _.has data, k
        target[k] = _.clone data[k]
    # if with_template
    if with_template && target['template']?
      target['data'] = {}
      _.forEach data, (content, key)->
        # clone template
        temp = _.clone target['template']
        # copy data
        _.forEach temp, (v, k)->
          if _.has content, k
            temp[k] = _.clone content[k]
        target['data'][key] = temp
    # add other info
    target['last_update'] = Date.now()
    target['raw'] = _.clone data
    'done'

  # export
  module.exports = _update
