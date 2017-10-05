let TRHStore = new Vuex.Store({
  state: {
    resource: {
      name: '瞳',
      level: 85,
      bill: 58,
      charcoal: 11400,
      steel: 3073,
      coolant: 11490,
      file: 8627
    },
    party: {
      '1': {
        level: {
          total: 300,
          average: 50
        },
        swords: ['1354173']
      },
      '2': {
        level: {
          total: 300,
          average: 50
        },
        swords: ['1354174']
      },
      '3': {
        level: {
          total: 300,
          average: 50
        },
        swords: ['1354173']
      },
      '4': {
        level: {
          total: 300,
          average: 50
        },
        swords: ['13541723']
      }
    },
    sword: {
      '1354173': {
        serial_id: 1354173,
        sword_id: 59,
        origin_id: 59,
        name: '萤丸',
        hp: 56,
        hp_max: 56,
        level: 99,
        figure: 99,
        figure_flag: 3,
        next_exp: 0,
        status: 0,
        status_class: 'recovery',
        equip_slot: 3,
        equips: ['10351']
      },
      '1354174': {
        serial_id: 1354173,
        sword_id: 59,
        origin_id: 59,
        name: '萤丸2',
        hp: 56,
        hp_max: 56,
        level: 99,
        figure: 99,
        figure_flag: 3,
        next_exp: 0,
        status: 0,
        status_class: 'recovery',
        equip_slot: 3,
        equips: [null]
      }
    },
    equip: {
      '10351': {
        serial_id: 10351,
        name: '轻骑',
        level: 1,
        hp: 10,
        hp_max: 10,
        status: 0
      }
    }
  }
})