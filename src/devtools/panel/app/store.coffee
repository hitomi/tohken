# 存储控制器
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.store = {
    get: (key, pre, json = false)->
      data = localStorage.getItem(key)
      if data != null
        return if json then JSON.parse(data) else data
      else
        return pre
    set: (key, value)->
      localStorage.setItem(key, value)
    remove: (key)->
      localStorage.removeItem(key)
    reset: ->
      localStorage.clear()
  }
)(window)
