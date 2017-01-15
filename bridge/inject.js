
var notify = function(title, msg, cm) {
  var opt;
  opt = {
    type: "basic",
    title: title,
    message: msg,
    iconUrl: "static/icon.png",
    contextMessage: cm
  };
  return chrome.notifications.create("trhn-" + (Date.now()), opt, function(notificationId) {
    return '';
  });
};

chrome.runtime.onMessage.addListener(function(message) {
  var msg;
  console.log("onMessage", message);
  if (!message.type) {
    return;
  }
  switch (message.type) {
    case 'notify':
      msg = message['message'];
      return notify(msg.title, msg.message, msg.context);
  }
});
