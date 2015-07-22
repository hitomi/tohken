_resource = (data, target)->
  return if !data['resource']

  target['resource']['charcoal']     = resource['charcoal']
  target['resource']['steel']        = resource['steel']
  target['resource']['coolant']      = resource['coolant']
  target['resource']['file']         = resource['file']
  target['resource']['bill']         = resource['bill']
  target['resource']['max_resource'] = resource['max_resource']

  # record update time
  target['resource']['last_update']  = Date.now()

  # clear
  target['resource']['vcharcoal']    = 0
  target['resource']['vsteel']       = 0
  target['resource']['vcoolant']     = 0
  target['resource']['vfile']        = 0
  'done'

define -> _resource
