notify = (title, msg, cm)->
  opt = {
    type: "basic"
    title: title
    message: msg
    iconUrl: "Panel/assets/icon.png"
    contextMessage: cm
  }
  chrome.notifications.create opt
alarmIt = (name, finished_at)->
  console.log chrome, chrome.alarms
  chrome.alarms.get "#{name}|#{finished_at}", (alarm)->
    if !alarm
      chrome.alarms.create "#{name}|#{finished_at}", Date.parse(finished_at)-120000
chrome.alarms.onAlarm.addListener (alarm)->
  console.log alarm
chrome.runtime.onMessage.addListener (message)->
  #notify("Get", message)
  console.log message
  return if !message.type
  switch message.type
    when 'conquest'
      _.forEach message.msg, (n, key)->
        return if n.finished_at == null
        notify("#{n.party_name}远征开始！", "归还时间：#{n.finished_at}", "将在远征结束两分钟前提醒")
        alarmIt n.party_name, n.finished_at
        # chrome.alarms.create("#{n.party_name}#{n.finished_at}", Date.parse(n.finished_at))
    when 'notify'
      msg = message.msg
      notify msg.title, msg.message, msg.contextMessage

