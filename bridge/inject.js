
var notify = function (title, msg, cm, icon = 'static/icon.png') {
  var opt
  opt = {
    type: 'basic',
    title: title,
    message: msg,
    iconUrl: icon,
    contextMessage: cm
  }
  return chrome.notifications.create('trhn-' + (Date.now()), opt, function (notificationId) {
    return ''
  })
}

chrome.runtime.onMessage.addListener(function (message) {
  var msg
  console.log('onMessage', message)
  if (!message.type) {
    return
  }
  switch (message.type) {
    case 'notify':
      msg = message['message']
      return notify(msg.title, msg.message, msg.context, msg.icon)
    case 'originNotify':
      return chrome.notifications.create(...msg.args)
  }
})
