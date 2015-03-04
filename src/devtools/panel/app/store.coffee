# 存储控制器
((exports)->
  class store
    get: (key, default, json = false)->
      data = localStorage.getItem(key)
      if data != null
        return if json then JSON.parse(data) else data
      else
        default
    set: (key, value)->
      localStorage.setItem(key, value)
    reset: ->
      localStorage.clear()
  exports.tohken.store = store
)(window)
