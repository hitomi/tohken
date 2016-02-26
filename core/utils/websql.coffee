define (require, exports, module)->
  _ = require 'lodash'
  
  {
    onSuccess: (tx, data)->
      console.log "#{data.rows.length} rows"
      'done'

    onError: (tx, error)->
      console.log error
      'done'

    execute: (sql, success = @onSuccess, error = @onError)->
      @DB.transaction (tx)->
        console.log sql
        tx.executeSql sql, [], success, error

    createTable: (name, struct)->
      sql = "CREATE TABLE IF NOT EXISTS #{name} (#{struct})"
      @execute sql

    # query
    select: (rows = '*')->
      @sql = "SELECT #{rows} "
      this
    
    update: (table, objs)->
      @sql = "UPDATE #{table} SET"
      _.forEach objs, (v, k)=>
        @sql += " #{k} = #{v} ,"
      @sql = @sql.slice 0, @sql.length - 2
      this
      
    upsert: (table, objs)->
      key = _.keys(objs).join ','
      val = _.values(objs).join ','
      @sql = "INSERT OR REPLACE INTO #{table} (#{key}) VALUES (#{val})"
      this
   
    from: (table)->
      @sql += "FROM #{table} "
      this

    where: (con)->
      @sql += " WHERE #{con} "
      this

    group: (con)->
      @sql += " GROUP BY #{con} "
      this

    limit: (offset, length)->
      @sql += " LIMIT #{offset}, #{length} "
      this

    order: (con)->
      @sql += " ORDER BY #{con} "
      this

    go: (cb, err)->
      @execute @sql, cb, err
      @sql = ''

    insert: (table, data, cb, err)->
      sql = "INSERT INTO #{table}(#{_.keys data}) VALUES (#{_.values data})"
      @execute sql, cb, err

    # init database
    init: ->
      try
        @DB = openDatabase('trhdb', '1.0', 'touken-ranbu-helper', 4*1024*1024)
      catch error
        console.log error
      @createTable 'log_map', 'serial_id INTEGER PRIMARY KEY, sword_id INTEGER, episode INTEGER, field INTEGER, pos INTEGER, rank INTEGER, time INTEGER, upload INTEGER'
      @createTable 'log_sword', 'serial_id INTEGER PRIMARY KEY, sword_id INTEGER, charcoal INTEGER, steel INTEGER, coolant INTEGER, file INTEGER, secretary INTEGER, item INTEGER, time INTEGER, upload INTEGER'
      @createTable 'game_sword', 'serial_id INTEGER PRIMARY KEY, sword_id INTEGER, symbol INTEGER, rarity INTEGER, level INTEGER, exp INTEGER, evol_num INTEGER, hp INTEGER, hp_max INTEGER, atk INTEGER, def INTEGER, mobile INTEGER, back INTEGER, scout INTEGER, hide INTEGER, hp_up INTEGER, atk_up INTEGER, def_up INTEGER, mobile_up INTEGER , back_up INTEGER, scout_up INTEGER, hide_up INTEGER, loyalties INTEGER, fatigue INTEGER, equip_serial_id1 INTEGER, equip_serial_id2 INTEGER, equip_serial_id3 INTEGER, horse_serial_id INTEGER, item_id INTEGER, protect INTEGER, status INTEGER, recovered_at INTEGER, created_at INTEGER'
      @createTable 'game_equip', 'serial_id INTEGER PRIMARY KEY, equip_id INTEGER, soldier INTEGER'
  }
    
