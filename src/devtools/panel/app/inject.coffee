# 背景页注入
notify = (title, msg, cm)->
  opt = {
    type: "basic"
    title: title
    message: msg
    iconUrl: "assets/icon.png"
    contextMessage: cm
  }
  chrome.notifications.create "trhn-#{Date.now()}", opt, (notificationId)->
    ''
# 闹钟存储
alarms = {}
# 启用闹钟
alarmIt = (id, finished_at, startmsg)->
  console.log "alarmIt", id
  chrome.alarms.get id, (alarm)->
    if !alarm
      return if finished_at < Date.now()
      chrome.alarms.create id, { when: finished_at }
      notify startmsg['title'], startmsg['message'], startmsg['context']
# 到时事件
chrome.alarms.onAlarm.addListener (alarm)->
  console.log "onAlarm", alarm
  id = alarm.name
  if typeof alarms[id] != "undefined"
    msg = alarms[id]
    notify msg['title'], msg['message'], msg['context']
# 消息处理器
chrome.runtime.onMessage.addListener (message)->
  console.log "onMessage", message
  return if !message.type
  switch message.type
    when 'alarm'
      alarms[message['id']] = message['message']
      alarmIt message['id'], message['time'], message['startmsg']
    when 'notify'
      msg = message['message']
      notify msg.title, msg.message, msg.context

