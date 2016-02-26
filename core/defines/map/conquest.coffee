define (require, exports, module)->
  '1':
    'id': 'A1'
    'no': '1'
    'area': '1'
    'name': '鳥羽・伏見の戦い'
    'desc': '合計レベル5以上の部隊を自由に編成し、戦いに勝利しよう！'
    'time': '0:10:00'
    'lv': 5
    'need': []
    'get':
      'player_exp': '5(10)'
      'sword_exp': '5'
      'bill': null
      'bonemeal': null
      'charcoal': '10(15)'
      'steel': '15(22)'
      'coolant': null
      'file': null
      'money': null
  '2':
    'id': 'A2'
    'no': '2'
    'area': '1'
    'name': '世直し一揆'
    'desc': '合計レベル10以上の短刀を中心とした部隊を結成し、世直しを鎮静させよう！'
    'time': '0:30:00'
    'lv': '10'
    'need': [ 7 ]
    'get':
      'player_exp': '15(30)'
      'sword_exp': '15'
      'bill': null
      'bonemeal': null
      'charcoal': null
      'steel': null
      'coolant': '30(45)'
      'file': '30(45)'
      'money': null
  '3':
    'id': 'A3'
    'no': '3'
    'area': '1'
    'name': '甲州勝沼の戦い'
    'desc': '合計レベル20以上の脇差を中心とした部隊を結成し、江戸へ向けて進軍しよう！'
    'time': '0:20:00'
    'lv': '20'
    'need': [ 4 ]
    'get':
      'player_exp': '10(20)'
      'sword_exp': '10'
      'bill': null
      'bonemeal': null
      'charcoal': '20(30)'
      'steel': null
      'coolant': '20(30)'
      'file': null
      'money': null
  '4':
    'id': 'A4'
    'no': '4'
    'area': '1'
    'name': '白河戦線'
    'desc': '合計レベル30以上の短刀、脇差を中心とした部隊を結成し、白河城へ向かえ！'
    'time': '1:00:00'
    'lv': '30'
    'need': [
      4
      7
    ]
    'get':
      'player_exp': '30(60)'
      'sword_exp': '30'
      'bill': null
      'bonemeal': null
      'charcoal': null
      'steel': '60(90)'
      'coolant': null
      'file': '60(90)'
      'money': null
  '5':
    'id': 'B1'
    'no': '5'
    'area': '2'
    'name': '公武合体運動'
    'desc': '合計レベル50以上の部隊を自由に編成し、見回りを行おう！'
    'time': '1:30:00'
    'lv': '50'
    'need': [ 4 ]
    'get':
      'player_exp': '50(100)'
      'sword_exp': '50'
      'bill': null
      'bonemeal': null
      'charcoal': null
      'steel': null
      'coolant': '90(135)'
      'file': '90(135)'
      'money': '小判箱(小)'
  '6':
    'id': 'B2'
    'no': '6'
    'area': '2'
    'name': '加役方人足寄場'
    'desc': '合計レベル60以上の打刀を中心とした部隊を結成し、自立支援を行おう！'
    'time': '3:00:00'
    'lv': '60'
    'need': [ 5 ]
    'get':
      'player_exp': '100(200)'
      'sword_exp': '120'
      'bill': null
      'bonemeal': null
      'charcoal': null
      'steel': '50(75)'
      'coolant': null
      'file': '250(375)'
      'money': '小判箱(小)'
  '7':
    'id': 'B3'
    'no': '7'
    'area': '2'
    'name': '享保の大飢饉'
    'desc': '合計レベル80以上の太刀を中心とした部隊を結成し、人々を助けよう！'
    'time': '2:00:00'
    'lv': '80'
    'need': [ 2 ]
    'get':
      'player_exp': '70(140)'
      'sword_exp': '70'
      'bill': '1'
      'bonemeal': null
      'charcoal': '120(180)'
      'steel': null
      'coolant': '120(180)'
      'file': null
      'money': null
  '8':
    'id': 'B4'
    'no': '8'
    'area': '2'
    'name': '天下泰平'
    'desc': '合計レベル100以上の打刀、太刀を中心とした部隊を編制し、見回りを行おう！'
    'time': '2:30:00'
    'lv': '100'
    'need': [
      2
      5
    ]
    'get':
      'player_exp': '85(170)'
      'sword_exp': '100'
      'bill': null
      'bonemeal': '1'
      'charcoal': null
      'steel': '180(270)'
      'coolant': null
      'file': '120(180)'
      'money': null
  '9':
    'id': 'C1'
    'no': '9'
    'area': '3'
    'name': '美濃国の決戦'
    'desc': '合計レベル110以上の部隊を自由に編成し、関ヶ原の戦いに加勢しよう！'
    'time': '4:00:00'
    'lv': '110'
    'need': []
    'get':
      'player_exp': '130(260)'
      'sword_exp': '135'
      'bill': '1'
      'bonemeal': null
      'charcoal': '130(195)'
      'steel': '240(360)'
      'coolant': null
      'file': null
      'money': null
  '10':
    'id': 'C2'
    'no': '10'
    'area': '3'
    'name': '反旗を翻した原因'
    'desc': '合計レベル120以上の大太刀を中心とした部隊を編成し、本能寺の調査を行おう！'
    'time': '3:00:00'
    'lv': '120'
    'need': []
    'get':
      'player_exp': '100(200)'
      'sword_exp': '110'
      'bill': null
      'bonemeal': '1'
      'charcoal': null
      'steel': '100(150)'
      'coolant': '60(90)'
      'file': '150(225)'
      'money': null
  '11':
    'id': 'C3'
    'no': '11'
    'area': '3'
    'name': '安土城の警備'
    'desc': '合計レベル130以上の部隊を自由に編成し、安土城を警備しよう！'
    'time': '10:00:00'
    'lv': '130'
    'need': [ 1 ]
    'get':
      'player_exp': '300(600)'
      'sword_exp': '260'
      'bill': null
      'bonemeal': null
      'charcoal': '200(300)'
      'steel': null
      'coolant': '500(750)'
      'file': null
      'money': '小判箱(中)'
  '12':
    'id': 'C4'
    'no': '12'
    'area': '3'
    'name': '天下布武'
    'desc': '合計レベル140以上の部隊を自由に編成し、足利体制の存続を調査しよう！'
    'time': '8:00:00'
    'lv': '140'
    'need': []
    'get':
      'player_exp': '250(500)'
      'sword_exp': '220'
      'bill': null
      'bonemeal': '1'
      'charcoal': null
      'steel': '200(300)'
      'coolant': null
      'file': '500(750)'
      'money': null
  '13':
    'id': 'D1'
    'no': '13'
    'area': '4'
    'name': '長篠城攻城戦'
    'desc': '合計レベル150以上の部隊を自由に編成し、鳥居を援護しよう！'
    'time': '2:00:00'
    'lv': '150'
    'need': []
    'get':
      'player_exp': '75(150)'
      'sword_exp': '75'
      'bill': null
      'bonemeal': null
      'charcoal': null
      'steel': '80(120)'
      'coolant': '100(150)'
      'file': '60(90)'
      'money': null
  '14':
    'id': 'D2'
    'no': '14'
    'area': '4'
    'name': '西上作戦'
    'desc': '合計レベル180以上の部隊を自由に編成し、遠江国・三河国・美濃国へ向かえ！'
    'time': '5:00:00'
    'lv': '180'
    'need': []
    'get':
      'player_exp': '160(320)'
      'sword_exp': '155'
      'bill': null
      'bonemeal': null
      'charcoal': '100(150)'
      'steel': '380(570)'
      'coolant': null
      'file': null
      'money': '小判箱(中)'
  '15':
    'id': 'D3'
    'no': '15'
    'area': '4'
    'name': '甲相駿三国同盟'
    'desc': '合計レベル200以上の部隊を自由に結成し、和平協定の手助けをしよう！'
    'time': '12:00:00'
    'lv': '200'
    'need': []
    'get':
      'player_exp': '350(700)'
      'sword_exp': '310'
      'bill': null
      'bonemeal': null
      'charcoal': '100(150)'
      'steel': '200(300)'
      'coolant': '500(750)'
      'file': null
      'money': null
  '16':
    'id': 'D4'
    'no': '16'
    'area': '4'
    'name': '比叡山延暦寺'
    'desc': '合計レベル220以上の部隊を自由に結成し、延暦寺の見回りをしよう！'
    'time': '6:00:00'
    'lv': '220'
    'need': []
    'get':
      'player_exp': '200(400)'
      'sword_exp': '170'
      'bill': null
      'bonemeal': null
      'charcoal': '150(225)'
      'steel': null
      'coolant': null
      'file': '400(600)'
      'money': '小判箱(大)'
  '17':
    'id': 'E1'
    'no': '17'
    'area': '5'
    'name': '鎌倉防衛戦'
    'desc': '合計レベル240以上の部隊を自由に結成し、鎌倉へ向かえ！'
    'time': '12:00:00'
    'lv': '240'
    'need': []
    'get':
      'player_exp': '340(680)'
      'sword_exp': '310'
      'bill': null
      'bonemeal': '1'
      'charcoal': '250(375)'
      'steel': '250(375)'
      'coolant': '250(375)'
      'file': null
      'money': null
  '18':
    'id': 'E2'
    'no': '18'
    'area': '5'
    'name': '元寇防塁'
    'desc': '合計レベル260以上の槍を中心とした部隊を結成し、防塁の見回りをしろ！'
    'time': '18:00:00'
    'lv': '260'
    'need': [ 6 ]
    'get':
      'player_exp': '530(1060)'
      'sword_exp': '460'
      'bill': null
      'bonemeal': '1'
      'charcoal': '200(300)'
      'steel': '500(750)'
      'coolant': '300(450)'
      'file': null
      'money': '小判箱(大)'
  '19':
    'id': 'E3'
    'no': '19'
    'area': '5'
    'name': '流鏑馬揃え'
    'desc': '合計レベル280以上の薙刀を中心とした部隊を編成し、諸国の兵を集めよう！'
    'time': '15:00:00'
    'lv': '280'
    'need': [ 3 ]
    'get':
      'player_exp': '430(860)'
      'sword_exp': '385'
      'bill': null
      'bonemeal': null
      'charcoal': '350(525)'
      'steel': '200(300)'
      'coolant': '100(150)'
      'file': '250(375)'
      'money': '小判箱(大)'
  '20':
    'id': 'E4'
    'no': '20'
    'area': '5'
    'name': '奥州合戦'
    'desc': '合計レベル300以上の各刀剣を1本ずつ配置した部隊を出陣させよ！'
    'time': '24:00:00'
    'lv': '300'
    'need': [ -1 ]
    'get':
      'player_exp': '700(1400)'
      'sword_exp': '610'
      'bill': '3'
      'bonemeal': null
      'charcoal': '300(450)'
      'steel': '400(600)'
      'coolant': '500(750)'
      'file': null
      'money': '小判箱(大)'
