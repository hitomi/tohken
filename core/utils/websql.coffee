_webSQL = {
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
    # @createTable 'map', 'sword_id INTEGER, episode INTEGER, field INTEGER, pos INTEGER, rank INTEGER, time INTEGER, upload INTEGER'
    # @createTable 'sword', 'sword_id INTEGER, charcoal INTEGER, steel INTEGER, coolant INTEGER, file INTEGER, secretary INTEGER, time INTEGER, upload INTEGER'
}

define -> _webSQL
