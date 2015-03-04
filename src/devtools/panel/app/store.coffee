# 存储控制器
((exports)->
  exports.tohken = {} if !exports.tohken
  class store
    get: (key, pre, json = false)->
      data = localStorage.getItem(key)
      if data != null
        return if json then JSON.parse(data) else data
      else
        return pre
    set: (key, value)->
      localStorage.setItem(key, value)
    reset: ->
      localStorage.clear()
  exports.tohken.store = store
)(window)
