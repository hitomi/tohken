define((require, exports, module) => {
  return () => {
    return {
      player: {
        party: {
          serial_id: null,
          level: null,
          exp: null,
          hp: null,
          hp_max: null,
          equip_id1: null,
          equip_serial_id1: null,
          soldier1: null,
          init_soldier1: null,
          max_soldier1: null,
          soldier_type1: null,
          equip_id2: null,
          equip_serial_id2: null,
          soldier_type2: null,
          soldier2: null,
          init_soldier2: null,
          max_soldier2: null,
          equip_id3: null,
          equip_serial_id3: null,
          soldier_type3: null,
          soldier3: null,
          init_soldier3: null,
          max_soldier3: null,
          horse_id: null,
          horse_serial_id: null,
          item_id: null,
          turn_end_status: null,
          turn_end_hp: null,
          init_hp: null,
          is_serious: null,
          is_serious_album: null,
          is_active: null,
          is_damage_effect: null,
          deadly_flg: null,
          death_flg: null,
          start_hp: null
        }
      },
      result: {
        rank: null,
        mvp: null,
        get_sword_id: null,
        is_first_get_sword: null,
        drop_reward: null,
        reward: null,
        player: {
          gauge: null,
          life: null,
          life_max: null,
          soldier: null,
          soldier_max: null,
          retire: null,
          get_exp: null,
          is_level_up: null,
          level_up_money: null,
          sword_exp: null,
          level: null,
          exp: null,
          evolution: null,
          party: {
            party_no: null,
            party_name: null,
            slot: {
              serial_id: null,
              hp: null,
              hp_max: null,
              status: null,
              sword_id: null,
              get_exp: null,
              is_level_up: null,
              exp: null,
              level: null,
              is_bonus_exp: null,
              get_bonus_exp: null
            }
          }
        }
      }
    }
  }
})
