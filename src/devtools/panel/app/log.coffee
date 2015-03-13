# 战斗记录和锻刀记录
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.log = {} if !exports.tohken.log
  exports.tohken.log.battle = {
    data: []
  }
  exports.tohken.log.forge = {
    data: []
  }
)(window)
