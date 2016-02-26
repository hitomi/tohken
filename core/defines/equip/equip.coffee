define (require, exports, module)->
  '1':
    'name': '投石兵・並'
    'soldier': 8
    'atk': 0
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 1
    'hide': 1
    'type': 1
  '2':
    'name': '投石兵・上'
    'soldier': 9
    'atk': 0
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 2
    'hide': 2
    'type': 1
  '3':
    'name': '投石兵・特上'
    'soldier': 10
    'atk': 0
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 3
    'hide': 3
    'type': 1
  '4':
    'name': '槍兵・並'
    'soldier': 7
    'atk': 0
    'def': 0
    'mobile': 1
    'back': 2
    'scout': 0
    'hide': 0
    'type': 2
  '5':
    'name': '槍兵・上'
    'soldier': 7
    'atk': 0
    'def': 0
    'mobile': 2
    'back': 3
    'scout': 0
    'hide': 0
    'type': 2
  '6':
    'name': '槍兵・特上'
    'soldier': 8
    'atk': 0
    'def': 0
    'mobile': 3
    'back': 5
    'scout': 0
    'hide': 0
    'type': 2
  '7':
    'name': '軽歩兵・並'
    'soldier': 8
    'atk': 0
    'def': 0
    'mobile': 2
    'back': 0
    'scout': 0
    'hide': 1
    'type': 3
  '8':
    'name': '軽歩兵・上'
    'soldier': 9
    'atk': 0
    'def': 0
    'mobile': 2
    'back': 0
    'scout': 0
    'hide': 2
    'type': 3
  '9':
    'name': '軽歩兵・特上'
    'soldier': 10
    'atk': 0
    'def': 0
    'mobile': 5
    'back': 0
    'scout': 0
    'hide': 3
    'type': 3
  '10':
    'name': '重歩兵・並'
    'soldier': 10
    'atk': 1
    'def': 2
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 4
  '11':
    'name': '重歩兵・上'
    'soldier': 11
    'atk': 2
    'def': 2
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 4
  '12':
    'name': '重歩兵・特上'
    'soldier': 12
    'atk': 3
    'def': 5
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 4
  '13':
    'name': '盾兵・並'
    'soldier': 11
    'atk': 0
    'def': 5
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 5
  '14':
    'name': '盾兵・上'
    'soldier': 13
    'atk': 0
    'def': 7
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 5
  '15':
    'name': '盾兵・特上'
    'soldier': 15
    'atk': 0
    'def': 10
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': 5
  '16':
    'name': '軽騎兵・並'
    'soldier': 9
    'atk': 1
    'def': 0
    'mobile': 2
    'back': 0
    'scout': 0
    'hide': 0
    'type': 6
  '17':
    'name': '軽騎兵・上'
    'soldier': 10
    'atk': 2
    'def': 1
    'mobile': 3
    'back': 0
    'scout': 0
    'hide': 0
    'type': 6
  '18':
    'name': '軽騎兵・特上'
    'soldier': 12
    'atk': 3
    'def': 3
    'mobile': 5
    'back': 0
    'scout': 0
    'hide': 0
    'type': 6
  '19':
    'name': '重騎兵・並'
    'soldier': 11
    'atk': 1
    'def': 3
    'mobile': 0
    'back': 1
    'scout': 0
    'hide': 0
    'type': 7
  '20':
    'name': '重騎兵・上'
    'soldier': 12
    'atk': 2
    'def': 3
    'mobile': 1
    'back': 2
    'scout': 0
    'hide': 0
    'type': 7
  '21':
    'name': '重騎兵・特上'
    'soldier': 13
    'atk': 3
    'def': 5
    'mobile': 3
    'back': 3
    'scout': 0
    'hide': 0
    'type': 7
  '22':
    'name': '精鋭兵・並'
    'soldier': 11
    'atk': 0
    'def': 2
    'mobile': 2
    'back': 0
    'scout': 1
    'hide': 1
    'type': 8
  '23':
    'name': '精鋭兵・上'
    'soldier': 12
    'atk': 0
    'def': 3
    'mobile': 3
    'back': 0
    'scout': 2
    'hide': 2
    'type': 8
  '24':
    'name': '精鋭兵・特上'
    'soldier': 13
    'atk': 0
    'def': 5
    'mobile': 5
    'back': 0
    'scout': 3
    'hide': 3
    'type': 8
  '25':
    'name': '弓兵・並'
    'soldier': 6
    'atk': 0
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 2
    'type': 9
  '26':
    'name': '弓兵・上'
    'soldier': 7
    'atk': 1
    'def': 0
    'mobile': 0
    'back': 1
    'scout': 0
    'hide': 3
    'type': 9
  '27':
    'name': '弓兵・特上'
    'soldier': 8
    'atk': 3
    'def': 0
    'mobile': 0
    'back': 3
    'scout': 0
    'hide': 5
    'type': 9
  '28':
    'name': '銃兵・並'
    'soldier': 5
    'atk': 0
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 2
    'hide': 0
    'type': 10
  '29':
    'name': '銃兵・上'
    'soldier': 6
    'atk': 1
    'def': 0
    'mobile': 0
    'back': 1
    'scout': 3
    'hide': 0
    'type': 10
  '30':
    'name': '銃兵・特上'
    'soldier': 6
    'atk': 3
    'def': 0
    'mobile': 0
    'back': 3
    'scout': 5
    'hide': 0
    'type': 10
  '10001':
    'name': '王庭'
    'soldier': 0
    'atk': 3
    'def': 0
    'mobile': 7
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10002':
    'name': '三国黒'
    'soldier': 0
    'atk': 0
    'def': 3
    'mobile': 10
    'back': 3
    'scout': 0
    'hide': 0
    'type': -1
  '10003':
    'name': '松風'
    'soldier': 0
    'atk': 2
    'def': 2
    'mobile': 13
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10004':
    'name': '小雲雀'
    'soldier': 0
    'atk': 0
    'def': 2
    'mobile': 17
    'back': 0
    'scout': 2
    'hide': 2
    'type': -1
  '10005':
    'name': '高楯黒'
    'soldier': 0
    'atk': 0
    'def': 0
    'mobile': 13
    'back': 3
    'scout': 0
    'hide': 0
    'type': -1
  '10006':
    'name': '花柑子'
    'soldier': 0
    'atk': 0
    'def': 3
    'mobile': 15
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10007':
    'name': '青海波'
    'soldier': 0
    'atk': 0
    'def': 0
    'mobile': 13
    'back': 0
    'scout': 3
    'hide': 2
    'type': -1
  '10008':
    'name': '望月'
    'soldier': 0
    'atk': 3
    'def': 0
    'mobile': 17
    'back': 0
    'scout': 0
    'hide': 2
    'type': -1
  '10011':
    'name': '白毛'
    'soldier': 0
    'atk': 0
    'def': 0
    'mobile': 5
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10021':
    'name': '鹿毛'
    'soldier': 0
    'atk': 3
    'def': 0
    'mobile': 2
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10031':
    'name': '青毛'
    'soldier': 0
    'atk': 5
    'def': 0
    'mobile': 0
    'back': 0
    'scout': 0
    'hide': 0
    'type': -1
  '10041':
    'name': '祝一号'
    'soldier': 0
    'atk': 2
    'def': 2
    'mobile': 2
    'back': 2
    'scout': 2
    'hide': 2
    'type': -1
    