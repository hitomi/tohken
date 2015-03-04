# 基础数据模型
# 不再直接使用游戏数据，以提升程序的稳定性
((exports)->
  exports.tohken.data = {
    # 玩家信息
    player: {
      "filling": false
      # 玩家名
      "name":  null
      # 等级
      "level": null
      # 经验
      "exp": null
      # 最大刀剑持有量
      "max_sword": null
      # 当前刀剑持有量
      "now_sword": null
      # 最大刀装持有量
      "equip_max": null
      # 当前刀装持有量
      "equip_now": null
      # 小判
      "money": null
      # 秘书刀
      "secretary": null
      # 秘书刀的SID
      "secretary_serial_id": null
      # 最大队伍数
      "max_party": null
      # 最大锻刀数
      "forge_slot": null
      # 最大手入数
      "repair_slot": null
      # 服务器
      "world": null
      # 创建日期
      "created_at": null
      # 成就
      "complete": {
        # 全刀剑
        "sword": null
        # 短刀
        "dagger": null
        # 脇差
        "short": null
        # 打刀
        "normal": null
        # 太刀
        "long": null
        # 大太刀
        "large": null
        # 槍
        "spear": null
        # 薙刀
        "partisan": null
        # 刀装
        "equip": null
        # 马
        "horse": null
        # 回想
        "scene": null
        # 景趣
        "furniture": null
      }
      # 战绩
      "summary": {
        # 出阵次数
        "battle": null
        # 出阵获胜次数
        "battle_win": null
        # 演练次数
        "practice": null
        # 演练获胜次数
        "practice_win": null
        # 远征次数
        "conquest": null
        # 远征成功次数
        "conquest_success": null
      }
      # 上次更新时间
      "last_update": null
    }
    # 资源信息
    resource: {
      "filling": false
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
      # 模拟数据叠加
      "vcharcoal":    null
      "vsteel":       null
      "vcoolant":     null
      "vfile":        null
      # 上次更新时间
      "last_update": null
    }
    # 刀剑
    sword: {
      "filling": false
      # 基准模型
      "template": {
        # 序列号
        "serial_id": null
        # 图鉴ID
        "sword_id": null
        # 稀有度
        "rarity": null
        # 等级
        "level": null
        # 累计经验
        "exp": null
        # 进阶次数
        "evol_num": null
        # HP
        "hp": null
        # HP 上限
        "hp_max": null
        # 打撃        範囲
        "atk": null
        # 統率
        "def": null
        # 機動
        "mobile": null
        # 衝力
        "back": null
        # 偵察
        "scout": null
        # 隠蔽
        "hide": null
        # 生存提升上限
        "hp_up": null
        # 打撃提升上限
        "atk_up": null
        # 統率提升上限
        "def_up": null
        # 機動提升上限
        "mobile_up": null
        # 衝力提升上限
        "back_up": null
        # 偵察提升上限
        "scout_up": null
        # 隠蔽提升上限
        "hide_up": null
        # 必殺
        "loyalties": null
        # 疲劳
        "fatigue": null
        # 模拟疲劳叠加
        "vfatigue": null
        # 刀装位
        "equip_serial_id1": null
        "equip_serial_id2": null
        "equip_serial_id3": null
        # 马
        "horse_serial_id": null
        # 氪金道具
        "item_id": null
        # 写保护
        "protect": null
        # 状态
        # 0：正常，1：手入，2：軽傷，3：中傷，4：重傷
        "status": null
        # * 尚不明确
        "recovered_at": null
        # 获得时间
        "created_at": null
      }
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 刀装
    equip: {
      "filling": false
      "template": {
        # 序列号
        "serial_id": null
        # 装备ID，10001及以上为马匹
        "equip_id": null
        # 持有兵数
        "soldier": null
      }
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 队伍
    party: {
      "filling": false
      "template": {
        # 队伍编号
        "party_no": null
        # 状态
        # 0：未开放，1：放置，2：远征
        "status": "2"
        # 队伍名
        "party_name": null
        # 远征结束时间
        "finished_at": null
        # 编组信息
        "slot": {
          "1": {
            "serial_id": null
          }
          "2": {
            "serial_id": null
          }
          "3": {
            "serial_id": null
          }
          "4": {
            "serial_id": null
          }
          "6": {
            "serial_id": null
          }
          "5": {
            "serial_id": null
          }
        }
      }
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 锻造
    forge: {
      "filling": false
      # 锻造位
      "open": null
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 手入
    repair: {
      "filling": false
      # 手入位
      "open": null
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 远征
    conquest: {
      "filling": false
      "template": {
        "party": null
        "return": null
      }
      # 数据填充位置
      "data": {}
      # 上次更新时间
      "last_update": null
    }
    # 状态
    status: {
      # 模拟数据更新
      "virtualization": false
      # 是否在战斗状态
      "in_battle": false
    }
  }
)(window)
