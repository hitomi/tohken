# 基础数据模型
((exports)->
  exports.tohken = {} if !exports.tohken
  exports.tohken.view = {
    player: {
      "set": false
      # 玩家名
      "name":  null
      # 等级
      "level": null
    }
    resource: {
      "set": false
      # 依頼札
      "bill":         null
      # 手伝い札
      "bonemeal":     null
      # 木炭
      "charcoal":     null
      # 玉鋼
      "steel":        null
      # 冷却材
      "coolant":      null
      # 砥石
      "file":         null
      # 最大资源储量
      "max_resource": null
      # 小判
      "money": null
    }
    party: {
      "set": false
      "data": {}
    }
    # 刀装整理
    equips: {
      "set": false
      # 准备加合计
      "data": {}
    }
  }
)(window)

